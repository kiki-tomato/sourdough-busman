import { useState } from "react";

import PlaceName from "../../ui/PlaceName";
import InfoList from "../../ui/InfoList";
import MiniMap from "./MiniMap";
import BtnClose from "../../ui/BtnClose";
import Review from "../../ui/Review";
import Footer from "../../ui/Footer";
import styles from "./PlaceDetails.module.css";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function PlaceDetails() {
  const { bakery } = useBakeryInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalShare(e) {
    const modal = e.target.closest("#modal");
    const btnShare = e.target.closest("#btn-share");

    if (!modal && !btnShare) setIsModalOpen(false);
  }

  if (bakery)
    return (
      <div className={styles.placeDetails} onClick={handleModalShare}>
        <BtnClose isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <PlaceName />
        <InfoList />
        <Review />
        <MiniMap />
        <Footer />
      </div>
    );
}

export default PlaceDetails;
