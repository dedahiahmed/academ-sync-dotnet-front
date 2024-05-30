import { Database } from "@/data/types/supabase";
import { extractFileExtensionForAvisUrl } from "./mapping-helpers/extract-extention/extract-extention";
import { extractFileNameForAvisUrl } from "./mapping-helpers/extract-name/extract-name";
import { getPublicUrlForAvisUrl } from "./mapping-helpers/get-public-url/get-public-url";

export const mapToFiles = ({
  file,
  buketName,
}: {
  file: Database["storage"]["Tables"]["objects"]["Row"];
  buketName: string;
}): CourseUrl => {
  return {
    extention: extractFileExtensionForAvisUrl(file.name),
    link: getPublicUrlForAvisUrl(buketName, file.name),
    title: extractFileNameForAvisUrl(file.name),
  };
};
