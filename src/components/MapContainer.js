import { useState } from "react";

import Map from "./Map";
import BtnToResizeComponent from "./BtnToResizeComponent";
import BtnToMyLocation from "./BtnToMyLocation";
import InfoWindow from "./InfoWindow";

function MapContainer() {
  const [resize, setResize] = useState(false);

  return (
    <div style={{ poistion: "relative" }} className="map-container">
      <BtnToResizeComponent resize={resize} setResize={setResize} />
      <BtnToMyLocation resize={resize} />
      <InfoWindow resize={resize} />
      <Map />
    </div>
  );
}

export default MapContainer;
