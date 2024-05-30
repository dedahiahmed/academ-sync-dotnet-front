import { supabase } from "@/utils/supabase/supabase";
import { mapToFiles } from "../files/map-to-files";

export default async function getFilesFromBuket(buketName: string) {
  try {
    let query = supabase.storage.from(buketName).list();

    const { data: files, error } = await query;

    // console.log("get all files :" + files);
    if (error) {
      // Handle the error appropriately
      console.error("Error fetching files:", error);
      return [];
    } else {
      if (files.length > 0) {
        //Map each avi to Post using mapToaviPost method
        const mappedFiles: CourseUrl[] = await Promise.all(
          files.map((file: any) => mapToFiles({ buketName, file }))
        );
        console.log("---------- mapped files :");
        console.log(mappedFiles);
        return mappedFiles;
      } else {
        // Handle case where no files are found
        return [];
      }
    }
  } catch (error) {
    // Handle other potential errors
    console.error("An unexpected error occurred:", error);
    return [];
  }
}
