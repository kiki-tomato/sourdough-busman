import Place from "./Place";
import OpenToday from "../../ui/OpenToday";
import NoResults from "../../ui/NoResults";
import styles from "./PlaceList.module.scss";

import { useData } from "../../hooks/useData";
import { getToday } from "../../utils/helpers";

function PlaceList() {
  const { bakeryData, filterData } = useData();

  const { today, currentTime } = getToday();

  const style = { marginBottom: "80px" };

  let filteredData = filterData(bakeryData, today, currentTime);

  if (!filteredData.length) return <NoResults />;

  return (
    <ul className={styles.placeList} style={!filteredData.length ? style : {}}>
      {filteredData.map((bakery) => (
        <Place eachBakeryData={bakery} key={bakery.id}>
          <OpenToday hoursData={bakery.hours} />
        </Place>
      ))}
    </ul>
  );
}

export default PlaceList;
