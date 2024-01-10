import { useEffect, useState } from "react";

function Map() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const success = function (position) {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    const error = function () {
      setCurrentLocation({
        latitude: 35.1641776,
        longitude: 129.1181663,
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    const { naver } = window;
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
  }, []);

  return <div className="map" id="naverMap"></div>;
}

export default Map;
