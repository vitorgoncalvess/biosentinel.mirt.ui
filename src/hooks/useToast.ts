"use client";

import { useState } from "react";

const useToast = () => {
  const [show, setShow] = useState(false);

  const toast = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3500);
  };

  return {
    show,
    toast,
  };
};

export default useToast;
