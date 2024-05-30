import FilterRendererDropDown from "../FilterRendererDropDown/FilterRendererDropDown";

export default function FilterOptionRenderer({
  option,
  filterValues,
  valuesSetter,
}: Readonly<{
  option: FilterOptions;
  filterValues: FiltersPossibility;
  valuesSetter: (atribut: string, value: string) => void;
}>) {
  let filterComponent = null;

  if (option.type === "dropDown") {
    filterComponent = (
      <FilterRendererDropDown
        value={filterValues[option.filterName]}
        valuesSetter={valuesSetter}
        option={option}
      />
    );
  }

  return <>{filterComponent}</>;
}
