import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Place() {
  const { t } = useTranslation();
  const bakeryData = t("bakeries", { returnObjects: true });
  const places = [];
  const d = new Date();
  const currentDay = d.getDay();
  const currentHours = d.getHours() + d.getMinutes() / 60;
  let openOrNot;
  let textColor;

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

  for (let i = 0; i < bakeryData.length; i++) {
    if (
      bakeryData[i].hours[currentDay].open <= currentHours &&
      currentHours < bakeryData[i].hours[currentDay].close
    ) {
      textColor = "blue";

      // if (bakeryData[i].hours[currentDay].close.length === 4) {
      //   openOrNot = t("sideBar.openStatus.open", {
      //     hour: Number(bakeryData[i].hours[currentDay].close.slice(0, 1)) - 12,
      //     minute: Number(bakeryData[i].hours[currentDay].close.slice(2)),
      //   });
      // }
      // if (bakeryData[i].hours[currentDay].close.length === 5) {
      //   openOrNot = t("sideBar.openStatus.open", {
      //     hour: Number(bakeryData[i].hours[currentDay].close.slice(0, 2)) - 12,
      //     minute: Number(bakeryData[i].hours[currentDay].close.slice(3)),
      //   });
      // }

      if (Number.isInteger(bakeryData[i].hours[currentDay].close)) {
        openOrNot = t("sideBar.openStatus.open", {
          hour: Math.trunc(bakeryData[i].hours[currentDay].close) - 12,
          minute: "00",
        });
      } else {
        openOrNot = t("sideBar.openStatus.open", {
          hour: Math.trunc(bakeryData[i].hours[currentDay].close) - 12,
          minute:
            (bakeryData[i].hours[currentDay].close -
              Math.trunc(bakeryData[i].hours[currentDay].close)) *
            60,
        });
      }
    } else if (currentHours >= bakeryData[i].hours[currentDay].close) {
      openOrNot = t("sideBar.openStatus.closed");
    } else if (bakeryData[i].hours[currentDay].closed) {
      openOrNot = t("sideBar.openStatus.closureDay");
      textColor = "red";
    }

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

    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      bakeryData[i].location.latitude,
      bakeryData[i].location.longitude
    );

    places.push(
      <div className="place" key={i}>
        <h3>{t(`bakeries.${i}.name`)}</h3>
        <h5>{t(`bakeries.${i}.address`)}</h5>
        <ul>
          <li>{`${distance.toFixed(2)}km`}</li>
          <li className={textColor}>{openOrNot}</li>
        </ul>
      </div>
    );
  }

  console.log(
    bakeryData
      .filter((element) => {
        return (
          element.hours[currentDay].open <= currentHours &&
          element.hours[currentDay].close > currentHours
        );
      })
      .map((element, i) => {
        return (
          <div className="place" key={i}>
            <h3>{t(element.name)}</h3>
            <h5>{t(element.address)}</h5>
            <h5 className={textColor}>{openOrNot}</h5>
          </div>
        );
      })
  );

  return <div className="place-container">{places}</div>;
}

export default Place;
