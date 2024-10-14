import { Outlet } from "react-router-dom";

import Header from "./ui/Header";
import Sidebar from "./features/list-view/Sidebar";
import PlaceList from "./features/list-view/PlaceList";
import MapContainer from "./features/map-view/MapContainer";
import BtnToMyLocation from "./features/map-view/BtnToMyLocation";
import BtnToSwitch from "./features/map-view/BtnToSwitch";
import Map from "./features/map-view/Map";

import { useBrowserTabTitle } from "./hooks/useBrowserTabTitle";

function App() {
  useBrowserTabTitle();

  return (
    <>
      <Header />
      <Sidebar>
        <PlaceList />
      </Sidebar>
      <Outlet />
      <MapContainer>
        <Map />
        <BtnToMyLocation />
        <BtnToSwitch />
      </MapContainer>
    </>
  );
}

export default App;
