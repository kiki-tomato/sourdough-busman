import { createContext, useContext, useEffect, useState } from "react";

const ResizeContext = createContext();

function ResizeProvider({ children }) {
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery750 = window.matchMedia("(max-width: 750px)");

    function handleSidebar() {
      setIsSidebarOpen(false);
      setIsSmallViewport(false);
    }

    mediaQuery750.addEventListener("change", handleSidebar);
  }, []);

  return (
    <ResizeContext.Provider
      value={{
        isSmallViewport,
        setIsSmallViewport,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
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
