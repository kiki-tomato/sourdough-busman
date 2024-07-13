import { useTranslation } from "react-i18next";

import Filter from "./Filter";
import starFilled from "../assets/Star-filled.svg";
import filterFilled from "../assets/filter-filled.svg";

import { useUrl } from "../hooks/useUrl";
import { useResize } from "../contexts/ResizeContext";
import { useEffect, useState } from "react";

function SideBar({ children }) {
  const { t } = useTranslation();
  const { filterQuery } = useUrl();
  const { resize } = useResize();
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  const numFilters = filterQuery.length;

  const defaultPosition = {
    transition: `transform 0.5s ease-out`,
  };
  const openPoistion = {
    transform: `translate3d(0px, 40px, 0px)`,
    transition: `transform 0.5s ease-out`,
  };

  useEffect(() => {
    const mediaQuery600 = window.matchMedia("(max-width: 600px)");

    function getViewportSize(e) {
      setIsSmallViewport(e.matches);
    }

    window.addEventListener("load", function () {
      if (window.innerWidth <= 600) setIsSmallViewport(true);
    });
    mediaQuery600.addEventListener("change", getViewportSize);
  }, []);

  if (!isSmallViewport)
    return (
      <div className="sidebar">
        <div className="filter-container">
          <Filter icon={filterFilled} type="filterSummary">
            {t("filters.filter")} {numFilters}
          </Filter>
          <Filter type="savedFilter" icon={starFilled}>
            {t("filters.saved")}
          </Filter>
          <Filter type="openFilter">{t("filters.open")}</Filter>
          <Filter type="distanceFilter">{t("filters.distance")}</Filter>
          <Filter type="dineInFilter">{t("filters.dineIn")}</Filter>
          <Filter type="shippingFilter">{t("filters.shipping")}</Filter>
        </div>
        {children}
      </div>
    );

  if (isSmallViewport)
    return (
      <div className="sidebar" style={resize ? openPoistion : defaultPosition}>
        <div className="filter-container">
          <Filter icon={filterFilled} type="filterSummary">
            {t("filters.filter")} {numFilters}
          </Filter>
          <Filter type="savedFilter" icon={starFilled}>
            {t("filters.saved")}
          </Filter>
          <Filter type="openFilter">{t("filters.open")}</Filter>
          <Filter type="distanceFilter">{t("filters.distance")}</Filter>
          <Filter type="dineInFilter">{t("filters.dineIn")}</Filter>
          <Filter type="shippingFilter">{t("filters.shipping")}</Filter>
        </div>
        {children}
      </div>
    );
}

export default SideBar;
