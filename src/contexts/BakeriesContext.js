import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { usePosition } from "../hooks/usePosition";
import { useBookmarks } from "../contexts/BookmarksContext";
import { useUrl } from "../hooks/useUrl";

const BakeriesContext = createContext();

function BakeriesProvider({ children }) {
  const { t } = useTranslation();
  const initialData = t("bakeries", { returnObjects: true });

  const { bookmarks } = useBookmarks();
  const { appliedFilters } = useUrl();
  const currentLocation = usePosition();
  const [markerPosition, setMarkerPosition] = useState();

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

    function isIncluded(filterType) {
      return appliedFilters.includes(filterType);
    }

    if (isIncluded("openFilter")) {
      output = filterOpen(initalData);

      if (isIncluded("dineInFilter")) output = filterDineIn(output);
      if (isIncluded("shippingFilter")) output = filterShipping(output);
      if (isIncluded("distanceFilter")) output = filterDistance(output);
      if (isIncluded("savedFilter")) {
        output = filterSaved(output);
        if (isIncluded("distanceFilter")) output = filterDistance(output);
      }
      if (
        appliedFilters.every(
          (filter) => filter === "dineInFilter" || filter === "shippingFilter"
        )
      )
        output = output.filter(
          (bakery) => bakery.dineIn && bakery.shippingService
        );

      if (
        appliedFilters.every(
          (filter) => filter === "dineInFilter" || filter === "distanceFilter"
        )
      )
        output = filterDistance(output).filter((bakery) => bakery.dineIn);

      if (
        appliedFilters.every(
          (filter) => filter === "shippingFilter" || filter === "distanceFilter"
        )
      )
        output = filterShipping(output).sort((a, b) => a.distance - b.distance);

      if (
        appliedFilters.every(
          (filter) =>
            filter === "dineInFilter" ||
            filter === "shippingFilter" ||
            filter === "distanceFilter"
        )
      )
        output = filterShipping(output)
          .sort((a, b) => a.distance - b.distance)
          .filter((bakery) => bakery.dineIn);
    } else if (isIncluded("dineInFilter")) {
      output = filterDineIn(initalData);

      if (isIncluded("shippingFilter")) output = filterShipping(output);
      if (isIncluded("distanceFilter")) output = filterDistance(output);
      if (isIncluded("savedFilter")) {
        output = filterSaved(output);

        if (isIncluded("distanceFilter")) output = filterDistance(output);
      }

      if (
        appliedFilters.every(
          (filter) => filter === "shippingFilter" || filter === "distanceFilter"
        )
      )
        output = filterShipping(output).sort((a, b) => a.distance - b.distance);
    } else if (isIncluded("shippingFilter")) {
      output = filterShipping(initalData);

      if (isIncluded("distanceFilter")) output = filterDistance(output);
      if (isIncluded("savedFilter")) {
        output = filterSaved(output);

        if (isIncluded("distanceFilter")) output = filterDistance(output);
      }
    } else if (isIncluded("savedFilter")) {
      output = filterSaved(initalData);

      if (isIncluded("distanceFilter")) output = filterDistance(output);
    } else if (isIncluded("distanceFilter")) {
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
        setMarkerPosition,
        markerPosition,
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
