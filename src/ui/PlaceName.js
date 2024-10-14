import StarRatingTag from "./StarRatingTag";
import VisitTag from "./VisitTag";
import styles from "./PlaceName.module.css";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function PlaceName() {
  const { name, comment } = useBakeryInfo();

  return (
    <div className={styles.placeName}>
      <h2 className={styles.heading}>{name}</h2>
      <div className={styles.tagBox}>
        <StarRatingTag />
        <VisitTag />
      </div>
      <p className={styles.review}>{comment}</p>
    </div>
  );
}

export default PlaceName;
