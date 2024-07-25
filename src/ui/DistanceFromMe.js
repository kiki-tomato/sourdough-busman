function DistanceFromMe({ distanceData }) {
  if (distanceData > 10000) return null;

  return (
    <>
      <span className="distance-from-me">{distanceData}km</span>
      <span>|</span>
    </>
  );
}

export default DistanceFromMe;
