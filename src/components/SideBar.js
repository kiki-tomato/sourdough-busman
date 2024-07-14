import { useTranslation } from "react-i18next";

import Filter from "./Filter";
import starFilled from "../assets/Star-filled.svg";
import filterFilled from "../assets/filter-filled.svg";

import { useUrl } from "../hooks/useUrl";
import { useResize } from "../contexts/ResizeContext";

function SideBar({ children }) {
  const { t } = useTranslation();
  const { filterQuery } = useUrl();
  const { isOpen, isSmallViewport } = useResize();

  const numFilters = filterQuery.length;

  const defaultStyle = {
    transform: `translate3d(0px, 100vh, 0px)`,
  };

  const openStyle = {
    transform: `translate3d(0px, 40px, 0px)`,
  };

  if (isSmallViewport)
    return (
      <div className="sidebar-sm" style={isOpen ? openStyle : defaultStyle}>
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
}

export default SideBar;
