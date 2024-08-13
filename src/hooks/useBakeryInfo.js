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
  const rate = bakery?.review.rate;
  const comment = bakery?.review.comment;
  const img = bakery?.image;
  const naverMap = bakery?.naverMap;
  const visitCount = bakery?.review.visit;

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
    rate,
    comment,
    visitCount,
    img,
    naverMap,
  };
}
