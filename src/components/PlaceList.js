import Place from "./Place";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";
import Alert from "./Alert";

import { useBakeries } from "../contexts/BakeriesContext";
import { useToday } from "../contexts/TodayContext";

function PlaceList() {
  const { bakeryData, currentLocation, filterData } = useBakeries();
  const { today, currentTime } = useToday();

  let filteredData = filterData(bakeryData, today, currentTime);

  return (
    <>
      <ul className={`place-list ${!filteredData.length ? " spacing-mb" : ""}`}>
        {filteredData.map((bakery) => (
          <Place eachBakeryData={bakery} key={bakery.id}>
            <DistanceFromMe
              distanceData={bakery.distance}
              currentLocation={currentLocation}
              bakeryData={bakeryData}
            />
            <TradingHours hoursData={bakery.hours} />
          </Place>
        ))}
      </ul>
      {!filteredData.length ? <Alert /> : null}
    </>
  );
}

export default PlaceList;
