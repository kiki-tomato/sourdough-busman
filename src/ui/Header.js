import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import bread from "../assets/baguette_bread_50.png";
import Dropdown from "./Dropdown";
import styles from "./Header.module.scss";

import { useResize } from "../contexts/ResizeContext";

function Header() {
  const { t } = useTranslation();
  const { setIsSidebarOpen } = useResize();

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.title}
        onClick={() => setIsSidebarOpen(false)}
      >
        <img src={bread} alt="bread emoji" />
        <h1 className={styles.heading}>{t("header.title")}</h1>
      </Link>
      <Dropdown />
    </header>
  );
}

export default Header;
