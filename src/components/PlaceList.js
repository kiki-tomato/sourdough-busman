import Place from "./Place";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";
import Alert from "./Alert";
import { useState } from "react";

function PlaceList({
  bakeryData,
  openFiltered,
  distanceFiltered,
  dineInFiltered,
  shippingFiltered,
  currentLocation,
  setClickedPlace,
}) {
  const d = new Date();
  const currentDay = d.getDay();
  const currentHour = d.getHours() + d.getMinutes() / 60;

  const [distanceArr, setDistanceArr] = useState([]);

  let filteredData = bakeryData;

  if (openFiltered) {
    const openFilteredData = bakeryData.filter(
      (bakery) =>
        bakery.hours[currentDay].open <= currentHour &&
        currentHour < bakery.hours[currentDay].close
    );

    filteredData = openFilteredData;

    if (dineInFiltered) {
      filteredData = openFilteredData.filter((bakery) => bakery.dineIn);
    }

    if (shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }

    if (dineInFiltered && shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.dineIn && bakery.shippingService
      );
    }
  } else if (dineInFiltered) {
    const dineInFilteredData = bakeryData.filter((bakery) => bakery.dineIn);

    filteredData = dineInFilteredData;

    if (shippingFiltered) {
      filteredData = dineInFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }
  } else if (shippingFiltered) {
    filteredData = bakeryData.filter((bakery) => bakery.shippingService);
  } else if (distanceFiltered) {
    const distanceFilteredData = bakeryData
      .map((bakery, i) => {
        return { ...bakery, distance: distanceArr[i] };
      })
      .slice()
      .sort((a, b) => Number(a.distance) - Number(b.distance));

    filteredData = distanceFilteredData;
  }

  return (
    <>
      <ul
        className={
          !filteredData.length ? "place-list margin-botton" : "place-list"
        }
      >
        {filteredData.map((bakery) => (
          <Place
            eachBakeryData={bakery}
            key={bakery.name}
            setClickedPlace={setClickedPlace}
          >
            <DistanceFromMe
              locationData={bakery.location}
              currentLocation={currentLocation}
              bakeryData={bakeryData}
              setDistanceArr={setDistanceArr}
            />
            <TradingHours
              hoursData={bakery.hours}
              currentDay={currentDay}
              currentHour={currentHour}
            />
          </Place>
        ))}
      </ul>
      {!filteredData.length ? <Alert /> : null}
    </>
  );
}

export default PlaceList;
