import { useTranslation } from "react-i18next";

import mapIcon from "../assets/map-fill.png";
import listIcon from "../assets/list-ul.png";

import { useResize } from "../contexts/ResizeContext";

function BtnToResizeComponent() {
  const { t } = useTranslation();
  const { resize, setResize } = useResize();

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
    setResize((on) => !on);
  }

  return (
    <button
      className="btn-to-resize"
      onClick={handleBtn}
      style={!resize ? addListIcon : addMapIcon}
    >
      {!resize ? t("buttons.listView") : t("buttons.mapView")}
    </button>
  );
}

export default BtnToResizeComponent;
