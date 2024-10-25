"use client";

import React, { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  value?: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
};

const Switch = ({ value, setValue }: Props) => {
  return (
    <div
      onClick={() => setValue(!value)}
      className={twMerge(
        "w-16 h-8 rounded-full p-1 relative overflow-hidden transition bg-red-400 cursor-pointer",
        value && "bg-green-400"
      )}
    >
      <div
        className={twMerge(
          "w-[24px] h-full rounded-full transition bg-white",
          value && "translate-x-[calc(100%+8px)]"
        )}
      ></div>
    </div>
  );
};

export default Switch;
