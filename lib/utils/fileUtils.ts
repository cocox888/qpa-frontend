export const fileSizeFormat = (size: number) => {
  if (size < 1024) {
    return size + " KB";
  } else {
    return (size / 1024).toFixed(1) + " MB";
  }
};
