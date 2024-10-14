import styles from "./DistanceFromMe.module.css";

function DistanceFromMe({ distanceData }) {
  if (distanceData > 10000) return null;

  return (
    <>
      <span className={styles.distanceFromMe}>{distanceData}km</span>
      <span>|</span>
    </>
  );
}

export default DistanceFromMe;
