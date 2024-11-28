import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import styles from "./Place.module.scss";

function Place({ eachBakeryData, children }) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const bakeryId = eachBakeryData.id;

  function handleBakeryDetails(e) {
    const btnBookmark = e.target.closest("#bookmark");

    if (btnBookmark) return;
    navigate(`/details/${bakeryId}${search}`);
  }

  return (
    <li
      className={styles.place}
      data-id={eachBakeryData.id}
      onClick={handleBakeryDetails}
    >
      <div>
        <h3 className={styles.name}>{eachBakeryData.name}</h3>
        <div className={styles.address}>{eachBakeryData.address}</div>
      </div>
      <Button type="bookmark" id={eachBakeryData.id} />
      <div className={styles.hours}>{children}</div>
    </li>
  );
}

export default Place;
