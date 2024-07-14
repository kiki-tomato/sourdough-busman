import { useTranslation } from "react-i18next";

import mapIcon from "../assets/map-fill.png";
import listIcon from "../assets/list-ul.png";

import { useResize } from "../contexts/ResizeContext";

function BtnToResizeComponent() {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, setIsSmallViewport } = useResize();

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
    setIsOpen((on) => !on);
    setIsSmallViewport(true);
  }

  return (
    <button
      className="btn-to-resize"
      onClick={handleBtn}
      style={isOpen ? addMapIcon : addListIcon}
    >
      {isOpen ? t("buttons.mapView") : t("buttons.listView")}
    </button>
  );
}

export default BtnToResizeComponent;
