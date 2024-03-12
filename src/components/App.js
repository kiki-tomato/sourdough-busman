import Header from "./Header";
import Map from "./Map";
import SideBar from "./SideBar";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function App() {
  const { t, i18n } = useTranslation();

  const filtersObj = t("filters", { returnObjects: true });
  const initialBakeryData = t("bakeries", { returnObjects: true });
  const [bakeryData, setBakeryData] = useState(initialBakeryData);
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

  useEffect(
    function () {
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

      setBakeryData((bakeries) =>
        bakeries.map((bakery) => {
          const distance = calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            bakery.location.latitude,
            bakery.location.longitude
          );

          return { ...bakery, distance: Number(distance.toFixed(2)) };
        })
      );
    },
    [currentLocation]
  );

  console.log(bakeryData);

  return (
    <div className="container">
      <Header title={t("header.title")} />
      <SideBar
        filters={filtersObj}
        bakeryData={bakeryData}
        onSetBakeryData={setBakeryData}
      />
      <Map currentLocation={currentLocation} />
    </div>
  );
}

export default App;
