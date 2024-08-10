import { Outlet } from "react-router-dom";

import Header from "./ui/Header";
import SideBar from "./features/list-view/SideBar";
import PlaceList from "./features/list-view/PlaceList";
import MapContainer from "./features/map-view/MapContainer";
import BtnToResizeComponent from "./features/map-view/BtnToResizeComponent";
import BtnToMyLocation from "./features/map-view/BtnToMyLocation";
import Map from "./features/map-view/Map";
import "./assets/App.css";

import { useBrowserTabTitle } from "./hooks/useBrowserTabTitle";

function App() {
  useBrowserTabTitle();

  return (
    <div className="container">
      <Header />
      <SideBar>
        <PlaceList />
      </SideBar>
      <Outlet />
      <MapContainer>
        <Map />
        <BtnToResizeComponent />
        <BtnToMyLocation />
      </MapContainer>
    </div>
  );
}

export default App;
