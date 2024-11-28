import styles from "./MapContainer.module.scss";

function MapContainer({ children }) {
  return (
    <div className={styles.mapContainer} style={{ poistion: "relative" }}>
      {children}
    </div>
  );
}

export default MapContainer;
