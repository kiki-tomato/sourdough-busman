function Place({ bakeryData, children }) {
  return (
    <li className="place">
      <h3>{bakeryData.name}</h3>
      <h5>{bakeryData.address}</h5>
      <ul>{children}</ul>
    </li>
  );
}

export default Place;
