import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getToday } from "../utils/helpers";

function TradingHours({ hoursData }) {
  const { t } = useTranslation();
  const [textColor, setTextColor] = useState("");
  const [openOrClosed, setOpenOrClosed] = useState("");

  const { today, currentTime } = getToday();

  useEffect(() => {
    const open = hoursData[today].open;
    const dayOff = hoursData[today].closed;

    if (open) {
      const closingHour = hoursData[today].close.hour;
      const closingMin = hoursData[today].close.min;
      const openingTime = Number(
        `${hoursData[today].open.hour}.${hoursData[today].open.min}`
      );
      const closingTime = Number(`${closingHour}.${closingMin}`);

      if (openingTime <= currentTime && currentTime < closingTime) {
        setTextColor("bakery-open");

        closingMin === 0
          ? setOpenOrClosed(
              t("openStatus.open", {
                hour: closingHour - 12,
                minute: "00",
              })
            )
          : setOpenOrClosed(
              t("openStatus.open", {
                hour: closingHour - 12,
                minute: closingMin,
              })
            );
      } else if (currentTime >= closingTime) {
        setTextColor("bakery-closed");
        setOpenOrClosed(t("openStatus.closed"));
      } else if (currentTime < openingTime) {
        setTextColor("bakery-closed");
        setOpenOrClosed(t("openStatus.notOpenYet"));
      }
    }

    if (dayOff) {
      setTextColor("bakery-closed");
      setOpenOrClosed(t("openStatus.closureDay"));
    }
  }, [hoursData, today, currentTime, t]);

  return <span className={textColor}>{openOrClosed}</span>;
}

export default TradingHours;
