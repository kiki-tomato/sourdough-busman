function MapContainer({ children }) {
  return (
    <div id="map-container" style={{ poistion: "relative" }}>
      {children}
    </div>
  );
}

export default MapContainer;
