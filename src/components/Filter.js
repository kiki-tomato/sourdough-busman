import { useLocation, useNavigate } from "react-router-dom";

import { useUrl } from "../hooks/useUrl";

function Filter({ children, icon, type }) {
  const { search } = useLocation();
  const { filterQuery, appliedFilters } = useUrl();
  const navigate = useNavigate();

  const imageChange = { backgroundImage: `url(${icon})` };

  function handleFilter() {
    if (type === "filterSummary") return;

    if (search.includes(type)) {
      const filterQueryWithoutType = filterQuery.filter(
        (filter) => !filter.includes(type)
      );

      filterQueryWithoutType.length === 0 && navigate(`bakeries`);
      filterQueryWithoutType.length === 1 &&
        navigate(`bakeries?${filterQueryWithoutType[0]}`);
      filterQueryWithoutType.length > 1 &&
        navigate(`bakeries?${filterQueryWithoutType.join("&")}`);
    } else {
      search
        ? navigate(`bakeries${search}&${type}=on`)
        : navigate(`bakeries?${type}=on`);
    }
  }

  const isFilterOn =
    type === "filterSummary"
      ? filterQuery.length
      : appliedFilters.includes(type);

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
