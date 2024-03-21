function Filter({ filterStatus, onFilterClick, children }) {
  return (
    <button
      onClick={onFilterClick}
      className={filterStatus ? "btn-filter btn-filter-active" : "btn-filter"}
    >
      {children}
    </button>
  );
}

export default Filter;
