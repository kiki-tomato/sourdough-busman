import Place from "./Place";
import DistanceFromMe from "../../ui/DistanceFromMe";
import TradingHours from "../../ui/TradingHours";
import Alert from "../../ui/Alert";

import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useData } from "../../hooks/useData";
import { getToday } from "../../utils/helpers";

function PlaceList() {
  const { currentLocation } = useCurrentLocation();
  const { bakeryData, filterData } = useData();

  const { today, currentTime } = getToday();

  let filteredData = filterData(bakeryData, today, currentTime);

  if (!filteredData.length) return <Alert />;

  return (
    <ul className={`place-list ${!filteredData.length ? "spacing-mb" : ""}`}>
      {filteredData.map((bakery) => (
        <Place eachBakeryData={bakery} key={bakery.id}>
          <DistanceFromMe
            distanceData={bakery.distance}
            currentLocation={currentLocation}
            bakeryData={bakeryData}
          />
          <TradingHours type="sidebar" hoursData={bakery.hours} />
        </Place>
      ))}
    </ul>
  );
}

export default PlaceList;
