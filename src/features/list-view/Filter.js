import { useNavigate } from "react-router-dom";

import { useQueryString } from "../../hooks/useQueryString";

function Filter({ children, icon, type }) {
  const { setQuery, deleteQuery, updatedQuery, queryStrings } =
    useQueryString();
  const navigate = useNavigate();

  const imageChange = { backgroundImage: `url(${icon})` };

  function handleFilter() {
    if (type === "filterSummary") return;

    if (queryStrings.includes(type)) {
      deleteQuery(type);
      navigate(`bakeries?${updatedQuery}`);
    } else {
      setQuery(type, "on");
      navigate(`bakeries?${updatedQuery}`);
    }
  }

  const isFilterOn =
    type === "filterSummary" ? queryStrings : queryStrings.includes(type);

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