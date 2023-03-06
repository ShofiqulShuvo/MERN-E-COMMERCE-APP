export const dateConverter = (dateString) => {
  const mainDate = new Date(dateString);
  const monthNames = [
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
    "Dec",
  ];
  const month = monthNames[mainDate.getMonth()];
  const date = mainDate.getDate();

  const year = mainDate.getFullYear();

  const formatedDate = `${date}/${month}/${year}`;

  return formatedDate;
};
