import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function InfoWindow() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const { bakery, name, address, id } = useBakeryInfo();
  const navigate = useNavigate();

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

  if (bakery)
    return (
      <div className="info-window">
        <div className="bakery-name">
          <div>✸ {name}</div>
          <button onClick={handleInfoWindow}>&times;</button>
        </div>
        <div>{address}</div>
        <div className="one-sentence-review">
          <span>★ 4.5</span>
          <div>{t("buttons.oneSentenceReview")}: coming soon </div>
        </div>
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
