import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import styles from "./BtnToSwitch.module.scss";

import { useResize } from "../../contexts/ResizeContext";

function BtnToSwitch() {
  const { t } = useTranslation();
  const { isSidebarOpen, setIsSidebarOpen, setIsSmallViewport } = useResize();
  const { pathname } = useLocation();

  function handleBtn() {
    setIsSidebarOpen((on) => !on);
    setIsSmallViewport(true);
  }

  if (pathname.includes("details")) return;

  if (isSidebarOpen)
    return (
      <button className={styles.btnToSwitch} onClick={handleBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.icon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
        {t("buttons.mapView")}
      </button>
    );

  if (!isSidebarOpen)
    return (
      <button className={styles.btnToSwitch} onClick={handleBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.icon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        {t("buttons.listView")}
      </button>
    );
}

export default BtnToSwitch;
