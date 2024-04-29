export const isDate21orMoreYearsOld = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 21);

  // Format the date as "YYYY-MM-DD"
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits for month
  const day = today.getDate().toString().padStart(2, "0"); // Ensure two digits for day

  return `${year}-${month}-${day}`;
};
