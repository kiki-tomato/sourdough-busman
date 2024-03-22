function DistanceFromMe({ distanceData }) {
  return (
    <>
      {distanceData < 10000 ? (
        <>
          <span className="distance-from-me">{distanceData}km</span>
          <span>|</span>
        </>
      ) : null}
    </>
  );
}

export default DistanceFromMe;
