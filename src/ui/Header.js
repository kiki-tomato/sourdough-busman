import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import bread from "../assets/baguette_bread.png";
import Dropdown from "./Dropdown";
import styles from "./Header.module.scss";

import { useResize } from "../contexts/ResizeContext";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setIsSidebarOpen } = useResize();

  function handleNavigation() {
    navigate("/");
    setIsSidebarOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.title} onClick={handleNavigation}>
        <img src={bread} alt="bread emoji" />
        <h1 className={styles.heading}>{t("header.title")}</h1>
      </div>
      <Dropdown />
    </header>
  );
}

export default Header;
