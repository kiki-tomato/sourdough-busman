import { createContext, useContext } from "react";

const TodayContext = createContext();

function TodayProvider({ children }) {
  const d = new Date();
  const today = d.getDay();
  const currentHour = d.getHours();
  const currentMin = d.getMinutes();
  const currentTime = Number(`${currentHour}.${currentMin}`);

  return (
    <TodayContext.Provider value={{ today, currentTime }}>
      {children}
    </TodayContext.Provider>
  );
}

function useToday() {
  const value = useContext(TodayContext);

  if (value === undefined)
    throw new Error("TodayContext was used outside of TodayProvider");

  return value;
}

export { TodayProvider, useToday };
