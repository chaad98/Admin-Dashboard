export const formattedDate = (initialDate: string): any => {
  const convertDate = new Date(initialDate);
  return convertDate.toLocaleDateString;
};
