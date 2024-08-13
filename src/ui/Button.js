import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useBookmarks } from "../contexts/BookmarksContext";

import heart from "../assets/Heart.svg";
import heartFilled from "../assets/Heart-filled.svg";

function Button({ type, id, url, children }) {
  const { updateBookmarks, matchingData } = useBookmarks();
  const navigate = useNavigate();
  const { bakeryId } = useParams();
  const { search } = useLocation();

  if (type === "link")
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={() => navigate(`/details/${bakeryId}${search}`)}
      >
        <button className="btn-more-details">{children}</button>
      </a>
    );

  if (type === "sidebar-bookmark")
    return (
      <button
        className="sidebar-bookmark"
        onClick={() => {
          updateBookmarks(id);
        }}
      >
        <img src={matchingData(id) ? heartFilled : heart} alt="star icon" />
      </button>
    );

  if (type === "info-window-bookmark")
    return (
      <button
        className={`info-window-bookmark ${
          matchingData(id) ? "bookmarked" : ""
        }`}
        data-id={id}
        onClick={() => updateBookmarks(id)}
      >
        {children}
      </button>
    );
}

export default Button;
