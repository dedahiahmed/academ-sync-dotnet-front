
import {v4 as uuidv4} from "uuid";
import {supabase} from "@/utils/supabase/supabase";

interface UploadedFile {

  publicURL: string;
}

export default async function uploadMultiplesFiles(

    bucketName: string,

    files: File[]
) {
  try {
    const uploadedFiles: UploadedFile[] = [];

    for (const file of files) {
      const validFileName = file.name.replace(
          /[^a-zA-Z0-9-._*'()&$@=;:+,?/ ]/g,
          ""
      );
      const {data, error} = await supabase.storage
          .from(bucketName)
          .upload(`/course/${uuidv4()}/${validFileName}`, file);

      if(error) {
        console.error("Error uploading file:", error);
        throw new Error(error.message);
      }

      if (data) {
        const {data: fileFromStorage} = supabase.storage
            .from(bucketName)
            .getPublicUrl(data.path);
        uploadedFiles.push({
          publicURL: fileFromStorage.publicUrl
        });
      }
    }

    return uploadedFiles;
  } catch (error: any) {
    console.error("An unexpected error occurred:", error);
    throw new Error(error);
  }
}