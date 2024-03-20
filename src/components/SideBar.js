import { useState } from "react";
import Filter from "./Filter";
import PlaceList from "./PlaceList";
import BtnToResizeComponent from "./BtnToResizeComponent";

function SideBar({
  filters,
  bakeryData,
  currentLocation,
  btn,
  setBtn,
  setOepnFiltered,
  openFiltered,
  setShippingFiltered,
  shippingFiltered,
  setDineInFiltered,
  dineInFiltered,
  btnObj,
  clickedMarker,
}) {
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
          {filters.filter} {filtersNum}
        </Filter>
        <Filter onFilterClick={handleOpenFilter} filterStatus={openFiltered}>
          {filters.open}
        </Filter>
        {/* <Filter
          onFilterClick={handleDistanceFilter}
          filterStatus={distanceFiltered}
        >
          {filters.distance}
        </Filter> */}
        <Filter
          onFilterClick={handleDineInFilter}
          filterStatus={dineInFiltered}
        >
          {filters.dineIn}
        </Filter>
        <Filter
          onFilterClick={handleShippingFilter}
          filterStatus={shippingFiltered}
        >
          {filters.shipping}
        </Filter>
      </div>
      <PlaceList
        bakeryData={bakeryData}
        currentLocation={currentLocation}
        openFiltered={openFiltered}
        distanceFiltered={distanceFiltered}
        dineInFiltered={dineInFiltered}
        shippingFiltered={shippingFiltered}
        setBtn={setBtn}
        btn={btn}
        btnObj={btnObj}
      />
      <BtnToResizeComponent setBtn={setBtn} btn={btn} btnObj={btnObj} />

      <InfoWindow btn={btn} />
    </div>
  );
}

function InfoWindow({ btn }) {
  return (
    <div
      className="infoWindow-test"
      style={btn ? { visibility: "hidden" } : {}}
    >
      <div>name</div>
      <div>address</div>
      <button className="info-window-btn">button</button>
    </div>
  );
}

export default SideBar;
