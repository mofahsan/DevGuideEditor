import React from "react";

const FormSelect = ({ register, name, label, options, errors }: any) => {

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value,"value")
    console.log(e.target.selectedIndex,"index")
  };

  
  
  return (
  <>
    <div className="mb-4">
      <label className="block">{label}</label>
      <select
        {...register(name)}
        className="mt-2 block w-full p-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        onChange={onSelectChange}
      >
        {options.map((option: {name:string}, index: number) => (
          <option value={option.name} key={index}>
            {option.name}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  </>
)
};

export default FormSelect;
