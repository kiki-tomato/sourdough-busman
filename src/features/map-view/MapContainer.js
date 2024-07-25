function MapContainer({ children }) {
  return (
    <div className="map-container" style={{ poistion: "relative" }}>
      {children}
    </div>
  );
}

export default MapContainer;
