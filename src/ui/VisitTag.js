import { useTranslation } from "react-i18next";

import styles from "./VisitTag.module.scss";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function VisitTag() {
  const { t } = useTranslation();
  const { visitCount } = useBakeryInfo();

  const visitTag =
    visitCount === 0
      ? t("info.notVisited")
      : t("info.visitCount", { visitNum: visitCount });

  return <div className={styles.tagVisit}>{visitTag}</div>;
}

export default VisitTag;
