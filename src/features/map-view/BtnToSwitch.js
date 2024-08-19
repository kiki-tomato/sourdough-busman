import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import mapIcon from "../../assets/map-fill.png";
import listIcon from "../../assets/list-ul.png";
import styles from "./BtnToSwitch.module.css";

import { useResize } from "../../contexts/ResizeContext";

function BtnToSwitch() {
  const { t } = useTranslation();
  const { isSidebarOpen, setIsSidebarOpen, setIsSmallViewport } = useResize();
  const { pathname } = useLocation();

  const addMapIcon = {
    backgroundImage: `url(${mapIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "18px 10px",
    backgroundSize: "15px",
  };
  const addListIcon = {
    backgroundImage: `url(${listIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "18px 10px",
    backgroundSize: "17px",
  };

  function handleBtn() {
    setIsSidebarOpen((on) => !on);
    setIsSmallViewport(true);
  }

  if (pathname.includes("details")) return;

  return (
    <button
      className={styles.btnToSwitch}
      onClick={handleBtn}
      style={isSidebarOpen ? addMapIcon : addListIcon}
    >
      {isSidebarOpen ? t("buttons.mapView") : t("buttons.listView")}
    </button>
  );
}

export default BtnToSwitch;
