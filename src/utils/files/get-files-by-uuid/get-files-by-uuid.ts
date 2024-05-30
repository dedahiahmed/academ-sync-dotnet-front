import { supabase } from "@/utils/supabase/supabase";
import { mapToFiles } from "../files/map-to-files";

export default async function getFilesByUUID(
  buketName: string,
  uuidList: string[]
) {
  try {
    let query = supabase
      .schema("storage")
      .from("objects")
      .select(`*`, { count: "exact" })
      .in("id", uuidList)
      .order("created_at", { ascending: false });

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
          files.map((file) => mapToFiles({ buketName, file }))
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
