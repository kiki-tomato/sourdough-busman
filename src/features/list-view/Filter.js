import { useNavigate } from "react-router-dom";

import Icons from "../../ui/Icons";
import styles from "./Filter.module.scss";

import { useQueryString } from "../../hooks/useQueryString";

function Filter({ children, type }) {
  const { setQuery, deleteQuery, updatedQuery, queryStrings } =
    useQueryString();
  const navigate = useNavigate();

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
      disabled={type === "filterSummary"}
    >
      {type === "filterSummary" && <Icons name="iconFilter" />}
      {type === "savedFilter" && <Icons name="iconBookmark" />}
      {type === "openFilter" && <Icons name="iconClock" />}
      {type === "distanceFilter" && <Icons name="iconMapPin" />}
      {type === "dineInFilter" && <Icons name="iconStore" />}
      {type === "shippingFilter" && <Icons name="iconTruck" />}
      {children}
    </button>
  );
}

export default Filter;
