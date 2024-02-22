function Filter({ filterStatus, onFilterClick, children }) {
  return (
    <button
      onClick={onFilterClick}
      className={filterStatus ? "btn-color" : null}
    >
      {children}
    </button>
  );
}

export default Filter;
