// insertCourse.js


import {supabase} from "@/utils/supabase/supabase";

type CourseData = {
  teacherId: number;
  files: string[];
  title: string;
  type: string;
  semester: string;
};

async function insertCourse(data: CourseData) {
  const { teacherId, files, title, type, semester } = data;

  try {
    const { data, error } = await supabase
      .from('course')
      .insert([
        {
          title: title,
          type: type,
          semester: semester,
          teacher_id: 3,
          files: files
        }
      ]);

    if (error) {
      console.error('Error inserting course:', error);
      return { error };
    }

    console.log('Course inserted successfully:', data);
    return { data };
  } catch (error) {
    console.error('Unexpected error inserting course:', error);
    return { error };
  }
}

export default insertCourse;
