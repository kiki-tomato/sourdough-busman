import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";

function Place({ bakeryData }) {
  return (
    <li className="place">
      <h3>{bakeryData.name}</h3>
      <h5>{bakeryData.address}</h5>
      <ul>
        <DistanceFromMe locationData={bakeryData.location} />
        <TradingHours hoursData={bakeryData.hours} />
      </ul>
    </li>
  );
}

export default Place;
