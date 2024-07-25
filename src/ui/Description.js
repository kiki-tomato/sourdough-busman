import { useBakeryInfo } from "../hooks/useBakeryInfo";

function Description() {
  const { description } = useBakeryInfo();

  if (description) return <div className="description">{description}</div>;
}

export default Description;
