export const isImage = (fileName: string): boolean => {
  return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(fileName);
};
