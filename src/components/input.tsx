import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  invalid?:
    | boolean
    | string
    | string[]
    | Record<string, unknown>
    | Record<string, unknown>[];
  error?: string;
};

const Input = ({ label, invalid, error, ...props }: Props) => {
  return (
    <div className="relative flex flex-col">
      <label htmlFor="" className="font-medium">
        {label}
      </label>
      <input
        className={`w-full bg-[#ebebeb] rounded h-10 p-2 outline-none ${
          invalid
            ? "bg-red-100 border border-red-200 hover:bg-red-200"
            : "hover:bg-zinc-200"
        }`}
        type="text"
        {...props}
      />
      {invalid && (
        <span className="text-red-500 absolute top-full text-sm opacity-80">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
