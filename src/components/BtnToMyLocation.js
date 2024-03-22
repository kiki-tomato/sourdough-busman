function BtnToMyLocation({ resize }) {
  return (
    <img
      className={
        resize ? "btn-to-my-location btn-hidden" : "btn-to-my-location"
      }
      alt="Back to my location button"
    />
  );
}

export default BtnToMyLocation;
