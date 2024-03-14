import { useEffect, useState } from "react";

function DistanceFromMe({ locationData, currentLocation, distanceArr }) {
  const [distance, setDistance] = useState(0);

  useEffect(
    function () {
      if (!currentLocation) return;

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

      setDistance(
        calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          locationData.latitude,
          locationData.longitude
        )
      );

      distanceArr.push(distance.toFixed(2));
    },
    [currentLocation, locationData, distance, distanceArr]
  );

  return (
    <>
      {distance < 10000 ? (
        <span className="distance">{distance.toFixed(2)}km</span>
      ) : null}
    </>
  );
}

export default DistanceFromMe;
