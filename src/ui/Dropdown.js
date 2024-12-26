import { useState } from "react";

import i18n from "../locales/i18n";
import styles from "./Dropdown.module.scss";
import Icons from "./Icons";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("Korean");

  function handleDropDown() {
    setIsOpen((status) => !status);
  }

  function handleKorean() {
    i18n.changeLanguage("ko");
    setLang("Korean");
    setIsOpen(false);
  }

  function handleEnglish() {
    i18n.changeLanguage("en");
    setLang("English");
    setIsOpen(false);
  }

  return (
    <div className={styles.dropDown}>
      <button
        className={isOpen ? styles.dropDownFocus : styles.dropDownBtn}
        onClick={handleDropDown}
        type="button"
      >
        <div className={styles.lang}>
          <Icons name="iconGlobe" />
          {lang}
        </div>
        <Icons name="iconArrowDown" isOpen={isOpen} />
      </button>
      {isOpen && (
        <ul className={styles.langOptions}>
          <li>
            <button onClick={handleKorean} type="button">
              Korean
            </button>
          </li>
          <li>
            <button onClick={handleEnglish} type="button">
              English
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
