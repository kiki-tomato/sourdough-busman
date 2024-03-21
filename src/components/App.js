import Header from "./Header";
import Map from "./Map";
import SideBar from "./SideBar";
import BtnToResizeComponent from "./BtnToResizeComponent";
import PlaceList from "./PlaceList";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function App() {
  const { t } = useTranslation();
  const [resize, setResize] = useState(false);
  const [openFiltered, setOepnFiltered] = useState(false);
  const [shippingFiltered, setShippingFiltered] = useState(false);
  const [dineInFiltered, setDineInFiltered] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const d = new Date();
  const currentDay = d.getDay();
  const currentHour = d.getHours() + d.getMinutes() / 60;
  const bakeryData = t("bakeries", { returnObjects: true });

  useEffect(() => {
    document.title = t("header.title");
  }, [t]);

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

  return (
    <div className="container">
      <Header>
        <BtnToResizeComponent resize={resize} setResize={setResize} />
      </Header>
      <SideBar
        openFiltered={openFiltered}
        dineInFiltered={dineInFiltered}
        shippingFiltered={shippingFiltered}
        setOepnFiltered={setOepnFiltered}
        setShippingFiltered={setShippingFiltered}
        setDineInFiltered={setDineInFiltered}
      >
        <PlaceList
          bakeryData={bakeryData}
          currentLocation={currentLocation}
          currentDay={currentDay}
          currentHour={currentHour}
          openFiltered={openFiltered}
          // distanceFiltered={distanceFiltered}
          dineInFiltered={dineInFiltered}
          shippingFiltered={shippingFiltered}
        />
      </SideBar>
      <Map
        bakeryData={bakeryData}
        currentLocation={currentLocation}
        currentDay={currentDay}
        currentHour={currentHour}
        openFiltered={openFiltered}
        shippingFiltered={shippingFiltered}
        dineInFiltered={dineInFiltered}
      />
    </div>
  );
}

export default App;
