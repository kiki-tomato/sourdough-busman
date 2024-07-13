import Map from "./Map";
import BtnToResizeComponent from "./BtnToResizeComponent";
import BtnToMyLocation from "./BtnToMyLocation";
import InfoWindow from "./InfoWindow";

function MapContainer() {
  return (
    <div className="map-container" style={{ poistion: "relative" }}>
      <BtnToResizeComponent />
      <BtnToMyLocation />
      <InfoWindow />
      <Map />
    </div>
  );
}

export default MapContainer;
