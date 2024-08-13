import { useState } from "react";
import { useTranslation } from "react-i18next";

import clock from "../assets/Clock.svg";
import mapPin from "../assets/MapPin.svg";
import info from "../assets/Info.svg";
import caretDown from "../assets/CaretDown.svg";
import caretUp from "../assets/CaretUp.svg";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function WeeklyHours() {
  const { t } = useTranslation();
  const { tradingHours, address, description } = useBakeryInfo();
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((open) => !open);
  }

  return (
    <div className="">
      <div className="bakery-address">
        <img src={mapPin} alt="map pin" />
        <div>{address}</div>
      </div>
      <div onClick={handleOpen} className="weeklyHours">
        <img src={clock} alt="map pin" />
        <div>{t("buttons.tradingHours")}</div>
        <img
          src={isOpen ? caretUp : caretDown}
          className="caret-down"
          alt="caret down"
        />
      </div>
      {isOpen &&
        tradingHours.map((day) => (
          <div className="weekly" key={day.day}>
            <div>{day.day}</div>
            {day.closed && <div>{t("openStatus.dayoff")}</div>}
            {day.open?.hour < 10 && (
              <div>
                0{day.open.hour}:{day.close.min === 0 ? "00" : day.close.min} -{" "}
                {day.close.hour}:{day.close.min === 0 ? "00" : day.close.min}
              </div>
            )}
            {day.open?.hour >= 10 && (
              <div>
                {day.open.hour}:{day.close.min === 0 ? "00" : day.close.min} -{" "}
                {day.close?.hour}:{day.close.min === 0 ? "00" : day.close.min}
              </div>
            )}
          </div>
        ))}
      <div className="infomation">
        <img src={info} alt="info icon" />
        <div>{description || "--"}</div>
      </div>
    </div>
  );
}

export default WeeklyHours;
