import { Select } from "antd";

export default function FilterRendererDropDown({
  value,
  valuesSetter,
  option,
}: Readonly<{
  value: string;
  valuesSetter: (atribut: string, value: string) => void;
  option: FilterOptions;
}>) {
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onChange = (value: string) => {
    valuesSetter(option.filterName, value);
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <div className="flex justify-between w-[100%] items-center">
      <Select
        value={value}
        className="w-[90%] h-[2.625rem] mr-[0.8rem]"
        showSearch
        placeholder=""
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={option.options}
      />
    </div>
  );
}
