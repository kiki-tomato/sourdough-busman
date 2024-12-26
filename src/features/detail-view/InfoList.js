import { useTranslation } from "react-i18next";
import { useState } from "react";

import InfoItem from "./InfoItem";
import WeeklyHours from "./WeeklyHours";
import styles from "./InfoList.module.scss";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function InfoList() {
  const { t } = useTranslation();
  const { address, description, shippingAvail } = useBakeryInfo();
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((open) => !open);
  }

  return (
    <section className={styles.infoList}>
      <InfoItem type="address" text={address} />
      <InfoItem type="trading-hour" isOpen={isOpen} handleOpen={handleOpen} />
      {isOpen && <WeeklyHours />}
      {shippingAvail && (
        <InfoItem type="shipping" text={t("info.shippingAvailable")} />
      )}
      <InfoItem type="extra-info" text={description || "--"} />
    </section>
  );
}

export default InfoList;
