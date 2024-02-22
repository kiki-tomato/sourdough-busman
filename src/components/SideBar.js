import { useState } from "react";
import Place from "./Place";
import Filter from "./Filter";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";

function SideBar({ filters, bakeriesArr, currentLocation }) {
  const [openFiltered, setOepnFiltered] = useState(false);
  const [distanceFiltered, setDistancedFiltered] = useState(false);

  const d = new Date();
  const currentDay = d.getDay();
  const currentHour = d.getHours() + d.getMinutes() / 60;

  const handleOpenFilter = function () {
    setOepnFiltered((on) => !on);
  };

  const handleDistanceFilter = function () {
    setDistancedFiltered((on) => !on);
  };

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

  const bakeriesData = bakeriesArr.map((bakery) => {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      bakery.location.latitude,
      bakery.location.longitude
    );

    return {
      ...bakery,
      distance: distance.toFixed(2),
    };
  });

  let finalData = bakeriesData;

  if (openFiltered)
    finalData = bakeriesData.filter(
      (bakery) =>
        bakery.hours[currentDay].open <= currentHour &&
        currentHour < bakery.hours[currentDay].close
    );

  if (distanceFiltered) {
    finalData = bakeriesData
      .slice()
      .sort((a, b) => Number(a.distance) - Number(b.distance));
  }

  return (
    <div className="sidebar">
      <div className="filter-container">
        <Filter>{filters.filter}</Filter>
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
      <ul className="place-list">
        {finalData.map((bakery) => (
          <Place bakeryData={bakery} key={bakery.name}>
            <DistanceFromMe
              locationData={bakery.location}
              currentLocation={currentLocation}
            >
              {bakery.distance}km
            </DistanceFromMe>
            <TradingHours
              hoursData={bakery.hours}
              currentDay={currentDay}
              currentHour={currentHour}
            />
          </Place>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
