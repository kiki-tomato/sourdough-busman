import styles from "./MapContainer.module.css";

function MapContainer({ children }) {
  return (
    <div className={styles.mapContainer} style={{ poistion: "relative" }}>
      {children}
    </div>
  );
}

export default MapContainer;
