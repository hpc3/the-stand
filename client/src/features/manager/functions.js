export const renderDateString = (
  dateObj = new Date(),
  seperator = "-",
  forward
) => {
  let dd = dateObj.getUTCDate().toString();
  let mm = dateObj.getMonth() + 1;
  mm = mm.toString();
  let yyyy = dateObj.getFullYear();

  if (dd.length === 1) dd = "0" + dd;

  if (mm.length === 1) mm = "0" + mm;

  return forward
    ? mm + seperator + dd + seperator + yyyy
    : yyyy + seperator + mm + seperator + dd;
};
