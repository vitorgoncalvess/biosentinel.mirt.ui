import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  invalid?: boolean;
};

const Input = ({ label, invalid, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="font-medium">
        {label}
      </label>
      <input
        className={`w-full bg-[#ebebeb] hover:bg-zinc-200 rounded h-10 p-2 outline-none ${
          invalid ? "bg-red-100 border border-red-200" : ""
        }`}
        type="text"
        {...props}
      />
    </div>
  );
};

export default Input;
