function BtnFilter({ filterStatus, onFilterClick, children }) {
  return (
    <li onClick={onFilterClick} className={filterStatus ? "btn-color" : null}>
      {children}
    </li>
  );
}

export default BtnFilter;
