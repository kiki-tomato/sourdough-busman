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
      textColor = "blue";

      if (Number.isInteger(bakeryData[i].hours[currentDay].close)) {
        openOrNot = t("sideBar.openStatus.open", {
          hour: Math.trunc(bakeryData[i].hours[currentDay].close) - 12,
          minute: "00",
        });
      } else {
        openOrNot = t("sideBar.openStatus.open", {
          hour: Math.trunc(bakeryData[i].hours[currentDay].close) - 12,
          minute:
            (bakeryData[i].hours[currentDay].close -
              Math.trunc(bakeryData[i].hours[currentDay].close)) *
            60,
        });
      }
    } else if (currentHours >= bakeryData[i].hours[currentDay].close) {
      openOrNot = t("sideBar.openStatus.closed");
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

  console.log(
    bakeryData
      .filter((element) => {
        return (
          element.hours[currentDay].open <= currentHours &&
          element.hours[currentDay].close > currentHours
        );
      })
      .map((element, i) => {
        return (
          <div className="place" key={i}>
            <h3>{t(element.name)}</h3>
            <h5>{t(element.location)}</h5>
            <h5 className={textColor}>{openOrNot}</h5>
          </div>
        );
      })
  );

  return <div className="place-container">{places}</div>;
}

export default Place;
