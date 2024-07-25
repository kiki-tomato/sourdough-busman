import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import TradingHours from "../../ui/TradingHours";
import ShippingInfo from "../../ui/ShippingInfo";
import Button from "../../ui/Button";
import About from "../../ui/About";

import { usePosition } from "../../contexts/PositionContext";
import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function InfoWindow() {
  const { t } = useTranslation();
  const { infoWindowPosition } = usePosition();
  const { pathname, search } = useLocation();
  const { bakery, name, address, tradingHours, id } = useBakeryInfo();
  const navigate = useNavigate();
  const infoWindowElement = useRef(null);

  const style = infoWindowPosition && {
    top: infoWindowPosition.y,
    left: infoWindowPosition.x,
  };

  const handleInfoWindow = useCallback(() => {
    navigate(`/bakeries${search}`);
  }, [search, navigate]);

  useEffect(() => {
    const mediaQuery600 = window.matchMedia("(max-width: 600px)");
    const mediaQuery1000 = window.matchMedia("(max-width: 1000px)");

    mediaQuery600.addEventListener("change", handleInfoWindow);
    mediaQuery1000.addEventListener("change", handleInfoWindow);

    return () => {
      mediaQuery600.removeEventListener("change", handleInfoWindow);
      mediaQuery1000.removeEventListener("change", handleInfoWindow);
    };
  }, [handleInfoWindow]);

  if (!infoWindowPosition && !pathname.includes("details"))
    return <Navigate to={`/bakeries${search}`} replace={true} />;

  if (bakery && infoWindowPosition)
    return (
      <div className="info-window" style={style} ref={infoWindowElement}>
        <div className="bakery-name">
          <div>✸ {name}</div>
          <button onClick={handleInfoWindow}>&times;</button>
        </div>
        <div>{address}</div>
        <About>
          <TradingHours type="info-window" hoursData={tradingHours} />
          <ShippingInfo>{t("buttons.shippingAvailable")}</ShippingInfo>
        </About>
        <div className="info-window-btns">
          <Button type="link"> {t("buttons.moreDetails")}</Button>
          <Button type="info-window-bookmark" id={id}>
            {t("buttons.bookmark")}
          </Button>
        </div>
      </div>
    );
}

export default InfoWindow;
