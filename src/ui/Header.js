import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import i18n from "../locales/i18n";
import bread from "../assets/baguette_bread.png";
import styles from "./Header.module.css";

import { useResize } from "../contexts/ResizeContext";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsSidebarOpen } = useResize();

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
    <div className={styles.header}>
      <img src={bread} alt="bread emoji"></img>
      <div className={styles.title}>
        <div onClick={handleNavigation}>{t("header.title")}</div>
      </div>
      <label className={styles.toggleSwitch}>
        <input type="checkbox" onClick={handleTranslateContent}></input>
        <div className={styles.toggleOptions}>
          <p>Korean</p>
          <p>English</p>
          <span className={styles.slider}></span>
        </div>
      </label>
    </div>
  );
}

export default Header;
