import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  loading?: boolean;
};

const Button = ({ children, loading, ...props }: Props) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={twMerge("flex items-center gap-2", props.className)}
    >
      {loading && (
        <div className="border-2 border-white border-b-transparent rounded-full h-4 w-4 animate-spin"></div>
      )}
      {children}
    </button>
  );
};

export default Button;
