import { useTranslation } from "react-i18next";

function Place() {
  const { t } = useTranslation();
  const bakeryData = t("bakeries", { returnObjects: true });
  const places = [];
  const d = new Date();
  const currentDay = d.getDay();
  const currentHours = d.getHours() + d.getMinutes() / 60;
  let openOrNot;
  let textColor;

  for (let i = 0; i < bakeryData.length; i++) {
    if (
      bakeryData[i].hours[currentDay].open <= currentHours &&
      currentHours < bakeryData[i].hours[currentDay].close
    ) {
      openOrNot = t("sideBar.openStatus.open", {
        hour: bakeryData[i].hours[currentDay].close - 12,
      });
      textColor = "blue";
    } else if (bakeryData[i].hours[currentDay].closed) {
      openOrNot = t("sideBar.openStatus.closureDay");
      textColor = "red";
    }

    places.push(
      <div className="place" key={i}>
        <h3>{t(`bakeries.${i}.name`)}</h3>
        <h5>{t(`bakeries.${i}.location`)}</h5>
        <h5 className={textColor}>{openOrNot}</h5>
      </div>
    );
  }

  return <div className="place-container">{places}</div>;
}

export default Place;
