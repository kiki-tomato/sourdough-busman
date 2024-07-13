import { createContext, useContext, useState } from "react";

const ResizeContext = createContext();

function ResizeProvider({ children }) {
  const [resize, setResize] = useState(false);

  return (
    <ResizeContext.Provider value={{ resize, setResize }}>
      {children}
    </ResizeContext.Provider>
  );
}

function useResize() {
  const value = useContext(ResizeContext);

  if (value === undefined)
    throw new Error("ResizeContext was used outside of ResizeProvider");

  return value;
}

export { ResizeProvider, useResize };
