import { useEffect, useRef, useState } from "react";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

const { naver } = window;

function MiniMap() {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const { lat, lng } = useBakeryInfo();

  useEffect(() => {
    const mapContainer = mapElement.current;
    const defaultLocation = new naver.maps.LatLng(lat, lng);
    const mapOptions = {
      center: defaultLocation,
      zoom: 13,
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
  }, [lat, lng]);

  useEffect(() => {
    let marker;

    function createMarker() {
      const markerOption = {
        position: new naver.maps.LatLng(lat, lng),
        map: map,
      };

      marker = new naver.maps.Marker(markerOption);
    }

    if (map) {
      createMarker();
    }

    return () => {
      function clearMarkers() {
        marker?.setMap(null);
      }

      clearMarkers();
    };
  }, [map, lat, lng]);

  return <div ref={mapElement} id="naverMap" className="mini-map"></div>;
}

export default MiniMap;
