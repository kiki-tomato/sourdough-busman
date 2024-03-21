import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TradingHours({ hoursData, currentDay, currentHour }) {
  const { t } = useTranslation();
  const [textColor, setTextColor] = useState("");
  const [openOrClosed, setOpenOrClosed] = useState("");

  useEffect(() => {
    if (
      hoursData[currentDay].open <= currentHour &&
      currentHour < hoursData[currentDay].close
    ) {
      setTextColor("bakery-open");

      if (Number.isInteger(hoursData[currentDay].close)) {
        setOpenOrClosed(
          t("openStatus.open", {
            hour: Math.trunc(hoursData[currentDay].close) - 12,
            minute: "00",
          })
        );
      } else {
        setOpenOrClosed(
          t("openStatus.open", {
            hour: Math.trunc(hoursData[currentDay].close) - 12,
            minute:
              (hoursData[currentDay].close -
                Math.trunc(hoursData[currentDay].close)) *
              60,
          })
        );
      }
    } else if (currentHour >= hoursData[currentDay].close) {
      setTextColor("bakery-closed");
      setOpenOrClosed(t("openStatus.closed"));
    } else if (hoursData[currentDay].closed) {
      setTextColor("bakery-closed");
      setOpenOrClosed(t("openStatus.closureDay"));
    }
  }, [hoursData, currentDay, currentHour, t]);

  return <span className={textColor}>{openOrClosed}</span>;
}

export default TradingHours;
