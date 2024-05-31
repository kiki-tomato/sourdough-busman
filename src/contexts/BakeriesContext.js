import { createContext, useContext, useReducer } from "react";
import { useTranslation } from "react-i18next";

import { usePosition } from "../hooks/usePosition";
import { useBookmarks } from "../contexts/BookmarksContext";

const BakeriesContext = createContext();

const initialState = {
  openFiltered: false,
  shippingFiltered: false,
  dineInFiltered: false,
  distanceFiltered: false,
  savedFiltered: false,
  isFilterOn: false,
  numFilters: 0,
};

function reducer(state, action) {
  function calcNumFilters(numfilters, filterStatus) {
    const value = !filterStatus ? 1 : -1;
    return numfilters + value;
  }

  switch (action.type) {
    case "openFilter":
      return {
        ...state,
        openFiltered: !state.openFiltered,
        numFilters: calcNumFilters(state.numFilters, state.openFiltered),
        isFilterOn: calcNumFilters(state.numFilters, state.openFiltered)
          ? true
          : false,
      };

    case "shippingFilter":
      return {
        ...state,
        shippingFiltered: !state.shippingFiltered,
        numFilters: calcNumFilters(state.numFilters, state.shippingFiltered),
        isFilterOn: calcNumFilters(state.numFilters, state.shippingFiltered)
          ? true
          : false,
      };

    case "dineInFilter":
      return {
        ...state,
        dineInFiltered: !state.dineInFiltered,
        numFilters: calcNumFilters(state.numFilters, state.dineInFiltered),
        isFilterOn: calcNumFilters(state.numFilters, state.dineInFiltered)
          ? true
          : false,
      };

    case "distanceFilter":
      return {
        ...state,
        distanceFiltered: !state.distanceFiltered,
        numFilters: calcNumFilters(state.numFilters, state.distanceFiltered),
        isFilterOn: calcNumFilters(state.numFilters, state.distanceFiltered)
          ? true
          : false,
      };

    case "savedFilter":
      return {
        ...state,
        savedFiltered: !state.savedFiltered,
        numFilters: calcNumFilters(state.numFilters, state.savedFiltered),
        isFilterOn: calcNumFilters(state.numFilters, state.savedFiltered)
          ? true
          : false,
      };

    default:
      throw new Error("action unknown");
  }
}

function BakeriesProvider({ children }) {
  const { t } = useTranslation();
  const initialData = t("bakeries", { returnObjects: true });

  const [
    {
      openFiltered,
      shippingFiltered,
      dineInFiltered,
      distanceFiltered,
      savedFiltered,
      isFilterOn,
      numFilters,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const currentLocation = usePosition();
  const { bookmarks } = useBookmarks();

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in kilometers

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Calculate differences in coordinates
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    // Haversine formula
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate distance in kilometers
    const distance = R * c;

    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const distanceArr = initialData.map((bakery) =>
    Number(
      calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        bakery.location.latitude,
        bakery.location.longitude
      ).toFixed(2)
    )
  );

  function generateId(data, index) {
    return `sb${index + 1}lat${data.location.latitude}lng${
      data.location.longitude
    }`;
  }

  function filterData(initalData, today, currentTime) {
    let output = initalData;

    const placeList = document.querySelector(".place-list");

    if (placeList)
      placeList
        .querySelectorAll(".place")
        .forEach((place) => place.classList.remove("active"));

    function filterOpen(arr) {
      return arr
        .filter((bakery) => bakery.hours[today].open)
        .filter(
          (bakery) =>
            Number(
              `${bakery.hours[today].open.hour}.${bakery.hours[today].open.min}`
            ) <= currentTime &&
            currentTime <
              Number(
                `${bakery.hours[today].close.hour}.${bakery.hours[today].close.min}`
              )
        );
    }

    function filterDineIn(arr) {
      return arr.filter((bakery) => bakery.dineIn);
    }

    function filterDistance(arr) {
      return arr.slice().sort((a, b) => a.distance - b.distance);
    }

    function filterShipping(arr) {
      return arr.filter((bakery) => bakery.shippingService);
    }

    function filterSaved(arr) {
      const savedArr = [];
      bookmarks.forEach((id) =>
        arr.forEach((bakery) => {
          if (bakery.id === id) savedArr.push(bakery);
        })
      );
      return savedArr;
    }

    if (openFiltered) {
      output = filterOpen(initalData);

      if (dineInFiltered) output = filterDineIn(output);
      if (shippingFiltered) output = filterShipping(output);
      if (distanceFiltered) output = filterDistance(output);
      if (savedFiltered) {
        output = filterSaved(output);
        if (distanceFiltered) output = filterDistance(output);
      }

      if (dineInFiltered && shippingFiltered)
        output = output.filter(
          (bakery) => bakery.dineIn && bakery.shippingService
        );
      if (dineInFiltered && distanceFiltered)
        output = filterDistance(output).filter((bakery) => bakery.dineIn);
      if (shippingFiltered && distanceFiltered)
        output = filterShipping(output).sort((a, b) => a.distance - b.distance);

      if (dineInFiltered && shippingFiltered && distanceFiltered)
        output = filterShipping(output)
          .sort((a, b) => a.distance - b.distance)
          .filter((bakery) => bakery.dineIn);
    } else if (dineInFiltered) {
      output = filterDineIn(initalData);

      if (shippingFiltered) output = filterShipping(output);
      if (distanceFiltered) output = filterDistance(output);
      if (savedFiltered) {
        output = filterSaved(output);

        if (distanceFiltered) output = filterDistance(output);
      }

      if (shippingFiltered && distanceFiltered)
        output = filterShipping(output).sort((a, b) => a.distance - b.distance);
    } else if (shippingFiltered) {
      output = filterShipping(initalData);

      if (distanceFiltered) output = filterDistance(output);
      if (savedFiltered) {
        output = filterSaved(output);

        if (distanceFiltered) output = filterDistance(output);
      }
    } else if (savedFiltered) {
      output = filterSaved(initalData);

      if (distanceFiltered) output = filterDistance(output);
    } else if (distanceFiltered) {
      output = filterDistance(initalData);
    }

    return output;
  }

  const bakeryData = initialData.map((bakery, i) => {
    return { ...bakery, distance: distanceArr[i], id: generateId(bakery, i) };
  });

  return (
    <BakeriesContext.Provider
      value={{
        bakeryData,
        currentLocation,
        filterData,
        filters: {
          openFiltered,
          shippingFiltered,
          dineInFiltered,
          distanceFiltered,
          savedFiltered,
          isFilterOn,
          numFilters,
        },
        dispatch,
      }}
    >
      {children}
    </BakeriesContext.Provider>
  );
}

function useBakeries() {
  const value = useContext(BakeriesContext);

  if (value === undefined)
    throw new Error("BakeriesContext was used outside of BakeriesProvider");

  return value;
}

export { BakeriesProvider, useBakeries };
