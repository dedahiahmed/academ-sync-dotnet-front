import FilterDropDown from "../FilterDropDown/FilterDropDown";

export default function FiltersSideBar({
  listOfOptions,
  filterValues,
  valuesSetter,
}: Readonly<{
  listOfOptions: FilterOptions[];
  filterValues: FiltersPossibility;
  valuesSetter: (atribut: string, value: string) => void;
}>) {
  return (
    <div className="w-[100%] py-[0.37rem] lg:pr-[1.88rem]  flex flex-col overflow-scroll lg:overflow-hidden">
      <p className="font-title hidden lg:block text-[1.375rem] text-center lg:text-start mb-[1.94rem] leading-[1.625rem] font-[600] text-cblack ">
        {" "}
        Filtrer par
      </p>
      {listOfOptions.map((option, index) => (
        <FilterDropDown
          key={option.filterName + index}
          option={option}
          filterValues={filterValues}
          valuesSetter={valuesSetter}
        />
      ))}
    </div>
  );
}
