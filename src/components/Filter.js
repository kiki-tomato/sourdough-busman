import { useBakeries } from "../contexts/BakeriesContext";

function Filter({ filterStatus, children, icon, type }) {
  const { dispatch } = useBakeries();

  const imageChange = { backgroundImage: `url(${icon})` };

  return (
    <button
      onClick={() => dispatch({ type: type })}
      className={`btn-filter ${filterStatus ? "btn-filter-active" : ""}`}
      style={filterStatus && icon ? imageChange : {}}
    >
      {children}
    </button>
  );
}

export default Filter;
