function getDateFormat(date: Date) {
  if (date) {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }
  return "תאריך לא זמין כעת";
}

function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { getDateFormat, numberWithCommas };
