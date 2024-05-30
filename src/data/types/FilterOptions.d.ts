type FilterName =
  | keyof FormationFilterType
  

type FilterOptions = {
  filterName: FilterName;
  title: string;
  type: "dropDown" | "checkBoxes" | "Radios" | "dropDownMultiple";

  options: SelectOption[];
};
