import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import styles from "./InfoWindow.module.css";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";

function InfoWindow() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const { bakery, name, rate, comment, img } = useBakeryInfo();
  const navigate = useNavigate();

  const starRate = rate ? `★ ${rate}` : "★ -";
  const review = comment ? comment : "coming soon";

  const handleInfoWindow = useCallback(() => {
    navigate(`/bakeries${search}`);
  }, [search, navigate]);

  // useEffect(() => {
  //   const mediaQuery600 = window.matchMedia("(max-width: 600px)");
  //   const mediaQuery1000 = window.matchMedia("(max-width: 1000px)");

  //   mediaQuery600.addEventListener("change", handleInfoWindow);
  //   mediaQuery1000.addEventListener("change", handleInfoWindow);

  //   return () => {
  //     mediaQuery600.removeEventListener("change", handleInfoWindow);
  //     mediaQuery1000.removeEventListener("change", handleInfoWindow);
  //   };
  // }, [handleInfoWindow]);

  return (
    <div className="info-window">
      <img
        src={
          img ? img : "https://via.placeholder.com/320/ddd/000?text=coming+soon"
        }
        alt=""
      />
      <div className="infomation_">
        <div className="bakery-name">
          <div>{name}</div>
          <button onClick={handleInfoWindow}>&times;</button>
        </div>
        <div className="one-sentence-review">
          <span>{starRate}</span>
          <div>
            {t("info.oneSentenceReview")}: {review}
          </div>
        </div>
        <div className="info-window-btns">
          <Button type="link"> {t("buttons.moreDetails")}</Button>
        </div>
      </div>
    </div>
  );
}

export default InfoWindow;
