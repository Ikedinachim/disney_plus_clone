export const FormatDate = function(value) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let current_datetime = new Date(value);
    let formatted_date =
    current_datetime.getDate() +
      "/" +
      months[current_datetime.getMonth()] +
      "/" +
      current_datetime.getFullYear();
    return formatted_date;
};