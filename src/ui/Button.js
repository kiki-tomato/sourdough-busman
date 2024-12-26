import { useLocation, useNavigate, useParams } from "react-router-dom";

import Icons from "./Icons";
import styles from "./Button.module.scss";

import { useBookmarks } from "../contexts/BookmarksContext";

function Button({ type, id, url, children, event }) {
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
        className={styles.linkNaver}
      >
        {children}
      </a>
    );

  if (type === "bookmark")
    return (
      <button
        className={styles.bookmark}
        id="btn-bookmark"
        onClick={() => {
          updateBookmarks(id);
        }}
        aria-label="Bookmark"
      >
        {matchingData(id) ? (
          <Icons name="iconBookmarkFill" />
        ) : (
          <Icons name="iconBookmark" />
        )}
      </button>
    );

  if (type === "share")
    return (
      <button
        className={styles.share}
        onClick={event}
        aria-label="Share a link"
      >
        <Icons name="iconShare" />
      </button>
    );
}

export default Button;
