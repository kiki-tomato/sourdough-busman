import i18n from "../locales/i18n";

function Header() {
  const translateContent = function () {
    if (i18n.language === "en") {
      i18n.changeLanguage("kr");
    } else if (i18n.language === "kr") {
      i18n.changeLanguage("en");
    }
  };

  return (
    <div className="header">
      <div className="title">{i18n.t("header.title")}</div>
      <label className="swtich-container" onClick={() => translateContent()}>
        <div>KR</div>
        <div className="toggle-switch">
          <input type="checkbox"></input>
          <span className="slider"></span>
        </div>
        <div>ENG</div>
      </label>
    </div>
  );
}

export default Header;
