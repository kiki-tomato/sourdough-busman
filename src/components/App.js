import Header from "./Header";
import Map from "./Map";
import SideBar from "./SideBar";
import BtnToResizeComponent from "./BtnToResizeComponent";
import BtnToMyLocation from "./BtnToMyLocation";
import PlaceList from "./PlaceList";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function App() {
  const { t } = useTranslation();
  const [resize, setResize] = useState(false);
  const [openFiltered, setOepnFiltered] = useState(false);
  const [shippingFiltered, setShippingFiltered] = useState(false);
  const [dineInFiltered, setDineInFiltered] = useState(false);
  const [distanceFiltered, setDistanceFiltered] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const d = new Date();
  const currentDay = d.getDay();
  const currentHour = d.getHours() + d.getMinutes() / 60;
  const initialData = t("bakeries", { returnObjects: true });

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

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in kilometers

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Calculate differences in coordinates
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    // Haversine formula
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate distance in kilometers
    const distance = R * c;

    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const distanceArr = initialData.map((bakery) =>
    Number(
      calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        bakery.location.latitude,
        bakery.location.longitude
      ).toFixed(2)
    )
  );

  const modifiedData = initialData.map((bakery, i) => {
    return { ...bakery, distance: distanceArr[i] };
  });

  return (
    <div className="container">
      <Header>
        <BtnToResizeComponent resize={resize} setResize={setResize} />
        <BtnToMyLocation resize={resize} />
      </Header>
      <SideBar
        openFiltered={openFiltered}
        dineInFiltered={dineInFiltered}
        shippingFiltered={shippingFiltered}
        distanceFiltered={distanceFiltered}
        setOepnFiltered={setOepnFiltered}
        setShippingFiltered={setShippingFiltered}
        setDineInFiltered={setDineInFiltered}
        setDistanceFiltered={setDistanceFiltered}
      >
        <PlaceList
          bakeryData={modifiedData}
          currentLocation={currentLocation}
          currentDay={currentDay}
          currentHour={currentHour}
          openFiltered={openFiltered}
          distanceFiltered={distanceFiltered}
          dineInFiltered={dineInFiltered}
          shippingFiltered={shippingFiltered}
        />
      </SideBar>
      <Map
        bakeryData={modifiedData}
        currentLocation={currentLocation}
        currentDay={currentDay}
        currentHour={currentHour}
        openFiltered={openFiltered}
        shippingFiltered={shippingFiltered}
        dineInFiltered={dineInFiltered}
        distanceFiltered={distanceFiltered}
      />
    </div>
  );
}

export default App;
