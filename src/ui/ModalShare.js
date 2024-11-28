import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import styles from "./ModalShare.module.scss";
import Alert from "./Alert";

function ModalShare({ currentUrl, setIsModalOpen }) {
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyFail, setCopyFail] = useState(false);

  function handleCopy() {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => setCopySuccess(true))
      .catch((err) => setCopyFail(true));
  }

  useEffect(() => {
    setTimeout(() => {
      if (copySuccess) setCopySuccess(false);
      if (copyFail) setCopyFail(false);
    }, 3000);
  }, [copySuccess, copyFail]);

  return (
    <div className={styles.modal} id="modal">
      <button className={styles.btnClose} onClick={() => setIsModalOpen(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.iconX}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h3 className={styles.heading}> {t("info.share")}</h3>
      <div className={styles.urlContainer}>
        <div className={styles.url}>{currentUrl}</div>
        <button className={styles.btnCopy} onClick={handleCopy}>
          {t("buttons.copy")}
        </button>
      </div>
      {copySuccess && <Alert type="success" />}
      {copyFail && <Alert type="fail" />}
    </div>
  );
}

export default ModalShare;
