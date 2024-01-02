import { useEffect } from "react";

function Map() {
  useEffect(() => {
    const { naver } = window;

    const mapContainer = document.getElementById("naverMap");
    const defaultLocation = new naver.maps.LatLng(35.1641776, 129.1181663);
    const mapOptions = {
      center: defaultLocation,
      zoom: 18,
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
  }, []);

  return <div className="map" id="naverMap"></div>;
}

export default Map;
