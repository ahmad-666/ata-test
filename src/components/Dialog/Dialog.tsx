import { createPortal } from "react-dom";
import styles from "./dialog.module.css";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Dialog({
  open,
  onClose,
  title,
  children,
}: DialogProps) {
  if (!open) return null;
  return createPortal(
    <>
      <div
        onClick={onClose}
        className={`w-full h-screen fixed z-2 ${styles.overlay}`}
      ></div>
      <div className={`fixed z-3 rounded p-lg white z-3 ${styles.dialog}`}>
        <div className="flex justify-between items-center">
          <p className="slate-dark--text text-bold text-lg">{title}</p>
          <button onClick={onClose} className="font-xl slate-light--text">
            X
          </button>
        </div>
        <div className="my-md">{children}</div>
      </div>
    </>,
    document.querySelector("#portals")!
  );
}
