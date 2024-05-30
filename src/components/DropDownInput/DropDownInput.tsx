import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export default function DropDown({
  name,
  list,
  placeHolder,
  requiredMessage,
}: Readonly<{
  requiredMessage: string;
  name: string;
  placeHolder: string;
  list: SelectOption[];
}>) {
  const { control } = useFormContext();

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="flex justify-between w-[100%] items-center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            className="w-full h-[2.625rem] mr-[0.8rem]"
            showSearch
            placeholder={placeHolder}
            optionFilterProp="children"
            filterOption={filterOption}
            options={list}
          />
        )}
        rules={{ required: requiredMessage }}
      />
    </div>
  );
}
