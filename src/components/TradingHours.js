import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TradingHours({ hoursData, currentDay, currentTime }) {
  const { t } = useTranslation();
  const [textColor, setTextColor] = useState("");
  const [openOrClosed, setOpenOrClosed] = useState("");

  useEffect(() => {
    const open = hoursData[currentDay].open;
    const dayOff = hoursData[currentDay].closed;

    if (open) {
      const closingHour = hoursData[currentDay].close.hour;
      const closingMin = hoursData[currentDay].close.min;
      const openingTime = Number(
        `${hoursData[currentDay].open.hour}.${hoursData[currentDay].open.min}`
      );
      const closingTime = Number(`${closingHour}.${closingMin}`);

      if (openingTime <= currentTime && currentTime < closingTime) {
        setTextColor("bakery-open");

        if (closingMin === 0) {
          setOpenOrClosed(
            t("openStatus.open", {
              hour: closingHour - 12,
              minute: "00",
            })
          );
        } else {
          setOpenOrClosed(
            t("openStatus.open", {
              hour: closingHour - 12,
              minute: closingMin,
            })
          );
        }
      } else if (currentTime >= closingTime) {
        setTextColor("bakery-closed");
        setOpenOrClosed(t("openStatus.closed"));
      } else if (currentTime < openingTime) {
        setTextColor("bakery-closed");
        setOpenOrClosed(t("openStatus.notOpenYet"));
      }
    } else if (dayOff) {
      setTextColor("bakery-closed");
      setOpenOrClosed(t("openStatus.closureDay"));
    }
  }, [hoursData, currentDay, currentTime, t]);

  return <span className={textColor}>{openOrClosed}</span>;
}

export default TradingHours;
