import WeeklyHours from "./WeeklyHours";
import mapPin from "../assets/MapPin.svg";
import info from "../assets/Info.svg";
import styles from "./InfoList.module.css";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function InfoList() {
  const { address, description } = useBakeryInfo();

  return (
    <div className="info-list">
      <div className={styles.info}>
        <img className={styles.icon} src={mapPin} alt="map pin icon" />
        <div>{address}</div>
      </div>
      <WeeklyHours />
      <div className={styles.info}>
        <img className={styles.icon} src={info} alt="info icon" />
        <div>{description || "--"}</div>
      </div>
    </div>
  );
}

export default InfoList;
