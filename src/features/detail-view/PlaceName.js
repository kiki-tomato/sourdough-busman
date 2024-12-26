import styles from "./PlaceName.module.scss";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";
import Tag from "../../ui/Tag";

function PlaceName() {
  const { name, comment } = useBakeryInfo();

  return (
    <header className={styles.placeName}>
      <h2 className={styles.heading}>{name}</h2>
      <div className={styles.tagBox}>
        <Tag type="rating" />
        <Tag type="visited" />
      </div>
      <p className={styles.review}>{comment}</p>
    </header>
  );
}

export default PlaceName;
