import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import styles from "./Place.module.scss";

function Place({ eachBakeryData, children }) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const bakeryId = eachBakeryData.id;
  const distanceData = eachBakeryData.distance;

  function handleBakeryDetails(e) {
    const btnBookmark = e.target.closest("#btn-bookmark");

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
        <span className={styles.name}>{eachBakeryData.name}</span>
        <div className={styles.address}>{eachBakeryData.address}</div>
      </div>
      <Button type="bookmark" id={eachBakeryData.id} />
      <div className={styles.hours}>
        {distanceData > 10000 || (
          <>
            <span>{distanceData}km</span>
            <span>|</span>
          </>
        )}
        {children}
      </div>
    </li>
  );
}

export default Place;
