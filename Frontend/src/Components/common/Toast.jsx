import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "../../redux-slices/toastSlices";

const Toast = () => {
  const { toast: toastifier } = useAppSelector((state) => state.toast);
  const [isToast, setIsToast] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toastifier.message !== "" && toastifier.type !== "") {
      setIsToast(true);
    }
  }, [toastifier]);

  useEffect(() => {
    let timeout;
    if (isToast) {
      timeout = setTimeout(() => {
        setIsToast(false);
        dispatch(toast.remove());
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToast]);

  return (
    <div
      className={`fixed top-0 right-0 ${
        toastifier.type === "success"
          ? "bg-green-600"
          : toastifier.type === "error"
          ? "bg-red-600"
          : toastifier.type === "info"
          ? "bg-blue-500"
          : ""
      } w-full z-[10000] py-[10px] text-white font-medium flex gap-4 items-center justify-center animation ${
        isToast ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <span className="text-white font-DM-sans">{toastifier?.message}</span>
      {/* <button className={`font-normal ${toastifier.type === "error" ? "text-primary-white" : "text-danger"} `} onClick={handleDismiss}>
        Dismiss
      </button> */}
    </div>
  );
};

export default Toast;
