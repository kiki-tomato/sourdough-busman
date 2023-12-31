import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const mapRef = useRef(null);

  useEffect(() => {
    const { naver } = window;

    if (!mapRef.current || !naver) {
      const defaultLocation = new naver.maps.LatLng(35.1641776, 129.1181663);
      const mapOptions = {
        center: defaultLocation,
        zoom: 10,
      };
      const map = new naver.maps.Map(mapRef, mapOptions);

      new naver.maps.Marker({
        position: defaultLocation,
        map: map,
      });
    }
  });

  return <div ref={mapRef} style={{ width: "400px", height: "400px" }}></div>;
}

export default App;
