import Place from "./Place";
import DistanceFromMe from "./DistanceFromMe";
import TradingHours from "./TradingHours";

function PlaceList({
  bakeryData,
  openFiltered,
  distanceFiltered,
  dineInFiltered,
  shippingFiltered,
  currentLocation,
}) {
  const d = new Date();
  const currentDay = d.getDay();
  const currentHour = d.getHours() + d.getMinutes() / 60;

  let filteredData = bakeryData;
  const distanceArr = [];

  if (openFiltered) {
    const openFilteredData = bakeryData.filter(
      (bakery) =>
        bakery.hours[currentDay].open <= currentHour &&
        currentHour < bakery.hours[currentDay].close
    );

    filteredData = openFilteredData;

    if (dineInFiltered) {
      filteredData = openFilteredData.filter((bakery) => bakery.dineIn);
    }

    if (shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }

    if (dineInFiltered && shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.dineIn && bakery.shippingService
      );
    }
  } else if (dineInFiltered) {
    const dineInFilteredData = bakeryData.filter((bakery) => bakery.dineIn);

    filteredData = dineInFilteredData;

    if (shippingFiltered) {
      filteredData = dineInFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }
  } else if (shippingFiltered) {
    filteredData = bakeryData.filter((bakery) => bakery.shippingService);
  }

  //order by distance
  // useEffect(() => {
  //   const distanceEl = document.querySelectorAll(".distance");

  //   console.log(distanceEl[0]);

  //   distanceEl.forEach((i) =>
  //     distanceArr.push(Number(i.textContent.split("km")[0]))
  //   );
  // });

  //if (distanceFiltered) {
  //   filteredData = bakeryData
  //     .slice()
  //     .sort((a, b) => Number(a.distance) - Number(b.distance));
  // }

  // console.log(
  //   bakeryData.map((i) => {
  //     return { ...i, i: "me" };
  //   })
  // );

  // console.log(
  //   bakeryData.map((bakery, i) => {
  //     return { ...bakery, distance: distanceArr[i] };
  //   }, "hi")
  // );

  console.log(distanceArr);

  return (
    <ul className="place-list">
      {filteredData.map((bakery) => (
        <Place eachBakeryData={bakery} key={bakery.name}>
          <DistanceFromMe
            locationData={bakery.location}
            currentLocation={currentLocation}
            distanceArr={distanceArr}
            bakeryData={bakeryData}
          />
          <TradingHours
            hoursData={bakery.hours}
            currentDay={currentDay}
            currentHour={currentHour}
          />
        </Place>
      ))}
    </ul>
  );
}

export default PlaceList;
