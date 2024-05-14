import Filter from "./Filter";
import { useTranslation } from "react-i18next";
import starFilled from "../assets/Star-filled.svg";
import filterFilled from "../assets/filter-filled.svg";

function SideBar({
  openFiltered,
  shippingFiltered,
  dineInFiltered,
  distanceFiltered,
  savedFiltered,
  setOepnFiltered,
  setShippingFiltered,
  setDineInFiltered,
  setDistanceFiltered,
  setSavedFiltered,
  children,
}) {
  const { t } = useTranslation();

  const filterLength = Object.entries(
    t("filters", { returnObjects: true })
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

  function handleSavedFilter() {
    setSavedFiltered((on) => !on);
  }

  if (
    openFiltered ||
    distanceFiltered ||
    shippingFiltered ||
    dineInFiltered ||
    savedFiltered
  ) {
    isFilterOn = true;
    filtersNum = filterLength - (filterLength - 1);
  }

  if (
    (openFiltered && distanceFiltered) ||
    (openFiltered && shippingFiltered) ||
    (openFiltered && dineInFiltered) ||
    (openFiltered && savedFiltered) ||
    (distanceFiltered && shippingFiltered) ||
    (distanceFiltered && dineInFiltered) ||
    (distanceFiltered && savedFiltered) ||
    (dineInFiltered && savedFiltered) ||
    (shippingFiltered && savedFiltered) ||
    (shippingFiltered && dineInFiltered)
  )
    filtersNum = filterLength - (filterLength - 2);

  if (
    (openFiltered && distanceFiltered && shippingFiltered) ||
    (openFiltered && distanceFiltered && dineInFiltered) ||
    (openFiltered && distanceFiltered && savedFiltered) ||
    (openFiltered && dineInFiltered && shippingFiltered) ||
    (openFiltered && dineInFiltered && savedFiltered) ||
    (openFiltered && shippingFiltered && savedFiltered) ||
    (distanceFiltered && dineInFiltered && savedFiltered) ||
    (distanceFiltered && shippingFiltered && savedFiltered) ||
    (distanceFiltered && shippingFiltered && dineInFiltered) ||
    (savedFiltered && shippingFiltered && dineInFiltered)
  )
    filtersNum = filterLength - (filterLength - 3);

  if (
    openFiltered &&
    distanceFiltered &&
    shippingFiltered &&
    dineInFiltered &&
    savedFiltered
  )
    filtersNum = filterLength - 1;

  return (
    <div className="sidebar">
      <div className="filter-container">
        <Filter filterStatus={isFilterOn} icon={filterFilled}>
          {t("filters.filter")} {filtersNum}
        </Filter>
        <Filter
          onFilterClick={handleSavedFilter}
          filterStatus={savedFiltered}
          icon={starFilled}
        >
          {t("filters.saved")}
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
