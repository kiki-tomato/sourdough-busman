import i18n from "../locales/i18n";
import { useTranslation } from "react-i18next";

function Place() {
  console.log(i18n.language);

  const { t } = useTranslation();

  const bakeryData = t("bakeries", { returnObjects: true });

  const places = bakeryData.map((element, index) => {
    return (
      <div className="place" key={index}>
        <h3>{t(element.name)}</h3>
        <h5>{t(element.location)}</h5>
        <h5>hours</h5>
      </div>
    );
  });

  console.log(places);

  return <div className="place-container">{places}</div>;
}

export default Place;
