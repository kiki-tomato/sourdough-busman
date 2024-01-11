import { useTranslation } from "react-i18next";
import data from "../locales/translations/ko/content.json";

console.log(data);
console.log(Object.keys(data).length);

function Place() {
  const { t } = useTranslation();

  let place = [];
  const dataLength = Object.keys(data).length;

  for (let number = 0; number < dataLength; number++) {
    place.push(
      <div className="place" key={number}>
        <h3>{t("place1.name")}</h3>
        <h5>{t("place1.location")}</h5>
        <h5>hours</h5>
      </div>
    );
  }

  // for (let i = 0; i < i + 1; i++) {
  //   place.push(
  //     <div className="place" key={i}>
  //       <h3>{t("place1.name")}</h3>
  //       <h5>distance</h5>
  //       <h5>hours</h5>
  //     </div>
  //   );
  // }

  return <div className="place-container">{place}</div>;
}

export default Place;
