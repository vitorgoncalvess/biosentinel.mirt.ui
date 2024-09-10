import React from "react";

type Props = {
  show?: boolean;
  children?: React.ReactNode;
};

const Toast = ({ show, children }: Props) => {
  if (show)
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white rounded-sm drop-shadow animate-enter-right overflow-hidden">
        {children}
        <div className="h-1 bg-zinc-200 w-full relative">
          <div className="h-1 bg-white absolute animate-width-full"></div>
        </div>
      </div>
    );
};

export default Toast;
