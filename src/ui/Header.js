import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import bread from "../assets/baguette_bread.png";
import Dropdown from "./Dropdown";
import styles from "./Header.module.css";

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
    <div className={styles.header}>
      <div className={styles.title} onClick={handleNavigation}>
        <img src={bread} alt="bread emoji" />
        <h4>{t("header.title")}</h4>
      </div>
      <Dropdown />
    </div>
  );
}

export default Header;
