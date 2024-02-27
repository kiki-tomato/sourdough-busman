import Place from "./Place";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";

function PlaceList({ openFiltered, distanceFiltered, bakeryData }) {
  const d = new Date();
  const currentDay = d.getDay();
  const currentHour = d.getHours() + d.getMinutes() / 60;
  let filteredData = bakeryData;

  if (openFiltered) {
    filteredData = bakeryData.filter(
      (bakery) =>
        bakery.hours[currentDay].open <= currentHour &&
        currentHour < bakery.hours[currentDay].close
    );
  } else if (distanceFiltered) {
    filteredData = bakeryData
      .slice()
      .sort((a, b) => Number(a.distance) - Number(b.distance));
  }

  return (
    <ul className="place-list">
      {filteredData.map((bakery) => (
        <Place bakeryData={bakery} key={bakery.name}>
          <DistanceFromMe distanceData={bakery.distance} />
          <TradingHours
            hoursData={bakery.hours}
            currentDay={currentDay}
            currentHour={currentHour}
          />
        </Place>
      ))}
    </ul>
  );
}

export default PlaceList;
