import { useTranslation } from "react-i18next";
import { useBakeryInfo } from "../hooks/useBakeryInfo";
import { useState } from "react";

import Spinner from "./Spinner";
import styles from "./Review.module.css";

function Review() {
  const { comment, id, img } = useBakeryInfo();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const imgStyle = isLoading ? { display: "block" } : { display: "none" };

  function handleSpinner() {
    setIsLoading(true);
  }

  return (
    <div data-id={id}>
      <h3 className={styles.review}>{t("info.review")}</h3>
      <p>coming soon!</p>
    </div>
  );
}

export default Review;
