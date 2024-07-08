import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import starFilled from "../assets/Star-filled.svg";
import star from "../assets/Star.svg";

import { useBookmarks } from "../contexts/BookmarksContext";

function Place({ eachBakeryData, children }) {
  const { updateBookmarks, matchingData } = useBookmarks();
  const [isActive, setIsActive] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  function handleInfoWindow() {
    navigate(`/${eachBakeryData.id}${search}`);
  }

  function handleActiveList() {
    setIsActive(true);
  }

  function handleDeactivateList() {
    setIsActive(false);
  }

  return (
    <li
      className={isActive ? "place active" : "place"}
      data-id={eachBakeryData.id}
      onClick={handleInfoWindow}
      onMouseOver={handleActiveList}
      onMouseOut={handleDeactivateList}
    >
      <div className="place-header">
        <h3>{eachBakeryData.name}</h3>
        <button
          className="sidebar-bookmark"
          onClick={() => updateBookmarks(eachBakeryData.id)}
        >
          <img
            src={matchingData(eachBakeryData.id) ? starFilled : star}
            alt="star icon"
          />
        </button>
      </div>
      <h5>{eachBakeryData.address}</h5>
      <div>{children}</div>
    </li>
  );
}

export default Place;
