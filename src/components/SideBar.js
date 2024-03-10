import { useState } from "react";
import Filter from "./Filter";
import PlaceList from "./PlaceList";

function SideBar({ filters, bakeryData }) {
  const [openFiltered, setOepnFiltered] = useState(false);
  const [distanceFiltered, setDistanceFiltered] = useState(false);

  let filtersNum;
  let isFilterOn = false;
  const filterLength = Object.entries(filters).length;

  const handleOpenFilter = function () {
    setOepnFiltered((on) => !on);
  };

  const handleDistanceFilter = function () {
    setDistanceFiltered((on) => !on);
  };

  if (openFiltered || distanceFiltered) {
    isFilterOn = true;
    filtersNum = filterLength - (filterLength - 1);
  }
  if (openFiltered && distanceFiltered) filtersNum = filterLength - 1;

  return (
    <div className="sidebar">
      <div className="filter-container">
        <Filter filterStatus={isFilterOn}>
          {filters.filter} {filtersNum}
        </Filter>
        <Filter onFilterClick={handleOpenFilter} filterStatus={openFiltered}>
          {filters.open}
        </Filter>
        <Filter
          onFilterClick={handleDistanceFilter}
          filterStatus={distanceFiltered}
        >
          {filters.distance}
        </Filter>
      </div>
      <PlaceList
        openFiltered={openFiltered}
        distanceFiltered={distanceFiltered}
        bakeryData={bakeryData}
      />
    </div>
  );
}

export default SideBar;
