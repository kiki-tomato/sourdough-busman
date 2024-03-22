import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TradingHours({ hoursData, currentDay, currentHour }) {
  const { t } = useTranslation();
  const [textColor, setTextColor] = useState("");
  const [openOrClosed, setOpenOrClosed] = useState("");

  useEffect(() => {
    const openingTime = hoursData[currentDay].open;
    const closingTime = hoursData[currentDay].close;
    const hourInteger = Math.trunc(closingTime);
    const dayOff = hoursData[currentDay].closed;

    if (openingTime <= currentHour && currentHour < closingTime) {
      setTextColor("bakery-open");

      if (Number.isInteger(closingTime)) {
        setOpenOrClosed(
          t("openStatus.open", {
            hour: hourInteger - 12,
            minute: "00",
          })
        );
      } else {
        setOpenOrClosed(
          t("openStatus.open", {
            hour: hourInteger - 12,
            minute: (closingTime - hourInteger) * 60,
          })
        );
      }
    } else if (currentHour >= closingTime) {
      setTextColor("bakery-closed");
      setOpenOrClosed(t("openStatus.closed"));
    } else if (dayOff) {
      setTextColor("bakery-closed");
      setOpenOrClosed(t("openStatus.closureDay"));
    }
  }, [hoursData, currentDay, currentHour, t]);

  return <span className={textColor}>{openOrClosed}</span>;
}

export default TradingHours;
