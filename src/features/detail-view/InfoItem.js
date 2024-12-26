import { useTranslation } from "react-i18next";

import OpenToday from "../../ui/OpenToday";
import Icons from "../../ui/Icons";
import styles from "./InfoItem.module.scss";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function InfoItem({ type, text, isOpen, handleOpen }) {
  const { t } = useTranslation();
  const { tradingHours } = useBakeryInfo();

  if (type === "trading-hour")
    return (
      <button
        onClick={handleOpen}
        className={styles.weeklyHours}
        aria-label="Show all trading hours"
      >
        <Icons name="iconClock" />
        <div>{t("buttons.tradingHours")}</div>
        <OpenToday hoursData={tradingHours} />
        <Icons name="iconArrowDown" isOpen={isOpen} />
      </button>
    );

  return (
    <div className={styles.info}>
      {type === "address" && <Icons name="iconMapPin" />}
      {type === "shipping" && <Icons name="iconTruck" />}
      {type === "extra-info" && <Icons name="iconInfo" />}
      <div>{text}</div>
    </div>
  );
}

export default InfoItem;
