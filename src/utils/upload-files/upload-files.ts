import { supabase } from "../supabase/supabase";
import { v4 as uuidv4 } from "uuid";

interface UploadedData {
  id: string;
  path: string;
}

export default async function uploadMultiplesFiles(
  buketName: string,
  files: File[]
) {
  try {
    const uploadedFileIds: string[] = [];

    for (const file of files) {
      const validFileName = file.name.replace(
        /[^a-zA-Z0-9-._*'()&$@=;:+,?/ ]/g,
        ""
      );
      const { data, error } = await supabase.storage
        .from(buketName)
        .upload(`/course/${uuidv4()}/${validFileName}`, file);

      if (error) {
        console.error("Error uploading file:", error);
        throw new Error(error.message);
      }

      // If data is not null, it should have both id and path properties
      if (data) {
        const { id } = data as UploadedData; // Casting data to UploadedData
        uploadedFileIds.push(id);
      }
    }

    return uploadedFileIds;
  } catch (error: any) {
    console.error("An unexpected error occurred:", error);
    throw new Error(error);
  }
}
