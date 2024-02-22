import { useEffect, useRef } from "react";
import axios from "axios";

function Map({ currentLocation }) {
  const mapElement = useRef(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    const loadMapScript = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/load-map-script"
        );
        const script = document.createElement("script");
        script.innerHTML = response.data;
        script.async = true;

        document.head.appendChild(script);
        console.log("Naver Map script loaded successfully");

        return () => {
          document.head.removeChild(script);
        };
      } catch (error) {
        console.error("Failed to load Naver Map script", error);
      }
    };

    loadMapScript();
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (!mapInitialized.current && mapElement.current && naver) {
      const mapContainer = document.getElementById("naverMap");
      const defaultLocation = new naver.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude
      );

      const mapOptions = {
        center: defaultLocation,
        zoom: 15,
        zoomControl: true,
        minZoom: 6,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.LARGE,
          position: naver.maps.Position.TOP_RIGHT,
        },
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      };

      const map = new naver.maps.Map(mapContainer, mapOptions);
      const marker = new naver.maps.Marker({
        position: defaultLocation,
        map: map,
      });

      naver.maps.Event.once(map, "init", function () {
        const btnMyLocation = '<img class="button">';
        const customControl = new naver.maps.CustomControl(btnMyLocation, {
          position: naver.maps.Position.RIGHT_BOTTOM,
        });

        customControl.setMap(map);

        naver.maps.Event.addDOMListener(
          customControl.getElement(),
          "click",
          function () {
            map.setCenter(
              new naver.maps.LatLng(
                currentLocation.latitude,
                currentLocation.longitude
              )
            );
          }
        );
      });
    }
  }, [currentLocation]);

  return <div ref={mapElement} className="map" id="naverMap"></div>;
}

export default Map;
