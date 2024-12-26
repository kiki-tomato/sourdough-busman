import { useEffect, useRef, useState } from "react";

const { naver } = window;

export function useMap(lat, lng, zoom = 12) {
  const mapElement = useRef(null);
  const [mapObj, setMapObj] = useState(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const mapContainer = mapElement.current;
    const defaultLocation = new naver.maps.LatLng(lat, lng);
    const mapOptions = {
      center: defaultLocation,
      zoom,
      zoomControl: false,
      minZoom: 6,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_CENTER,
      },
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
    };

    setMapObj(new naver.maps.Map(mapContainer, mapOptions));
  }, [lat, lng, zoom]);

  return { mapObj, mapElement };
}
