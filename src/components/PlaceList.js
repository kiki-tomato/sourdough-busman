import Place from "./Place";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";
import Alert from "./Alert";

function PlaceList({
  bakeryData,
  currentLocation,
  currentDay,
  currentTime,
  openFiltered,
  distanceFiltered,
  dineInFiltered,
  shippingFiltered,
}) {
  let filteredData = bakeryData;

  if (openFiltered) {
    const openFilteredData = bakeryData
      .filter((bakery) => {
        return bakery.hours[currentDay].open;
      })
      .filter(
        (bakery) =>
          Number(
            `${bakery.hours[currentDay].open.hour}.${bakery.hours[currentDay].open.min}`
          ) <= currentTime &&
          currentTime <
            Number(
              `${bakery.hours[currentDay].close.hour}.${bakery.hours[currentDay].close.min}`
            )
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

    if (distanceFiltered) {
      filteredData = openFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }
    if (dineInFiltered && shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.dineIn && bakery.shippingService
      );
    }

    if (dineInFiltered && distanceFiltered) {
      filteredData = openFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance)
        .filter((bakery) => bakery.dineIn);
    }

    if (shippingFiltered && distanceFiltered) {
      filteredData = openFilteredData
        .filter((bakery) => bakery.shippingService)
        .sort((a, b) => a.distance - b.distance);
    }

    if (dineInFiltered && shippingFiltered && distanceFiltered) {
      filteredData = openFilteredData
        .filter((bakery) => bakery.shippingService)
        .sort((a, b) => a.distance - b.distance)
        .filter((bakery) => bakery.dineIn);
    }
  } else if (dineInFiltered) {
    const dineInFilteredData = bakeryData.filter((bakery) => bakery.dineIn);

    filteredData = dineInFilteredData;

    if (shippingFiltered) {
      filteredData = dineInFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }

    if (distanceFiltered) {
      filteredData = dineInFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }

    if (shippingFiltered && distanceFiltered) {
      filteredData = dineInFilteredData
        .filter((bakery) => bakery.shippingService)
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }
  } else if (shippingFiltered) {
    const shippingFilteredData = bakeryData.filter(
      (bakery) => bakery.shippingService
    );

    filteredData = shippingFilteredData;

    if (distanceFiltered) {
      filteredData = shippingFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }
  } else if (distanceFiltered) {
    const distanceFilteredData = bakeryData
      .slice()
      .sort((a, b) => a.distance - b.distance);

    filteredData = distanceFilteredData;
  }

  return (
    <>
      <ul
        className={
          !filteredData.length ? "place-list spacing-mb" : "place-list"
        }
      >
        {filteredData.map((bakery) => (
          <Place eachBakeryData={bakery} key={bakery.name}>
            <DistanceFromMe
              distanceData={bakery.distance}
              currentLocation={currentLocation}
              bakeryData={bakeryData}
            />
            <TradingHours
              hoursData={bakery.hours}
              currentDay={currentDay}
              currentTime={currentTime}
            />
          </Place>
        ))}
      </ul>
      {!filteredData.length ? <Alert /> : null}
    </>
  );
}

export default PlaceList;
