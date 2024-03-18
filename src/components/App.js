import Header from "./Header";
import Map from "./Map";
import SideBar from "./SideBar";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function App() {
  const { t } = useTranslation();

  const filtersObj = t("filters", { returnObjects: true });
  const bakeryData = t("bakeries", { returnObjects: true });

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

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
      <Header title={t("header.title")} />
      <SideBar
        filters={filtersObj}
        bakeryData={bakeryData}
        currentLocation={currentLocation}
      />
      <Map currentLocation={currentLocation} bakeryData={bakeryData} />
    </div>
  );
}

export default App;
