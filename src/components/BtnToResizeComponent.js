import mapIcon from "../assets/map-fill.svg";
import listIcon from "../assets/list-ul.svg";

function BtnToResizeComponent({ setBtn, btn, btnObj }) {
  const addMapIcon = {
    backgroundImage: `url(${mapIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "18px 10px",
    backgroundSize: "15px",
  };
  const addListIcon = {
    backgroundImage: `url(${listIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "18px 10px",
    backgroundSize: "17px",
  };

  function handleBtn() {
    setBtn((on) => !on);

    document.querySelector(".container").classList.toggle("grid");
  }

  return (
    <button
      className="btn-to-map"
      onClick={handleBtn}
      style={!btn ? addListIcon : addMapIcon}
    >
      {!btn ? btnObj.listView : btnObj.mapView}
    </button>
  );
}

export default BtnToResizeComponent;
