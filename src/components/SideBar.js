import { useTranslation } from "react-i18next";

import Filter from "./Filter";
import starFilled from "../assets/Star-filled.svg";
import filterFilled from "../assets/filter-filled.svg";
import { useBakeries } from "../contexts/BakeriesContext";

function SideBar({ children }) {
  const { t } = useTranslation();
  const { filters } = useBakeries();

  const {
    openFiltered,
    shippingFiltered,
    dineInFiltered,
    distanceFiltered,
    savedFiltered,
    isFilterOn,
    numFilters,
  } = filters;

  return (
    <div className="sidebar">
      <div className="filter-container">
        <Filter filterStatus={isFilterOn} icon={filterFilled}>
          {t("filters.filter")} {numFilters}
        </Filter>
        <Filter
          filterStatus={savedFiltered}
          type="savedFilter"
          icon={starFilled}
        >
          {t("filters.saved")}
        </Filter>
        <Filter filterStatus={openFiltered} type="openFilter">
          {t("filters.open")}
        </Filter>
        <Filter filterStatus={distanceFiltered} type="distanceFilter">
          {t("filters.distance")}
        </Filter>
        <Filter filterStatus={dineInFiltered} type="dineInFilter">
          {t("filters.dineIn")}
        </Filter>
        <Filter filterStatus={shippingFiltered} type="shippingFilter">
          {t("filters.shipping")}
        </Filter>
      </div>
      {children}
    </div>
  );
}

export default SideBar;
