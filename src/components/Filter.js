import { useLocation, useNavigate } from "react-router-dom";

function Filter({ children, icon, type }) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const imageChange = { backgroundImage: `url(${icon})` };
  const queryArr = search
    .slice(1)
    .split("&")
    .filter((filter) => !filter.includes(type));

  function handleFilter() {
    if (type === "filterSummary") return;

    if (search.includes(type)) {
      queryArr.length === 0 && navigate(`bakeries`);
      queryArr.length === 1 && navigate(`bakeries?${queryArr[0]}`);
      queryArr.length > 1 && navigate(`bakeries?${queryArr.join("&")}`);
    } else {
      search
        ? navigate(`bakeries${search}&${type}=on`)
        : navigate(`bakeries?${type}=on`);
    }
  }

  const isFilterOn =
    type === "filterSummary"
      ? search
      : search
          .slice(1)
          .split("&")
          .map((filter) => filter.slice(0, -3))
          .includes(type);

  return (
    <button
      onClick={handleFilter}
      className={`btn-filter ${isFilterOn ? "btn-filter-active" : ""}`}
      style={isFilterOn && icon ? imageChange : {}}
      disabled={type === "filterSummary"}
    >
      {children}
    </button>
  );
}

export default Filter;
