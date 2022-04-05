const useGetContrast = (hexColor: string) => {
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);
  var calcContrast = (r * 299 + g * 587 + b * 114) / 1000;
  return calcContrast >= 128 ? true : false;
};

export default useGetContrast;
