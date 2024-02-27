function Place({ bakeryData, children }) {
  return (
    <li className="place">
      <h3>{bakeryData.name}</h3>
      <h5>{bakeryData.address}</h5>
      <div>{children}</div>
    </li>
  );
}

export default Place;
