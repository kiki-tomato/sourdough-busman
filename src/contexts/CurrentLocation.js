import { createContext, useContext, useState } from "react";

const CurrentLocationContext = createContext();

function CurrentLocationProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  function askPermission() {
    setIsLoading(true);

    const success = function (position) {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setIsLoading(false);
    };

    const error = function () {
      setCurrentLocation({
        latitude: 35.1641776,
        longitude: 129.1181663,
      });
      setIsLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <CurrentLocationContext.Provider value={{ askPermission, currentLocation }}>
      {children}
    </CurrentLocationContext.Provider>
  );
}

function useCurrentLocation() {
  const value = useContext(CurrentLocationContext);

  if (value === undefined)
    throw new Error(
      "CurrentLocationContext was used outside of BookmarksProvider"
    );

  return value;
}

export { CurrentLocationProvider, useCurrentLocation };
