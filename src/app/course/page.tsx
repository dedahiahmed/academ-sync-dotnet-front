"use client";
import CourseGrid from "@/components/CourseGrid/CourseGrid";
import FilesLister from "@/components/FilesLister/FilesLister";
import FiltersSideBar from "@/components/FiltersSideBar/FiltersSideBar";
import Navbar from "@/components/Navbar/Navbar";
import NewButton from "@/components/NewButton/NewButton";
import semesterList from "@/data/lists/semester-list";
import { getAllCourses } from "@/utils/course/get-all-courses/courses";
import getFilesByUUID from "@/utils/files/get-files-by-uuid/get-files-by-uuid";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

export default function page() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<CourseUrl[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        console.log("course data", coursesData[0].files);

        const uuids = coursesData[0].files;
        const responseFiles = await getFilesByUUID("course", uuids);
        let responseFile = { mappedFiles: responseFiles };
        const filesUrl = responseFile.mappedFiles;
        setFiles(filesUrl);
        console.log("----------", responseFile);

        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  const listOfOptions: FilterOptions[] = [
    {
      filterName: "semestre",
      title: "semestre",
      type: "dropDown",
      options: semesterList,
    },
  ];
  const [values, setValues] = useState<FormationFilterType>({
    semestre: [],
    type_du_module: [],
    title: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    document.body.classList.toggle("no-scroll");
  };
  const valueSetter = (atribut: string, value: string | string[]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [atribut]: value,
    }));
  };
  const filteredData = values.semestre.length
    ? courses.filter((item) => values.semestre.includes(item.semester))
    : courses;
  console.log("-----------files", files);
  return (
    <>
      <Navbar />

      <div className=" mb-[6.25rem] w-[100%] py-[2.25rem] lg:py-[4rem] pl-[0.5rem] pr-[1rem] lg:px-[7.38rem] flex flex-col ">
        <p className="mb-[1.88rem] lg:mb-16 ml-[1.5rem] text-start lg:ml-0 lg:text-start text-[1.375rem] leading-[1.875rem] font-bold text-black md:mb-16 md:text-2xl md:leading-9 lg:text-3xl lg:leading-10 whitespace-nowrap overflow-hidden flex justify-between">
          Courses
        </p>

        <div className="w-full  flex">
          <div className="relative w-full hidden lg:block lg:flex-1 ">
            <FiltersSideBar
              listOfOptions={listOfOptions}
              filterValues={values}
              valuesSetter={valueSetter}
            />
          </div>

          <div className="w-full lg:flex-[2] flex-col gap-[1.56rem] ">
            <CourseGrid data={filteredData} files={files} />
          </div>
        </div>
      </div>
    </>
  );
}
