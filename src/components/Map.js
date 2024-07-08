import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useBakeries } from "../contexts/BakeriesContext";
import { useToday } from "../contexts/TodayContext";

const { naver } = window;

function Map() {
  const { bakeryData, currentLocation, filterData } = useBakeries();
  const { today, currentTime } = useToday();
  const [map, setMap] = useState(null);
  const mapElement = useRef(null);
  const navigate = useNavigate();
  const { bakeryId } = useParams();
  const { search } = useLocation();

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
      return `<div class="marker" data-id=${content.id}>${content.name}</div>`;
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

      markers.forEach((marker, i) => {
        naver.maps.Event.addListener(marker, "click", () => {
          deactivateMarker(markers);
          activateMarker(marker);
          navigate(`/${marker.eventTarget.dataset.id}${search}`);
        });
        naver.maps.Event.addListener(marker, "mouseover", () =>
          magnifyMarker(marker)
        );
        naver.maps.Event.addListener(marker, "mouseout", () =>
          downsizeMarker(marker)
        );
      });

      naver.maps.Event.addListener(map, "click", function () {
        navigate(`bakeries${search}`);
        deactivateMarker(markers);
      });

      placeList.addEventListener("mouseover", function (e) {
        const clickedPlace = e.target.closest(".place");
        const id = clickedPlace.dataset.id;

        markers.map((marker) =>
          marker.eventTarget.dataset.id === id ? magnifyMarker(marker) : ""
        );
      });

      placeList.addEventListener("mouseout", function (e) {
        const clickedPlace = e.target.closest(".place");
        const id = clickedPlace.dataset.id;

        markers.map((marker) =>
          marker.eventTarget.dataset.id === id ? downsizeMarker(marker) : ""
        );
      });

      placeList.addEventListener("click", function (e) {
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
  }, [filteredData, map, bakeryId, navigate, search]);

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
