import { createPortal } from "react-dom";
import styles from "./snackbar.module.css";
import { useCallback, useEffect } from "react";
type SnackbarProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  type?: "success" | "error";
  timeout?: number;
};
export default function Snackbar({
  show,
  setShow,
  children,
  type = "success",
  timeout = 30000,
}: SnackbarProps) {
  const closeHandler = useCallback(() => {
    setShow(false);
  }, [setShow]);
  useEffect(() => {
    let timerId: null | number = null;
    if (show) {
      timerId = setTimeout(() => {
        closeHandler();
      }, timeout);
    } else if (timerId) clearTimeout(timerId);
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [show, closeHandler, timeout]);
  if (!show) return null;
  return createPortal(
    <>
      <div
        className={`flex justify-between items-center fixed z-3 rounded p-md z-3 ${
          type === "success" ? "success" : "error"
        } ${styles.snackbar}`}
      >
        <div>{children}</div>
        <button
          onClick={closeHandler}
          className="font-xl white--text mr-lg mt-xs"
        >
          X
        </button>
      </div>
    </>,
    document.querySelector("#portals")!
  );
}
