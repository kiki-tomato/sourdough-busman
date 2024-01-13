import i18n from "../locales/i18n";
import { useTranslation } from "react-i18next";
import bread from "../assets/baguette_bread.png";

function Header() {
  const { t } = useTranslation();

  const translateContent = function () {
    i18n.language === "en"
      ? i18n.changeLanguage("ko")
      : i18n.changeLanguage("en");
  };

  return (
    <div className="header">
      <img src={bread} alt="bread emoji"></img>
      <div className="title">{t("header.title")}</div>
      <label className="toggle-switch">
        <input type="checkbox" onClick={translateContent}></input>
        <div>
          <p>Korean</p>
          <p>English</p>
          <span className="slider"></span>
        </div>
      </label>
    </div>
  );
}

export default Header;
