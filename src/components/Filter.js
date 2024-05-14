function Filter({ filterStatus, onFilterClick, children, icon }) {
  const imageChange = { backgroundImage: `url(${icon})` };

  return (
    <button
      onClick={onFilterClick}
      className={filterStatus ? "btn-filter btn-filter-active" : "btn-filter"}
      style={filterStatus && icon ? imageChange : {}}
    >
      {children}
    </button>
  );
}

export default Filter;
