import { useState } from "react";
import { useTranslation } from "react-i18next";

import PlaceName from "./PlaceName";
import InfoList from "./InfoList";
import BtnClose from "../../ui/BtnClose";
import Footer from "../../ui/Footer";
import Section from "./Section";
import styles from "./PlaceDetails.module.scss";

function PlaceDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  function handleModalShare(e) {
    const modal = e.target.closest("#modal");
    const btnShare = e.target.closest("#btn-share");

    if (!modal && !btnShare) setIsModalOpen(false);
  }

  return (
    <div className={styles.placeDetails} onClick={handleModalShare}>
      <BtnClose isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <PlaceName />
      <InfoList />
      <Section type="review" heading={t("info.review")} />
      <Section type="mini-map" heading={t("info.location")} />
      <Footer />
    </div>
  );
}

export default PlaceDetails;
