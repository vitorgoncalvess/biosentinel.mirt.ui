import React, { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = ({ label, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="font-medium">
        {label}
      </label>
      <input
        className="w-full bg-[#E2E2E2] rounded h-10 p-2 outline-none"
        type="text"
        {...props}
      />
    </div>
  );
};

export default Input;
