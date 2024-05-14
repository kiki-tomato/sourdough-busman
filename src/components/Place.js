import starFilled from "../assets/Star-filled.svg";
import star from "../assets/Star.svg";

function Place({
  eachBakeryData,
  children,
  bookmarks,
  setBookmarks,
  UpdateBookmarks,
}) {
  function matchingData() {
    if (bookmarks.length) {
      return bookmarks.find((bookmark) => bookmark === eachBakeryData.id);
    }
  }

  return (
    <li className="place" data-id={eachBakeryData.id}>
      <div className="place-header">
        <h3>{eachBakeryData.name}</h3>
        <button
          className="sidebar-bookmark"
          onClick={() => UpdateBookmarks(eachBakeryData.id)}
        >
          <img src={matchingData() ? starFilled : star} alt="star icon" />
        </button>
      </div>
      <h5>{eachBakeryData.address}</h5>
      <div>{children}</div>
    </li>
  );
}

export default Place;
