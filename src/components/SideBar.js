import { useState } from "react";
import { useTranslation } from "react-i18next";
import Place from "./Place";
import BtnFilter from "./BtnFilter";

function SideBar() {
  const { t } = useTranslation();
  // const filterObj = t("filter", { returnObjects: true });
  // const filterArr = Object.entries(filterObj);
  const bakeriesArr = t("bakeries", { returnObjects: true });
  const [filterStatus1, setFilterStatus1] = useState(false);
  // const [bakeriesData, setBakeriesData] = useState(bakeriesArr);
  const d = new Date();
  const currentDay = d.getDay();
  const currentHours = d.getHours() + d.getMinutes() / 60;

  const handleFilterClick = function () {
    setFilterStatus1((value) => !value);
  };

  let bakeriesData = bakeriesArr;

  if (filterStatus1)
    bakeriesData = bakeriesArr.filter(
      (bakery) =>
        bakery.hours[currentDay].open <= currentHours &&
        currentHours < bakery.hours[currentDay].close
    );

  return (
    <div className="sidebar">
      <div className="filter-container">
        <ul>
          <BtnFilter>{t("filter.filter")}</BtnFilter>
          <BtnFilter
            onFilterClick={handleFilterClick}
            filterStatus={filterStatus1}
          >
            {t("filter.open")}
          </BtnFilter>
          <BtnFilter>{t("filter.distance")}</BtnFilter>
        </ul>
      </div>
      <ul className="place-list">
        {bakeriesData.map((bakery) => (
          <Place bakeryData={bakery} key={bakery.name} />
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
