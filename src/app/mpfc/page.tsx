"use client";
import semesterList from "@/data/lists/semester-list";
import React, { useState } from "react";
import fcData from "../../components/SearchListeZone/Components/fc.json";
import Navbar from "@/components/Navbar/Navbar";
import FiltersSideBar from "@/components/FiltersSideBar/FiltersSideBar";
import FcGrid from "@/components/FcCard/Components/FcGrid";
import priorityList from "@/data/lists/priority-list";
import { FaTimes } from "react-icons/fa";
export default function page() {
  const listOfOptions: FilterOptions[] = [
    {
      filterName: "semestre",
      title: "semestre",
      type: "dropDown",
      options: semesterList,
    },
    {
      filterName: "type_du_module",
      title: "priorité",
      type: "dropDown",
      options: priorityList,
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
  // Update your filteredData logic
  const filteredData =
    values.semestre.length || values.type_du_module.length
      ? fcData.filter((item) => {
          // Check if the item's semestre is included in the selected semestres
          const semestreFilterPassed =
            values.semestre.length === 0 ||
            values.semestre.includes(item.semestre);

          // Check if the item's type_du_module matches the selected type_du_module
          const typeFilterPassed =
            values.type_du_module.length === 0 ||
            values.type_du_module.includes(item.type_du_module);

          // Return true if both conditions are met
          return semestreFilterPassed && typeFilterPassed;
        })
      : fcData;
  const totalResults = filteredData.length;
  return (
    <>
      <Navbar />

      <div className=" mb-[6.25rem] w-[100%] py-[2.25rem] lg:py-[4rem] pl-[0.5rem] pr-[1rem] lg:px-[10.38rem] flex flex-col ">
        <p className="mb-[1.88rem] lg:mb-16 ml-[1.5rem] text-start lg:ml-0 lg:text-start text-[1.375rem] leading-[1.875rem] font-bold text-black md:mb-16 md:text-2xl md:leading-9 lg:text-3xl lg:leading-10 whitespace-nowrap overflow-hidden">
          Master Professionnel en Finance et Comptabilité
        </p>

        <div className="w-full  flex">
          <div className="relative w-full hidden lg:block lg:flex-1 ">
            <FiltersSideBar
              listOfOptions={listOfOptions}
              filterValues={values}
              valuesSetter={valueSetter}
            />
          </div>

          <div className="w-full lg:flex-[2] flex-col gap-[1.56rem] lg:border lg:rounded-[0.75rem] border-[#E6E7E9]">
            <div className="flex justify-between items-center px-[1.5rem] mt-5">
              <p className="text-[0.8125rem] pt-[2rem] ml-[0.5rem] lg:ml-[2rem] leading-[1.125rem] lg:leading-[1.875rem] font-[400] text-[#0D0D0D]">
                {totalResults} résultats
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={toggleFilters}
                  className="flex items-center gap-2 ml-5 text-sm font-text text-[#4C82D0] bg-transparent hover:bg-gray-100 rounded-[1.875rem] px-3 py-2 lg:hidden border border-[#4C82D0]"
                >
                  Filtres
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M8.25 15.75V11.25H9.75V12.75H15.75V14.25H9.75V15.75H8.25ZM2.25 14.25V12.75H6.75V14.25H2.25ZM5.25 11.25V9.75H2.25V8.25H5.25V6.75H6.75V11.25H5.25ZM8.25 9.75V8.25H15.75V9.75H8.25ZM11.25 6.75V2.25H12.75V3.75H15.75V5.25H12.75V6.75H11.25ZM2.25 5.25V3.75H9.75V5.25H2.25Z"
                      fill="#4C82D0"
                    />
                  </svg>
                </button>

                {showFilters && (
                  <div className="fixed inset-0 z-200">
                    {/* Fixed Header */}
                    <div className="fixed top-0 left-0 w-full bg-white z-100">
                      <button
                        onClick={toggleFilters}
                        className="fixed top-0 right-0 mt-4 mr-4"
                      >
                        <FaTimes className="hover:text-hblue cursor-pointer text-gray-400 text-xl" />
                      </button>
                      <p className="font-title text-[1.375rem] text-center mb-[1.94rem] leading-[1.625rem] font-[600] text-cblack mt-[5rem]">
                        Filters
                      </p>
                    </div>
                    {/* Scrollable FiltersSideBar */}
                    <div className="pt-[2rem] h-full flex flex-col mt-[5rem]">
                      <div className="bg-white py-10 px-[1.5rem] flex-grow overflow-y-auto ">
                        <FiltersSideBar
                          listOfOptions={listOfOptions}
                          filterValues={values}
                          valuesSetter={valueSetter}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {!showFilters && <FcGrid data={filteredData} />}
          </div>
        </div>
      </div>
    </>
  );
}
