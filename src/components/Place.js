import i18n from "../locales/i18n";
import { useTranslation } from "react-i18next";

function Place() {
  console.log(i18n.language);

  const { t } = useTranslation();

  const bakeryData = t("bakeries", { returnObjects: true });

  let places = [];
  for (let i = 0; i < bakeryData.length; i++) {
    places.push(
      <div className="place" key={i}>
        <h3>{t(`bakeries.${i}.name`)}</h3>
        <h5>{t(`bakeries.${i}.location`)}</h5>
        <h5>hours</h5>
      </div>
    );
  }

  console.log(places);

  return <div className="place-container">{places}</div>;
}

export default Place;
