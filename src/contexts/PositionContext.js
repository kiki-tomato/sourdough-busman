import { createContext, useContext, useState } from "react";

const PositionContext = createContext();

function PositionProvider({ children }) {
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);

  return (
    <PositionContext.Provider
      value={{
        setInfoWindowPosition,
        infoWindowPosition,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

function usePosition() {
  const value = useContext(PositionContext);

  if (value === undefined)
    throw new Error("PositionContext was used outside of PositionProvider");

  return value;
}

export { PositionProvider, usePosition };
