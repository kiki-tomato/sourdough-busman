import Filter from "./Filter";
import { useTranslation } from "react-i18next";

function SideBar({
  openFiltered,
  shippingFiltered,
  dineInFiltered,
  distanceFiltered,
  setOepnFiltered,
  setShippingFiltered,
  setDineInFiltered,
  setDistanceFiltered,
  children,
}) {
  const { t } = useTranslation();

  const filterLength = Object.entries(
    t("filter", { returnObjects: true })
  ).length;

  let filtersNum;
  let isFilterOn = false;

  const handleOpenFilter = function () {
    setOepnFiltered((on) => !on);
  };

  const handleDistanceFilter = function () {
    setDistanceFiltered((on) => !on);
  };

  const handleShippingFilter = function () {
    setShippingFiltered((on) => !on);
  };

  const handleDineInFilter = function () {
    setDineInFiltered((on) => !on);
  };

  if (openFiltered || distanceFiltered || shippingFiltered || dineInFiltered) {
    isFilterOn = true;
    filtersNum = filterLength - (filterLength - 1);
  }
  if (
    (openFiltered && distanceFiltered) ||
    (openFiltered && shippingFiltered) ||
    (openFiltered && dineInFiltered) ||
    (distanceFiltered && shippingFiltered) ||
    (distanceFiltered && dineInFiltered) ||
    (shippingFiltered && dineInFiltered)
  )
    filtersNum = filterLength - (filterLength - 2);
  if (
    (openFiltered && distanceFiltered && shippingFiltered) ||
    (openFiltered && distanceFiltered && dineInFiltered) ||
    (openFiltered && dineInFiltered && shippingFiltered) ||
    (distanceFiltered && shippingFiltered && dineInFiltered)
  )
    filtersNum = filterLength - (filterLength - 3);

  if (openFiltered && distanceFiltered && shippingFiltered && dineInFiltered)
    filtersNum = filterLength - 1;

  return (
    <div className="sidebar">
      <div className="filter-container">
        <Filter filterStatus={isFilterOn}>
          {t("filters.filter")} {filtersNum}
        </Filter>
        <Filter onFilterClick={handleOpenFilter} filterStatus={openFiltered}>
          {t("filters.open")}
        </Filter>
        <Filter
          onFilterClick={handleDistanceFilter}
          filterStatus={distanceFiltered}
        >
          {t("filters.distance")}
        </Filter>
        <Filter
          onFilterClick={handleDineInFilter}
          filterStatus={dineInFiltered}
        >
          {t("filters.dineIn")}
        </Filter>
        <Filter
          onFilterClick={handleShippingFilter}
          filterStatus={shippingFiltered}
        >
          {t("filters.shipping")}
        </Filter>
      </div>
      {children}
    </div>
  );
}

export default SideBar;
