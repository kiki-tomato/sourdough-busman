import Place from "./Place";
import DistanceFromMe from "../../ui/DistanceFromMe";
import TradingHours from "../../ui/TradingHours";
import Alert from "../../ui/Alert";
import styles from "./PlaceList.module.scss";

import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useData } from "../../hooks/useData";
import { getToday } from "../../utils/helpers";

function PlaceList() {
  const { currentLocation } = useCurrentLocation();
  const { bakeryData, filterData } = useData();

  const { today, currentTime } = getToday();

  const style = { marginBottom: "80px" };

  let filteredData = filterData(bakeryData, today, currentTime);

  if (!filteredData.length) return <Alert type="no-result" />;

  return (
    <ul className={styles.placeList} style={!filteredData.length ? style : {}}>
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
  );
}

export default PlaceList;
