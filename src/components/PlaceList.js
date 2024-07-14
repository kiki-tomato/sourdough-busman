import Place from "./Place";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";
import Alert from "./Alert";

import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { useFilterData } from "../hooks/useFilterData";

import { getToday } from "../utils/helpers";

function PlaceList() {
  const { currentLocation } = useCurrentLocation();
  const { bakeryData, filterData } = useFilterData();

  const { today, currentTime } = getToday();

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
