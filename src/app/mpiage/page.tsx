"use client";
import FiltersSideBar from "@/components/FiltersSideBar/FiltersSideBar";
import MatterGrid from "@/components/MatterCard/Components/MatterGrid/MatterGrid";
import MatterCard from "@/components/MatterCard/MatterCard";
import Navbar from "@/components/Navbar/Navbar";
import semesterList from "@/data/lists/semester-list";
import React, { useState } from "react";
import formationData from "../../components/SearchListeZone/Components/formation.json";
export default function page() {
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
    ? formationData.filter((item) => values.semestre.includes(item.semester))
    : formationData;
  return (
    <>
      <Navbar />

      <div className=" mb-[6.25rem] w-[100%] py-[2.25rem] lg:py-[4rem] pl-[0.5rem] pr-[1rem] lg:px-[7.38rem] flex flex-col ">
        <p className="mb-[1.88rem] lg:mb-16 ml-[1.5rem] text-start lg:ml-0 lg:text-start text-[1.375rem] leading-[1.875rem] font-bold text-black md:mb-16 md:text-2xl md:leading-9 lg:text-3xl lg:leading-10 whitespace-nowrap overflow-hidden">
          Master Professionnel en Informatique Appliquée á la Gestion
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
            <MatterGrid data={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
}
