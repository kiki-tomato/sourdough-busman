import Place from "./Place";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";
import Alert from "./Alert";

function PlaceList({
  bakeryData,
  currentLocation,
  today,
  currentTime,
  openFiltered,
  distanceFiltered,
  dineInFiltered,
  shippingFiltered,
  filterData,
}) {
  const filterOptions = [
    today,
    currentTime,
    openFiltered,
    shippingFiltered,
    dineInFiltered,
    distanceFiltered,
  ];

  let filteredData = filterData(bakeryData, filterOptions);

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
              today={today}
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
