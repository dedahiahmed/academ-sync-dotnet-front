"use client";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import FilterOptionRenderer from "../FilterOptionRenderer/FilterOptionRenderer";

export default function FilterDropDown({
  option,
  filterValues,
  valuesSetter,
}: Readonly<{
  option: FilterOptions;
  filterValues: FiltersPossibility;
  valuesSetter: (atribut: string, value: string) => void;
}>) {
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="group text-cblack dropdown dropdown-end  normal-case mb-[1.88rem]">
      <summary
        onClick={toggleVisibility}
        onKeyDown={(event) => {
          if (event.key == "enter") toggleVisibility();
        }}
        className=" cursor-pointer flex items-center justify-between text-[0.875rem] font-[400] leading-[1.125rem] font-title"
      >
        {option.title}
        {visibility ? (
          <MdKeyboardArrowUp className="   h-[1.25rem] w-[1.25rem]  " />
        ) : (
          <MdKeyboardArrowDown className="   h-[1.25rem] w-[1.25rem]  " />
        )}
      </summary>

      {visibility && (
        <ul className="mt-[1.44rem] w-[90%] lg:w-[100%] rounded-lg bg-base-100 font-text text-[0.875rem] font-[400] leading-[1.125rem]">
          <FilterOptionRenderer
            option={option}
            filterValues={filterValues}
            valuesSetter={valuesSetter}
          />
        </ul>
      )}
    </div>
  );
}
