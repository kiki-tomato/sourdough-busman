import { useTranslation } from "react-i18next";

import Filter from "./Filter";
import styles from "./Sidebar.module.css";

import { useQueryString } from "../../hooks/useQueryString";
import { useResize } from "../../contexts/ResizeContext";

function Sidebar({ children }) {
  const { t } = useTranslation();
  const { filterQuery } = useQueryString();
  const { isSidebarOpen, isSmallViewport } = useResize();

  const numFilters = filterQuery.length;

  const defaultStyle = {
    transform: "translate3d(0px, 100vh, 0px)",
  };

  const openStyle = {
    transform: "translate3d(0px, 50px, 0px)",
  };

  if (isSmallViewport)
    return (
      <div
        className={styles.sidebarSm}
        style={isSidebarOpen ? openStyle : defaultStyle}
      >
        <div className={styles.filterContainer}>
          <Filter type="filterSummary">
            {t("filters.filter")} {numFilters}
          </Filter>
          <Filter type="savedFilter">{t("filters.saved")}</Filter>
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
      <div className={styles.sidebar}>
        <div className={styles.filterContainer}>
          <Filter type="filterSummary">
            {t("filters.filter")} {numFilters}
          </Filter>
          <Filter type="savedFilter">{t("filters.saved")}</Filter>
          <Filter type="openFilter">{t("filters.open")}</Filter>
          <Filter type="distanceFilter">{t("filters.distance")}</Filter>
          <Filter type="dineInFilter">{t("filters.dineIn")}</Filter>
          <Filter type="shippingFilter">{t("filters.shipping")}</Filter>
        </div>
        {children}
      </div>
    );
}

export default Sidebar;
