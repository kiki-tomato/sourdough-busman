import { useTranslation } from "react-i18next";
import { useState } from "react";

import clock from "../assets/Clock.svg";
import caretDown from "../assets/CaretDown.svg";
import caretUp from "../assets/CaretUp.svg";
import DisplayHours from "./DisplayHours";
import styles from "./WeeklyHours.module.css";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function WeeklyHours() {
  const { t } = useTranslation();
  const { tradingHours } = useBakeryInfo();
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((open) => !open);
  }

  return (
    <>
      <div onClick={handleOpen} className={styles.weeklyHours}>
        <img src={clock} alt="clock icon" />
        <div>{t("buttons.tradingHours")}</div>
        <img
          src={isOpen ? caretUp : caretDown}
          className={styles.caretDown}
          alt="caret down icon"
        />
      </div>
      {isOpen &&
        tradingHours.map((day) => (
          <div className={styles.weekly} key={day.day}>
            <div>{day.day}</div>
            {day.closed && <div>{t("openStatus.dayoff")}</div>}
            {day.open && <DisplayHours day={day} />}
          </div>
        ))}
    </>
  );
}

export default WeeklyHours;
