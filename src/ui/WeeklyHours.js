import { useTranslation } from "react-i18next";
import { useState } from "react";

import DisplayHours from "./DisplayHours";
import TradingHours from "./TradingHours";
import styles from "./WeeklyHours.module.scss";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function WeeklyHours() {
  const { t } = useTranslation();
  const { tradingHours } = useBakeryInfo();
  const [isOpen, setIsOpen] = useState(false);

  const arrowStyle = isOpen ? { transform: "rotate(180deg)" } : {};

  function handleOpen() {
    setIsOpen((open) => !open);
  }

  return (
    <>
      <div onClick={handleOpen} className={styles.weeklyHours}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.icon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div>{t("buttons.tradingHours")}</div>
        <TradingHours hoursData={tradingHours} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.arrow}
          style={arrowStyle}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.weekly}>
          {tradingHours.map((day) => (
            <div className={styles.dayList} key={day.day}>
              <div className={styles.day}>{day.day}</div>
              {day.closed && <div>{t("openStatus.dayoff")}</div>}
              {day.open && <DisplayHours day={day} />}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WeeklyHours;
