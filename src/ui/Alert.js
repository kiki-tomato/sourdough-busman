import { useTranslation } from "react-i18next";

import noResult from "../assets/Search.svg";
import styles from "./Alert.module.css";

function Alert() {
  const { t } = useTranslation();

  return (
    <div className={styles.alert}>
      <img src={noResult} className={styles.alertImg} alt="No result" />
      <p className={styles.alertMessage}>{t("alert.noResults")}</p>
    </div>
  );
}

export default Alert;
