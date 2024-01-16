import { useTranslation } from "react-i18next";
import Places from "./Place";

function SideBar() {
  const { t } = useTranslation();

  const btnColorChange = function (event) {
    console.log(event.target);
    event.target.classList.toggle("btn-color");
  };

  return (
    <div className="sidebar">
      <div className="filter-container">
        <ul>
          <li onClick={btnColorChange}>{t("sideBar.filter")}</li>
          <li onClick={btnColorChange}>{t("sideBar.open")}</li>
          <li onClick={btnColorChange}>{t("sideBar.distance")}</li>
        </ul>
      </div>
      <Places />
    </div>
  );
}

export default SideBar;
