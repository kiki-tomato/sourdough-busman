import { useState } from "react";

import i18n from "../locales/i18n";
import styles from "./Dropdown.module.css";

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
        className={
          isOpen ? `${styles.dropDownBtn} ${styles.focus}` : styles.dropDownBtn
        }
        onClick={handleDropDown}
      >
        <div className={styles.lang}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`${styles.icon} ${styles.iconGlobe}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          {lang}
        </div>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </button>
      {isOpen && (
        <ul className={styles.dropDownMenu}>
          <li onClick={handleKorean}>Korean</li>
          <li onClick={handleEnglish}>English</li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
