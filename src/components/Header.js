import i18n from "../locales/i18n";
import bread from "../assets/baguette_bread.png";
import BtnToResizeComponent from "./BtnToResizeComponent";

function Header({ title, btn, setBtn, btnObj }) {
  const handleTranslateContent = function () {
    i18n.language === "en"
      ? i18n.changeLanguage("ko")
      : i18n.changeLanguage("en");
  };

  return (
    <div className="header">
      <img src={bread} alt="bread emoji"></img>
      <div className="title">{title}</div>
      <label className="toggle-switch">
        <input type="checkbox" onClick={handleTranslateContent}></input>
        <div>
          <p>Korean</p>
          <p>English</p>
          <span className="slider"></span>
        </div>
      </label>
      <BtnToResizeComponent setBtn={setBtn} btn={btn} btnObj={btnObj} />
    </div>
  );
}

export default Header;
