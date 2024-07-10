import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useBookmarks } from "../contexts/BookmarksContext";
import { useBakeries } from "../contexts/BakeriesContext";
import { useToday } from "../contexts/TodayContext";

function InfoWindow({ resize }) {
  const { t } = useTranslation();
  const { bakeryData, filterData, markerPosition } = useBakeries();
  const { updateBookmarks, matchingData } = useBookmarks();
  const { today, currentTime } = useToday();
  const { bakeryId } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [viewport, setViewport] = useState(false);

  let filteredData = filterData(bakeryData, today, currentTime);
  let bakery = filteredData.filter((data) => data.id === bakeryId)[0];

  const bakeryOpen = bakery?.hours[today].open;
  const openingTime = Number(`${bakeryOpen?.hour}.${bakeryOpen?.min}`);
  const closingHour = bakery?.hours[today].close?.hour;
  const closingMin = bakery?.hours[today].close?.min;
  const shippingAvail = bakery?.shippingService;
  const descriptionAvail = bakery?.description;

  const largeVw = {
    top: markerPosition ? markerPosition.y + 10 : "60%",
    left: markerPosition ? markerPosition.x : "50%",
  };
  const smallVw = {};

  function handleBookmark() {
    updateBookmarks(bakery.id);
  }

  function handleInfoWindow() {
    navigate(`bakeries${search}`);
  }

  useEffect(() => {
    const mediaQuery600 = window.matchMedia("(max-width: 600px)");
    const mediaQuery1000 = window.matchMedia("(max-width: 1000px)");

    function setStyle(e) {
      navigate(`bakeries${search}`);
      setViewport(e.matches);
      console.log(e);
    }

    mediaQuery600.addEventListener("change", setStyle);
    mediaQuery1000.addEventListener("change", setStyle);

    return () => mediaQuery600.removeEventListener("change", setStyle);
  }, [navigate, search]);

  if (bakery)
    return (
      <div
        className={resize ? "info-window info-window-hidden" : "info-window"}
        style={viewport ? smallVw : largeVw}
      >
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
            className={
              matchingData(bakery.id)
                ? "btn-bookmark bookmarked"
                : "btn-bookmark"
            }
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
