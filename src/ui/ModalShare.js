import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import styles from "./ModalShare.module.scss";
import Alert from "./Alert";
import Icons from "./Icons";

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
      <div className={styles.headingContainer}>
        <h3 className={styles.heading}> {t("info.share")}</h3>
        <button
          className={styles.btnClose}
          onClick={() => setIsModalOpen(false)}
          aria-label="Close"
        >
          <Icons name="iconClose" />
        </button>
      </div>
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
