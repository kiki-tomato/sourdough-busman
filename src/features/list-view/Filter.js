import { useNavigate } from "react-router-dom";

import styles from "./Filter.module.css";

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
      navigate(`?${updatedQuery}`);
    } else {
      setQuery(type, "on");
      navigate(`?${updatedQuery}`);
    }
  }

  const isFilterOn =
    type === "filterSummary" ? queryStrings : queryStrings.includes(type);

  return (
    <button
      onClick={handleFilter}
      className={`${styles.btnFilter} ${isFilterOn ? styles.active : ""}`}
      style={isFilterOn && icon ? imageChange : {}}
      disabled={type === "filterSummary"}
    >
      {children}
    </button>
  );
}

export default Filter;
