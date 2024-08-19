import { useBakeryInfo } from "../hooks/useBakeryInfo";

import starFilled from "../assets/Star-filled.svg";

function StarRatingTag() {
  const { rate } = useBakeryInfo();

  if (!rate)
    return (
      <div className="tag tag-rating">
        <img src={starFilled} alt="star rating" />-
      </div>
    );

  return (
    <div className="tag tag-rating">
      {Array.from({ length: rate }, (_, i) => (
        <img src={starFilled} key={i} alt="star rating" />
      ))}
      <div>{rate}</div>
    </div>
  );
}

export default StarRatingTag;
