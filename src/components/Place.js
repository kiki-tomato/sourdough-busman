function Place({ eachBakeryData, children }) {
  return (
    <li className="place">
      <h3>{eachBakeryData.name}</h3>
      <h5>{eachBakeryData.address}</h5>
      <div>{children}</div>
    </li>
  );
}

export default Place;
