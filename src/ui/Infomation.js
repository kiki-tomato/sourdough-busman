import { useTranslation } from "react-i18next";

import InfoList from "./InfoList";
import styles from "./Infomation.module.css";

function Infomation({ children }) {
  const { t } = useTranslation();

  return (
    <div className={styles.shortInfo}>
      <div>✸ {t("info.shortInfo")}</div>
      <div className={styles.infoBox}>{children}</div>
      <InfoList />
    </div>
  );
}

export default Infomation;
