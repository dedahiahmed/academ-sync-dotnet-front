import React from "react";
import { useFormContext } from "react-hook-form";

interface InputText {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  validationRules?: any;
}

const InputText: React.FC<InputText> = ({
  name,
  label,
  type = "text",
  placeholder,
  validationRules,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message;
  const isErrorMessageString = typeof errorMessage === "string";
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-zinc-800 text-base font-normal font-['Roboto'] mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name, validationRules)}
        placeholder={placeholder}
        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
      />
      {isErrorMessageString && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default InputText;
