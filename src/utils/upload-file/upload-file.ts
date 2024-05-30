export default async function uploadFiles(files: File[], token: string) {
  const formData = new FormData();
  Array.from(files).forEach((file, index) => {
    formData.append(`files`, file);
  });

  try {
    const response = await fetch("/api/file", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload files");
    }

    const responseBody = await response.json();
    return responseBody.uploaded_file_ids;
  } catch (error) {
    console.error("Error uploading files:", error);
    return [];
  }
}
