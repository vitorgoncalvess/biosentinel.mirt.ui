import { ToastContext } from "@/providers/toast-provider";
import { useContext } from "react";

const useToast = () => useContext(ToastContext);

export default useToast;
