export function getFileType(name: string) {
  if (name?.includes("pdf")) return "application/pdf";
  return "image/jpeg";
}
