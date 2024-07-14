import { createContext, useContext, useEffect, useState } from "react";

const ResizeContext = createContext();

function ResizeProvider({ children }) {
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery600 = window.matchMedia("(max-width: 600px)");

    function handleSidebar() {
      setIsOpen(false);
      setIsSmallViewport(false);
    }

    mediaQuery600.addEventListener("change", handleSidebar);
  }, []);

  return (
    <ResizeContext.Provider
      value={{ isSmallViewport, setIsSmallViewport, isOpen, setIsOpen }}
    >
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
