import { useBakeryInfo } from "../hooks/useBakeryInfo";

function ShippingInfo({ children }) {
  const { shippingAvail } = useBakeryInfo();

  if (shippingAvail)
    return (
      <>
        <span>|</span>
        <span>{children}</span>
      </>
    );
}

export default ShippingInfo;
