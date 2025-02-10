
function getJalaliMonthName(year, month, day) {
    const gregorianDate = new Date(year, month, day)
    const onlyMonthDateFormatter = new Intl.DateTimeFormat("fa-IR", { month: 'long' })
    return onlyMonthDateFormatter.format(gregorianDate);
}

function getEstimatedJalaliString(year, month = null) {
    // process for year and month
    if (month !== null) {
        // get year in jalali time
        // TODO: check for different years in start and end of the month
        const dateObj = new Date(year, month, 1)
        const onlyYearDateFormatter = new Intl.DateTimeFormat("fa-IR", { year: 'numeric' })
        const yearStr = onlyYearDateFormatter.format(dateObj);


        // TODO: handle for 31-days months
        let month1 = getJalaliMonthName(year, month, 1)
        let month2 = getJalaliMonthName(year, month, 28)
        if (month1 == month2) {
            // same month
            return yearStr + " " + month1
        } else {
            // different month
            return yearStr + " " + month1 + "-" + month2
        }
    }

    // process for only year
    const date1 = new Date(year, 1, 1)
    const date2 = new Date(year, 12, 31)
    const onlyYearDateFormatter = new Intl.DateTimeFormat("fa-IR", { year: 'numeric' })
    let yearStr1 = onlyYearDateFormatter.format(date1);
    let yearStr2 = onlyYearDateFormatter.format(date2);
    if (yearStr1 == yearStr2) {
        return yearStr1;
    }
    return yearStr1 + "-" + yearStr2
}

// console.log(jalaali.toJalaali(1975, 1, 1).jy, jalaali.toJalaali(1975, 12, 31).jy)
// jalaali.
// console.log(getEstimatedJalaliString(2020, 9))
// console.log(getEstimatedJalaliString(2022))
// d = new Date(2020, 9, 1)
// console.log(new Intl.DateTimeFormat('en-US-u-ca-persian', { dateStyle: 'full' }).format(d))
// console.log(getJalaliMonthName(1975, 12))


// const DATE_PATTERNS = {
//     // YYYY : only a 4-digit year
//     YEAR: /(\d{2,4})/,
//     // M Y : year and month
//     YEAR_MONTH: /^(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*,?\s*(\d{2,4})$/i,
// }

// // console.log(DATE_PATTERNS.YEAR.exec("1977 oajodaw")[1])
// console.log(DATE_PATTERNS.YEAR_MONTH.exec("jAN 1977")[2])