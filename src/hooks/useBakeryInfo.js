import { useParams } from "react-router-dom";
import { useData } from "./useData";

export function useBakeryInfo() {
  const { bakeryData } = useData();
  const { bakeryId } = useParams();

  let bakery = bakeryData.filter((data) => data.id === bakeryId)[0];

  const name = bakery?.name;
  const description = bakery?.description;
  const address = bakery?.address;
  const tradingHours = bakery?.hours;
  const shippingAvail = bakery?.shippingService;
  const id = bakery?.id;
  const lat = bakery?.location.latitude;
  const lng = bakery?.location.longitude;

  return {
    name,
    description,
    address,
    tradingHours,
    shippingAvail,
    id,
    bakery,
    lat,
    lng,
  };
}
