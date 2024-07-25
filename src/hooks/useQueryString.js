import { useLocation } from "react-router-dom";

export function useQueryString() {
  const { search } = useLocation();

  const updatedQuery = new URLSearchParams(search);
  const queryStrings = updatedQuery.toString();

  const filterQuery = queryStrings
    .split("&")
    .filter((query) => query.includes("=on"));
  const appliedFilters = filterQuery.map((filter) => filter.slice(0, -3));

  function setQuery(key, value) {
    updatedQuery.set(key, value);
  }

  function deleteQuery(key) {
    updatedQuery.delete(key);
  }

  return {
    filterQuery,
    appliedFilters,
    queryStrings,
    updatedQuery,
    setQuery,
    deleteQuery,
  };
}
