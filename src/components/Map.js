import { useEffect, useRef } from "react";

const { naver } = window;

function Map({ currentLocation }) {
  const mapElement = useRef(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (!mapInitialized.current && mapElement.current && naver.maps) {
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
