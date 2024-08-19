import { useTranslation } from "react-i18next";

import PlaceName from "../../ui/PlaceName";
import TradingHours from "../../ui/TradingHours";
import ShippingInfo from "../../ui/ShippingInfo";
import Button from "../../ui/Button";
import Infomation from "../../ui/Infomation";
import MiniMap from "./MiniMap";
import Review from "../../ui/Review";
import BtnClose from "../../ui/BtnClose";
import Footer from "../../ui/Footer";
import styles from "./PlaceDetails.module.css";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function PlaceDetails() {
  const { t } = useTranslation();
  const { bakery, tradingHours, id, naverMap } = useBakeryInfo();

  if (bakery)
    return (
      <div className={styles.placeDetails}>
        <BtnClose />
        <PlaceName />
        <Infomation>
          <TradingHours hoursData={tradingHours} />
          <ShippingInfo>{t("info.shippingAvailable")}</ShippingInfo>
        </Infomation>
        <Review />
        <MiniMap />
        <div className={styles.btnBox}>
          <Button type="link" url={naverMap}>
            {t("buttons.link")}
          </Button>
          <Button type="place-detail-bookmark" id={id}>
            {t("buttons.bookmark")}
          </Button>
        </div>
        <Footer />
      </div>
    );
}

export default PlaceDetails;
