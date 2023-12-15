export function getFileType(name: string) {
  if (name?.includes("pdf")) return "application/pdf";
  return `image/${getFileExtension(name)}`;
}

export function getFileExtension(fileName: string) {
  return fileName?.substring(fileName?.lastIndexOf(".") + 1);
}
