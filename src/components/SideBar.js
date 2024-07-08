import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Filter from "./Filter";
import starFilled from "../assets/Star-filled.svg";
import filterFilled from "../assets/filter-filled.svg";

function SideBar({ children }) {
  const { t } = useTranslation();
  const { search } = useLocation();

  const isFilterOn = search
    ? search
        .slice(1)
        .split("&")
        .map((filter) => filter.slice(0, -3))
    : [];

  const numFilters = isFilterOn.length;

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
