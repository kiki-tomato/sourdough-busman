import Description from "./Description";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function Overview() {
  const { name, address } = useBakeryInfo();

  return (
    <div className="place-name">
      <div>{name}</div>
      <div>{address}</div>
      <Description />
    </div>
  );
}

export default Overview;
