import { useTranslation } from "react-i18next";
import Place from "./Place";
import BtnFilter from "./BtnFilter";

function SideBar() {
  const { t } = useTranslation();
  const filterObj = t("filter", { returnObjects: true });
  const filterArr = Object.entries(filterObj);
  const bakeriesArr = t("bakeries", { returnObjects: true });

  return (
    <div className="sidebar">
      <div className="filter-container">
        <ul>
          {filterArr.map((filter, i) => {
            return <BtnFilter filterName={filter} key={i} />;
          })}
        </ul>
      </div>
      <ul className="place-list">
        {bakeriesArr.map((bakery) => (
          <Place bakeryData={bakery} key={bakery.name} />
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
