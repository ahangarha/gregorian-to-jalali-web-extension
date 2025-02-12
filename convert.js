function getJalaliMonthName(year, month, day) {
  const gregorianDate = new Date(year, month, day);
  const onlyMonthDateFormatter = new Intl.DateTimeFormat('fa-IR', { month: 'long' });
  return onlyMonthDateFormatter.format(gregorianDate);
}

// (will use in other file)
// eslint-disable-next-line no-unused-vars
function getEstimatedJalaliString(year, month = null) {
  // process for year and month
  if (month !== null) {
    // get year in jalali time
    const onlyYearDateFormatter = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' });
    const yearStr1 = onlyYearDateFormatter.format(new Date(year, month, 1));
    const yearStr2 = onlyYearDateFormatter.format(new Date(year, month, 28));

    // check negative years
    if (yearStr1.includes('−') || yearStr2.includes('−')) return null;

    // TODO: handle for 31-days months
    const month1 = getJalaliMonthName(year, month, 1);
    const month2 = getJalaliMonthName(year, month, 28);
    if (month1 === month2) {
      // same month
      return `${month1} ${yearStr1}`;
    }
    // different month
    // check for different year
    if (yearStr1 === yearStr2) {
      return `${month1}-${month2} ${yearStr1}`;
    }
    return `${month1} ${yearStr1} - ${month2} ${yearStr2}`;
  }

  // process for only year
  const date1 = new Date(year, 1, 1);
  const date2 = new Date(year, 12, 31);
  const onlyYearDateFormatter = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' });
  const yearStr1 = onlyYearDateFormatter.format(date1);
  const yearStr2 = onlyYearDateFormatter.format(date2);
  // check negative years
  if (yearStr1.includes('−') || yearStr2.includes('−')) return null;

  if (yearStr1 === yearStr2) {
    return yearStr1;
  }
  return `${yearStr1}-${yearStr2}`;
}
