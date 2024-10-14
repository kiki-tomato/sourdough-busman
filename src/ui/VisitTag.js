import { useTranslation } from "react-i18next";

import sharedStyles from "../styles/SharedStyles.module.css";
import styles from "./VisitTag.module.css";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function VisitTag() {
  const { t } = useTranslation();
  const { visitCount } = useBakeryInfo();

  const visitTag =
    visitCount === 0
      ? t("info.notVisited")
      : t("info.visitCount", { visitNum: visitCount });

  return (
    <div className={`${sharedStyles.tag} ${styles.tagVisit}`}>{visitTag}</div>
  );
}

export default VisitTag;
