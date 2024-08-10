import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TradingHours from "../../ui/TradingHours";
import ShippingInfo from "../../ui/ShippingInfo";
import Button from "../../ui/Button";
import MiniMap from "../../ui/MiniMap";
import LocationInfo from "../../ui/LocationInfo";
import About from "../../ui/About";
import Review from "../../ui/Review";
import Overview from "../../ui/Overview";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function PlaceDetails() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const { bakery, tradingHours, id, naverMap } = useBakeryInfo();
  const navigate = useNavigate();

  function handleClose() {
    navigate(`/${search}`);
  }

  if (bakery)
    return (
      <div className="place-details">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chevron-left icon-left"
          viewBox="0 0 16 16"
          onClick={handleClose}
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
        <Overview />
        <About>
          <TradingHours type="info-window" hoursData={tradingHours} />
          <ShippingInfo>{t("info.shippingAvailable")}</ShippingInfo>
        </About>
        <Review />
        <LocationInfo>
          <MiniMap />
        </LocationInfo>
        <div className="info-window-btns">
          <Button type="link" url={naverMap}>
            {t("buttons.link")}
          </Button>
          <Button type="info-window-bookmark" id={id}>
            {t("buttons.bookmark")}
          </Button>
        </div>
      </div>
    );
}

export default PlaceDetails;
