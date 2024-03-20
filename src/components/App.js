import Header from "./Header";
import Map from "./Map";
import SideBar from "./SideBar";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function App() {
  const { t } = useTranslation();
  const filtersObj = t("filters", { returnObjects: true });
  const btnObj = t("buttons", { returnObjects: true });
  const bakeryData = t("bakeries", { returnObjects: true });

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [btn, setBtn] = useState(false);
  const [openFiltered, setOepnFiltered] = useState(false);
  const [shippingFiltered, setShippingFiltered] = useState(false);
  const [dineInFiltered, setDineInFiltered] = useState(false);
  const [clickedMarker, setClickedMarker] = useState("");

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
      <Header
        title={t("header.title")}
        setBtn={setBtn}
        btn={btn}
        btnObj={btnObj}
      />
      <SideBar
        filters={filtersObj}
        bakeryData={bakeryData}
        currentLocation={currentLocation}
        btn={btn}
        setBtn={setBtn}
        openFiltered={openFiltered}
        setOepnFiltered={setOepnFiltered}
        shippingFiltered={shippingFiltered}
        setShippingFiltered={setShippingFiltered}
        dineInFiltered={dineInFiltered}
        setDineInFiltered={setDineInFiltered}
        btnObj={btnObj}
        clickedMarker={clickedMarker}
      />
      <Map
        currentLocation={currentLocation}
        bakeryData={bakeryData}
        openFiltered={openFiltered}
        shippingFiltered={shippingFiltered}
        dineInFiltered={dineInFiltered}
        btnObj={btnObj}
        setBtn={setBtn}
        setClickedMarker={setClickedMarker}
      />
    </div>
  );
}

export default App;
