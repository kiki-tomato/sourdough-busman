function DisplayHours({ day }) {
  const openHour = day.open?.hour < 10 ? `0${day.open?.hour}` : day.open?.hour;
  const openMin = day.open?.min === 0 ? "00" : day.open?.min;
  const closeHour = day.close?.hour;
  const closeMin = day.close?.min === 0 ? "00" : day.close?.min;

  return (
    <div>
      {openHour}:{openMin} - {closeHour}:{closeMin}
    </div>
  );
}

export default DisplayHours;
