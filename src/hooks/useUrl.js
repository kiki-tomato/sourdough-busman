import { useLocation } from "react-router-dom";

export function useUrl() {
  const { search } = useLocation();

  const queryStrings = search.slice(1).split("&");

  const filterQuery = queryStrings.filter((query) => query.includes("=on"));
  const appliedFilters = filterQuery.map((filter) => filter.slice(0, -3));

  const clickedPositions = queryStrings
    .filter((query) => !query.includes("=on"))
    .map((position) => Number(position.slice(2)));

  return {
    filterQuery,
    appliedFilters,
    queryStrings,
    clickedPositions,
  };
}
