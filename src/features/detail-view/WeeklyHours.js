import { useTranslation } from "react-i18next";

import TradingHours from "../../ui/TradingHours";
import styles from "./WeeklyHours.module.scss";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function WeeklyHours() {
  const { t } = useTranslation();
  const { tradingHours } = useBakeryInfo();

  return (
    <div className={styles.weekly}>
      {tradingHours.map((day) => (
        <div className={styles.dayList} key={day.day}>
          <div className={styles.day}>{day.day}</div>
          {day.closed && <div>{t("openStatus.dayoff")}</div>}
          {day.open && <TradingHours day={day} />}
        </div>
      ))}
    </div>
  );
}

export default WeeklyHours;
