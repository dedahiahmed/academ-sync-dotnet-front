import { supabase } from "@/utils/supabase/supabase";

export const getPublicUrlForAvisUrl = (
  buketName: string,
  fileName: string
): string => {
  const { data } = supabase.storage.from(buketName).getPublicUrl(fileName);
  return data.publicUrl;
};
