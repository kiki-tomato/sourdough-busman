import { createContext, useContext, useState, useEffect } from "react";

const BookmarksContext = createContext();

function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => getFromLocalStorage());

  function storeinLocalStorage(arr) {
    localStorage.setItem("bookmarks", JSON.stringify(arr));
  }

  function getFromLocalStorage() {
    const storage = localStorage.getItem("bookmarks");
    return storage && storage !== "undefined" ? JSON.parse(storage) : [];
  }

  function addBookmark(id) {
    setBookmarks((bookmarks) => {
      return [...bookmarks, id];
    });
  }

  function deleteBookmark(id) {
    setBookmarks((bookmarks) =>
      bookmarks.filter((bookmark) => bookmark !== id)
    );
  }

  function updateBookmarks(id) {
    bookmarks.includes(id) ? deleteBookmark(id) : addBookmark(id);
  }

  useEffect(() => {
    storeinLocalStorage(bookmarks);
  }, [bookmarks]);

  // useEffect(() => {
  //   localStorage.removeItem("bookmarks");
  // }, [bookmarks]);

  return (
    <BookmarksContext.Provider value={{ updateBookmarks, bookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
}

function useBookmarks() {
  const value = useContext(BookmarksContext);

  if (value === undefined)
    throw new Error("BookmarksContext was used outside of BookmarksProvider");

  return value;
}

export { BookmarksProvider, useBookmarks };
