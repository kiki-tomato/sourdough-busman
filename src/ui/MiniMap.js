import { useEffect } from "react";

import { useBakeryInfo } from "../hooks/useBakeryInfo";
import { useMap } from "../hooks/useMap";

const { naver } = window;

function MiniMap() {
  const { lat, lng } = useBakeryInfo();
  const { mapObj, mapElement } = useMap(lat, lng, 13);

  useEffect(() => {
    let marker;

    function createMarker() {
      const markerOption = {
        position: new naver.maps.LatLng(lat, lng),
        map: mapObj,
      };

      marker = new naver.maps.Marker(markerOption);
    }

    if (mapObj) {
      createMarker();
    }

    return () => {
      function clearMarkers() {
        marker?.setMap(null);
      }

      clearMarkers();
    };
  }, [mapObj, lat, lng]);

  return <div ref={mapElement} id="naverMap" className="mini-map"></div>;
}

export default MiniMap;
