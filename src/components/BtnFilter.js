import { useState } from "react";

function BtnFilter({ filterName }) {
  const [filterStatus, setFilterStatus] = useState(false);

  const handleFilterOn = function () {
    setFilterStatus((value) => !value);
  };

  return (
    <li onClick={handleFilterOn} className={filterStatus ? "btn-color" : null}>
      {filterName[1]}
    </li>
  );
}

export default BtnFilter;
