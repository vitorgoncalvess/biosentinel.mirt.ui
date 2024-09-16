import { Body } from "@/providers/toast-provider";
import React from "react";

type Props = {
  show?: boolean;
  body?: Body;
  children?: React.ReactNode;
};

const Toast = ({ show, body }: Props) => {
  if (show)
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white rounded-sm drop-shadow animate-enter-right overflow-hidden">
        <header className="p-2 py-1 border-b border-zinc-200 font-semibold text-lg">
          {body?.header}
        </header>
        <section className="p-2">{body?.body}</section>
        <div className="h-1 bg-zinc-200 w-full relative">
          <div className="h-1 bg-white absolute animate-width-full"></div>
        </div>
      </div>
    );
};

export default Toast;
