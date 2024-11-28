import { useLocation, useNavigate, useParams } from "react-router-dom";

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
        id="bookmark"
        onClick={() => {
          updateBookmarks(id);
        }}
      >
        {matchingData(id) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.iconBookmarkActive}
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.iconBookmark}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        )}
      </button>
    );

  if (type === "share")
    return (
      <button className={styles.share} onClick={event}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.iconShare}
          id="btn-share"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </button>
    );
}

export default Button;
