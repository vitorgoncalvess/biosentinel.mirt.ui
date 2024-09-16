"use client";

import Toast from "@/components/toast";
import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export type Body = {
  type?: "default";
  header?: string;
  body?: string;
};

export const ToastContext = createContext({
  toast: (body: Body) => {},
});

const ToastProvider = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const [body, setBody] = useState<Body>();

  const toast = (body?: Body) => {
    setShow(true);
    setBody(body);
    setTimeout(() => {
      setShow(false);
      setBody(undefined);
    }, 3500);
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
      }}
    >
      <Toast show={show} body={body} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
