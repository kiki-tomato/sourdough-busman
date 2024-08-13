import { useTranslation } from "react-i18next";

import Filter from "./Filter";
import heartFilled from "../../assets/Heart-filled.svg";
import filterFilled from "../../assets/filter-filled.svg";

import { useQueryString } from "../../hooks/useQueryString";
import { useResize } from "../../contexts/ResizeContext";

function SideBar({ children }) {
  const { t } = useTranslation();
  const { filterQuery } = useQueryString();
  const { isSidebarOpen, isSmallViewport } = useResize();

  const numFilters = filterQuery.length;

  const defaultStyle = {
    transform: "translate3d(0px, 100vh, 0px)",
  };

  const openStyle = {
    transform: "translate3d(0px, 40px, 0px)",
  };

  if (isSmallViewport)
    return (
      <div
        className="sidebar-sm"
        style={isSidebarOpen ? openStyle : defaultStyle}
      >
        <div className="filter-container">
          <Filter icon={filterFilled} type="filterSummary">
            {t("filters.filter")} {numFilters}
          </Filter>
          <Filter type="savedFilter" icon={heartFilled}>
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
          <Filter type="savedFilter" icon={heartFilled}>
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
