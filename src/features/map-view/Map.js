import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { usePosition } from "../../contexts/PositionContext";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useData } from "../../hooks/useData";
import { getToday } from "../../utils/helpers";

const { naver } = window;

function Map() {
  const { currentLocation } = useCurrentLocation();
  const { bakeryData, filterData } = useData();
  const { setInfoWindowPosition } = usePosition();
  const { bakeryId } = useParams();
  const { pathname, search } = useLocation();
  const [map, setMap] = useState(null);
  const mapElement = useRef(null);
  const navigate = useNavigate();

  const { today, currentTime } = getToday();

  let filteredData = filterData(bakeryData, today, currentTime);

  useEffect(() => {
    const mapContainer = mapElement.current;
    const defaultLocation = new naver.maps.LatLng(35.1531696, 129.118666);
    const mapOptions = {
      center: defaultLocation,
      zoom: 12,
      zoomControl: true,
      minZoom: 6,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
    };

    setMap(new naver.maps.Map(mapContainer, mapOptions));
  }, []);

  useEffect(() => {
    const markers = [];
    const placeList = document.querySelector(".place-list");

    function generateMarkerMarkup(content) {
      const markerMarkup = `<div class="marker" data-id=${content.id}>${content.name}</div>`;

      return markerMarkup;
    }

    function createMarkers() {
      filteredData.map((bakery) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            bakery.location.latitude,
            bakery.location.longitude
          ),
          map: map,
          icon: {
            content: generateMarkerMarkup(bakery),
            size: new naver.maps.Size(10, 10),
            anchor: new naver.maps.Point(40, 20),
          },
        });

        return markers.push(marker);
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

    if (map) {
      createMarkers();

      if (bakeryId)
        markers.map((marker) =>
          marker.eventTarget.dataset.id === bakeryId
            ? activateMarker(marker)
            : ""
        );

      markers.forEach((marker) => {
        naver.maps.Event.addListener(marker, "click", (e) => {
          const markerId = marker.eventTarget.dataset.id;

          deactivateMarker(markers);
          activateMarker(marker);

          if (pathname.includes("details")) {
            search
              ? navigate(`/details/${markerId}${search}`)
              : navigate(`/details/${markerId}`);
          } else {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const positionObj = marker.eventTarget.getBoundingClientRect();
            const sidebarWidth = document
              .querySelector(".sidebar")
              ?.getBoundingClientRect().width;

            const rightGap = vw - positionObj.right <= 300;
            const leftGap = positionObj.x - sidebarWidth <= 300;
            const bottomGap = vh - positionObj.bottom <= 300;

            vw > 600
              ? setInfoWindowPosition({
                  x: rightGap
                    ? vw - 310
                    : leftGap
                    ? positionObj.right
                    : positionObj.x,
                  y: bottomGap ? vh - 320 : positionObj.bottom + 10,
                })
              : setInfoWindowPosition({});

            search
              ? navigate(`/${markerId}${search}`)
              : navigate(`/${markerId}`);
          }
        });
        naver.maps.Event.addListener(marker, "mouseover", () =>
          magnifyMarker(marker)
        );
        naver.maps.Event.addListener(marker, "mouseout", () =>
          downsizeMarker(marker)
        );
      });

      naver.maps.Event.addListener(map, "click", function () {
        deactivateMarker(markers);
        navigate(`bakeries${search}`);
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
        const btnBookmark = e.target.closest(".sidebar-bookmark");
        const id = clickedPlace.dataset.id;

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

      clearMarkers();
    };
  }, [
    filteredData,
    map,
    bakeryId,
    navigate,
    search,
    setInfoWindowPosition,
    pathname,
  ]);

  useEffect(() => {
    const btnToMyLocation = document.querySelector(".btn-to-my-location");

    function returnToCurrentLocation() {
      map.setCenter(
        new naver.maps.LatLng(
          currentLocation.latitude,
          currentLocation.longitude
        )
      );
    }

    if (map) {
      btnToMyLocation.addEventListener("click", returnToCurrentLocation);
    }

    return () =>
      btnToMyLocation.removeEventListener("click", returnToCurrentLocation);
  }, [currentLocation, map]);

  return <div ref={mapElement} id="naverMap" className="map"></div>;
}

export default Map;
