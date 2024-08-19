import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import styles from "./Place.module.css";

function Place({ eachBakeryData, children }) {
  const [isActive, setIsActive] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  const bakeryId = eachBakeryData.id;

  function handleBakeryDetails(e) {
    const btnBookmark = e.target.closest(".sidebar-bookmark");

    if (btnBookmark) return;
    navigate(`/details/${bakeryId}${search}`);
  }

  function handleActiveList() {
    setIsActive(true);
  }

  function handleDeactivateList() {
    setIsActive(false);
  }

  return (
    <li
      className={isActive ? `${styles.place} ${styles.active}` : styles.place}
      data-id={eachBakeryData.id}
      onClick={handleBakeryDetails}
      onMouseOver={handleActiveList}
      onMouseOut={handleDeactivateList}
    >
      <div className={styles.placeHeader}>
        <h3>{eachBakeryData.name}</h3>
        <Button type="sidebar-bookmark" id={eachBakeryData.id} />
      </div>
      <div>{eachBakeryData.address}</div>
      <div>{children}</div>
    </li>
  );
}

export default Place;
