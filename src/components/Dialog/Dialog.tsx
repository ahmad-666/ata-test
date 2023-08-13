import { createPortal } from "react-dom";
import styles from "./dialog.module.css";
import { useCallback } from "react";
type DialogProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
};

export default function Dialog({
  show,
  setShow,
  title,
  children,
}: DialogProps) {
  const closeHandler = useCallback(() => {
    setShow(false);
  }, [setShow]);
  if (!show) return null;
  return createPortal(
    <>
      <div
        onClick={closeHandler}
        className={`w-full h-screen fixed z-2 ${styles.overlay}`}
      ></div>
      <div className={`fixed z-3 rounded p-lg white z-3 ${styles.dialog}`}>
        <div className="flex justify-between items-center">
          <p className="slate-dark--text text-bold text-lg">{title}</p>
          <button onClick={closeHandler} className="font-xl slate-light--text">
            X
          </button>
        </div>
        <div className="my-md">{children}</div>
      </div>
    </>,
    document.querySelector("#portals")!
  );
}
