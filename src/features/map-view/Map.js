import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useData } from "../../hooks/useData";
import { useMap } from "../../hooks/useMap";
import { getToday } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const { naver } = window;
const defaultCoords = { lat: 35.1531696, lng: 129.118666 };

function Map() {
  const { t } = useTranslation();
  const { currentLocation } = useCurrentLocation();
  const { bakeryData, filterData } = useData();
  const { bakeryId } = useParams();
  const { pathname, search } = useLocation();
  const { mapObj, mapElement } = useMap(defaultCoords.lat, defaultCoords.lng);

  const navigate = useNavigate();

  const { today, currentTime } = getToday();

  let filteredData = filterData(bakeryData, today, currentTime);

  useEffect(() => {
    const markers = [];
    const placeList = document.querySelector(".place-list");
    const sidebar = document.querySelector(".sidebar");
    const header = document.querySelector(".header");

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sidebarWidth = sidebar?.getBoundingClientRect().width;
    const headerHeight = header?.getBoundingClientRect().height;

    function createMarkers() {
      filteredData.map((bakery) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            bakery.location.latitude,
            bakery.location.longitude
          ),
          map: mapObj,
          icon: {
            content: `<div class="marker" data-id=${bakery.id}>
              <div>${bakery.name}</div>
              <div>${
                bakery.review.rate ? `★ ${bakery.review.rate}` : "★ -"
              }</div>
            </div>`,
            anchor: new naver.maps.Point(40, 20),
          },
        });

        markers.push(marker);
      });
    }

    function activateMarker(marker) {
      marker.eventTarget.classList.remove("hover-marker");
      marker.eventTarget.classList.add("active-marker");
      marker.setZIndex(100);
    }

    function deactivateMarker(markerArr) {
      markerArr?.map((marker) => {
        marker.setZIndex(1);
        return marker.eventTarget.classList.remove("active-marker");
      });
    }

    function magnifyMarker(marker) {
      marker.setZIndex(110);
      marker.eventTarget.classList.add("hover-marker");
    }

    function downsizeMarker(marker) {
      marker.eventTarget.classList.remove("hover-marker");

      marker.eventTarget.classList.contains("active-marker")
        ? marker.setZIndex(100)
        : marker.setZIndex(1);
    }

    function moveMap(marker) {
      const positionObj = marker?.eventTarget.getBoundingClientRect();
      const markerWidth = positionObj?.width;
      const markerHeight = positionObj?.height;
      const x = positionObj?.x;
      const y = positionObj?.y;

      const lat = marker?.position.y;
      const lng = marker?.position.x;

      if (!x) return;
      if (
        x + markerWidth >= vw ||
        x <= sidebarWidth ||
        y + markerHeight >= vh ||
        y <= headerHeight
      )
        mapObj.panTo(new naver.maps.LatLng(lat, lng));
    }

    if (mapObj) {
      createMarkers();

      if (bakeryId)
        markers.map((marker) =>
          marker.eventTarget.dataset.id === bakeryId
            ? activateMarker(marker)
            : ""
        );

      markers.forEach((marker, i) => {
        naver.maps.Event.addListener(marker, "click", () => {
          const markerId = marker.eventTarget.dataset.id;
          deactivateMarker(markers);
          activateMarker(marker);
          moveMap(marker);

          search
            ? navigate(`/details/${markerId}${search}`)
            : navigate(`/details/${markerId}`);
        });
        naver.maps.Event.addListener(marker, "mouseover", () => {
          magnifyMarker(marker);
        });
        naver.maps.Event.addListener(marker, "mouseout", () => {
          downsizeMarker(marker);
        });
      });

      placeList?.addEventListener("mouseover", function (e) {
        const clickedPlace = e.target.closest(".place");
        const id = clickedPlace?.dataset.id;

        markers.map((marker) =>
          marker.eventTarget.dataset.id === id ? magnifyMarker(marker) : ""
        );
      });

      placeList?.addEventListener("mouseout", function (e) {
        const clickedPlace = e.target.closest(".place");
        const id = clickedPlace?.dataset.id;

        markers.map((marker) =>
          marker.eventTarget.dataset.id === id ? downsizeMarker(marker) : ""
        );
      });

      placeList?.addEventListener("click", function (e) {
        const clickedPlace = e.target.closest(".place");
        const id = clickedPlace?.dataset.id;
        const btnBookmark = e.target.closest(".sidebar-bookmark");
        const correspondingMarker = markers.filter(
          (marker) => marker.eventTarget.dataset.id === id
        )[0];

        moveMap(correspondingMarker);

        if (!btnBookmark) {
          deactivateMarker(markers);
          markers.map((marker) =>
            marker.eventTarget.dataset.id === id ? activateMarker(marker) : ""
          );
        }
      });
    }

    return () => {
      function clearMarkers() {
        markers.forEach((marker) => marker.setMap(null));
      }

      if (mapObj) {
        markers.forEach((marker) => {
          naver.maps.Event.clearListeners(marker, "click");
          naver.maps.Event.clearListeners(marker, "mouseover");
          naver.maps.Event.clearListeners(marker, "mouseout");
        });

        clearMarkers();
      }
    };
  }, [mapObj, bakeryId, navigate, search, pathname, filteredData, t]);

  useEffect(() => {
    const btnToMyLocation = document.querySelector(".btn-to-my-location");

    function returnToCurrentLocation() {
      mapObj.setCenter(
        new naver.maps.LatLng(
          currentLocation.latitude,
          currentLocation.longitude
        )
      );
    }

    if (mapObj) {
      btnToMyLocation.addEventListener("click", returnToCurrentLocation);
    }

    return () =>
      btnToMyLocation.removeEventListener("click", returnToCurrentLocation);
  }, [currentLocation, mapObj]);

  return <div ref={mapElement} id="naverMap" className="map"></div>;
}

export default Map;
