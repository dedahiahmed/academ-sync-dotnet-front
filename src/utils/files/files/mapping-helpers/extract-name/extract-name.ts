export function extractFileNameForAvisUrl(filePath: string) {
  // Use the last '/' to find the beginning of the file name
  const lastSlashIndex = filePath.lastIndexOf("/");
  const fileNameWithExtension = filePath.substring(lastSlashIndex + 1);

  // Use the last '.' to find the beginning of the file extension
  const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
  const fileName = fileNameWithExtension.substring(0, lastDotIndex);

  return fileName;
}
