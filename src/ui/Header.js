import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import i18n from "../locales/i18n";
import bread from "../assets/baguette_bread.png";

import { useResize } from "../contexts/ResizeContext";
import { usePosition } from "../contexts/PositionContext";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsSidebarOpen } = useResize();
  const { setBakeryId } = usePosition();

  function handleTranslateContent() {
    i18n.language === "en"
      ? i18n.changeLanguage("ko")
      : i18n.changeLanguage("en");
  }

  function handleNavigation() {
    navigate("/");
    setIsSidebarOpen(false);
  }

  return (
    <div className="header">
      <img src={bread} alt="bread emoji"></img>
      <div className="title">
        <div onClick={handleNavigation}>{t("header.title")}</div>
      </div>
      <label className="toggle-switch">
        <input type="checkbox" onClick={handleTranslateContent}></input>
        <div className="toggle-options">
          <p>Korean</p>
          <p>English</p>
          <span className="slider"></span>
        </div>
      </label>
    </div>
  );
}

export default Header;
