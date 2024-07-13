import { useResize } from "../contexts/ResizeContext";

function BtnToMyLocation() {
  const { resize } = useResize();

  return (
    <img
      className={`btn-to-my-location ${resize ? "btn-hidden" : ""}`}
      alt="Back to my location button"
    />
  );
}

export default BtnToMyLocation;
