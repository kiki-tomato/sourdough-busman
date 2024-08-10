import { useTranslation } from "react-i18next";
import { useBakeryInfo } from "../hooks/useBakeryInfo";

function Review() {
  const { comment, id, img } = useBakeryInfo();
  const { t } = useTranslation();

  if (!comment)
    return (
      <div className="review" data-id={id}>
        <div>✸ {t("info.oneSentenceReview")}</div>
        <div>coming soon!</div>
      </div>
    );

  return (
    <div className="review" data-id={id}>
      <div>✸ {t("info.oneSentenceReview")}</div>
      <div>
        <img src={img} alt="" />
        <span>{comment}</span>
      </div>
    </div>
  );
}

export default Review;
