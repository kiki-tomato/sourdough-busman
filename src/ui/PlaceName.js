import StarRatingTag from "./StarRatingTag";
import VisitTag from "./VisitTag";
import styles from "./PlaceName.module.css";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function PlaceName() {
  const { name } = useBakeryInfo();

  return (
    <div className={styles.placeName}>
      <div>{name}</div>
      <div className={styles.tagBox}>
        <VisitTag />
        <StarRatingTag />
      </div>
    </div>
  );
}

export default PlaceName;
