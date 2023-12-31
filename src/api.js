export const apiCallWithPrayerTime = (userData) => {
    const salatTime    = new Date();
    const currentYear  = salatTime.getFullYear();
    const currentMonth = salatTime.getMonth() + 1;

    const baseUrl = "https://api.aladhan.com/v1";
    let path = null;
    let queryParams = `&method=${userData.salat_method}school=${userData.mazhab}`;

    if (userData.hasOwnProperty('city')) {
        path =  `/calendarByCity/${currentYear}/${currentMonth}?city=${userData.city}&country=${userData.country}`
    } else {
        path = `/calendarByAddress/${currentYear}/${currentMonth}?address=${userData.country}`;
    }

    return baseUrl + path + queryParams;
}