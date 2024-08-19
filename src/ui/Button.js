import { useLocation, useNavigate, useParams } from "react-router-dom";

import heart from "../assets/Heart.svg";
import heartFilled from "../assets/Heart-filled.svg";
import styles from "./Button.module.css";

import { useBookmarks } from "../contexts/BookmarksContext";

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
        <button className={styles.btnLink}>{children}</button>
      </a>
    );

  if (type === "sidebar-bookmark")
    return (
      <button
        className={styles.sidebarBookmark}
        onClick={() => {
          updateBookmarks(id);
        }}
      >
        <img src={matchingData(id) ? heartFilled : heart} alt="heart icon" />
      </button>
    );

  if (type === "place-detail-bookmark")
    return (
      <button
        className={`${styles.placeDetailBookmark} ${
          matchingData(id) ? styles.bookmarked : ""
        }`}
        data-id={id}
        onClick={() => updateBookmarks(id)}
      >
        {children}
      </button>
    );
}

export default Button;
