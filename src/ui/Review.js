import { useTranslation } from "react-i18next";
import { useBakeryInfo } from "../hooks/useBakeryInfo";

import styles from "./Review.module.scss";

function Review() {
  const { id } = useBakeryInfo();
  const { t } = useTranslation();

  return (
    <div data-id={id}>
      <h3 className={styles.review}>{t("info.review")}</h3>
      <p>coming soon!</p>
    </div>
  );
}

export default Review;
