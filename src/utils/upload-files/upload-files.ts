import {v4 as uuidv4} from "uuid";
import {supabase} from "@/utils/supabase/supabase";


export default async function uploadMultiplesFiles(
    bucketName: string,
    files: File[]
) {
  try {
    const uploadedFiles: string[] = []; // Changed the type to string array

    for (const file of files) {
      const validFileName = file.name.replace(
          /[^a-zA-Z0-9-._*'()&$@=;:+,?/ ]/g,
          ""
      );
      const {data, error} = await supabase.storage
          .from(bucketName)
          .upload(`/course/${uuidv4()}/${validFileName}`, file);

      if (error) {
        console.error("Error uploading file:", error);
        throw new Error(error.message);
      }

      if (data) {
        const {data: fileFromStorage} = supabase.storage
            .from(bucketName)
            .getPublicUrl(data.path);
        uploadedFiles.push(fileFromStorage.publicUrl); // Push the URL directly
      }
    }

    return uploadedFiles;
  } catch (error: any) {
    console.error("An unexpected error occurred:", error);
    throw new Error(error);
  }
}
