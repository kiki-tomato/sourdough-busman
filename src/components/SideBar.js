import i18n from "../locales/i18n";

function SideBar() {
  return (
    <div className="sidebar">
      <h1>the place where the sidebar is</h1>
      <ul>
        <li>{i18n.t("sideBar.filter")}</li>
        <li>{i18n.t("sideBar.open")}</li>
        <li>{i18n.t("sideBar.distance")}</li>
      </ul>
    </div>
  );
}

export default SideBar;
