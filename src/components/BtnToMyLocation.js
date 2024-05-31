function BtnToMyLocation({ resize }) {
  return (
    <img
      className={`btn-to-my-location ${resize ? "btn-hidden" : ""}`}
      alt="Back to my location button"
    />
  );
}

export default BtnToMyLocation;
