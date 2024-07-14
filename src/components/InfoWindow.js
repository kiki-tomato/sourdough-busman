import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useBookmarks } from "../contexts/BookmarksContext";
import { useBakeries } from "../contexts/BakeriesContext";
import { useToday } from "../contexts/TodayContext";

function InfoWindow() {
  const { t } = useTranslation();
  const { bakeryData, filterData, infoWindowPosition, setInfoWindowPosition } =
    useBakeries();
  const { updateBookmarks, matchingData } = useBookmarks();
  const { today, currentTime } = useToday();
  const { bakeryId } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  let filteredData = filterData(bakeryData, today, currentTime);
  let bakery = filteredData.filter((data) => data.id === bakeryId)[0];

  const bakeryOpen = bakery?.hours[today].open;
  const openingTime = Number(`${bakeryOpen?.hour}.${bakeryOpen?.min}`);
  const closingHour = bakery?.hours[today].close?.hour;
  const closingMin = bakery?.hours[today].close?.min;
  const shippingAvail = bakery?.shippingService;
  const descriptionAvail = bakery?.description;

  const style = infoWindowPosition && {
    top: infoWindowPosition.y,
    left: infoWindowPosition.x,
  };

  function handleBookmark() {
    updateBookmarks(bakery.id);
  }

  const handleInfoWindow = useCallback(() => {
    navigate(`bakeries${search}`);
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

  useEffect(() => {
    function setPosition() {
      if (window.innerWidth <= 600) {
        setInfoWindowPosition({ x: 0, y: "initial" });
      }
    }

    window.addEventListener("load", setPosition);

    return () => window.removeEventListener("load", setPosition);
  }, [setInfoWindowPosition]);

  if (bakery)
    return (
      <div className="info-window" style={style}>
        <div className="bakery-name">
          <div>✸ {bakery.name}</div>
          <button onClick={handleInfoWindow}>&times;</button>
        </div>
        <div>{bakery.address}</div>
        <div className="short-info">
          <div>{t("buttons.shortInfo")}</div>
          {descriptionAvail ? <div>"{bakery.description}"</div> : ""}
          <div className="extra-info">
            {bakeryOpen ? (
              <span>
                {currentTime < openingTime
                  ? t("openStatus.notOpenYet")
                  : closingMin === 0
                  ? t("openStatus.open", {
                      hour: closingHour - 12,
                      minute: "00",
                    })
                  : t("openStatus.open", {
                      hour: closingHour - 12,
                      minute: closingMin,
                    })}
              </span>
            ) : (
              <span>{t("openStatus.closureDay")}</span>
            )}
            {shippingAvail ? (
              <>
                <span>|</span>
                <span>{t("buttons.shippingAvailable")}</span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="info-window-btns">
          <a href={bakery.naverMap} target="_blank" rel="noreferrer">
            <button className="btn-more-details">
              {t("buttons.moreDetails")}
            </button>
          </a>
          <button
            className={`btn-bookmark ${
              matchingData(bakery.id) ? "bookmarked" : ""
            }`}
            data-id={bakery.id}
            onClick={handleBookmark}
          >
            {t("buttons.bookmark")}
          </button>
        </div>
      </div>
    );
}

export default InfoWindow;
