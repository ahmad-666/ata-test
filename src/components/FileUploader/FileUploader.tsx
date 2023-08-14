import { ChangeEvent, useCallback } from "react";
import styles from "./fileUploader.module.css";

type FileUploaderProps = {
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  thumbnail: null | string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
  error?: null | boolean | string;
  name: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export default function FileUploader({
  setValue,
  label,
  thumbnail,
  setThumbnail,
  error = null,
  name,
  onBlur,
}: FileUploaderProps) {
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e);
      const file = e.target.files?.[0];
      if (file) {
        const src = URL.createObjectURL(file);
        setThumbnail(src);
      }
    },
    [setValue, setThumbnail]
  );
  const blurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur(e);
    },
    [onBlur]
  );
  return (
    <div>
      <div>
        <label className="primary py-md px-lg rounded inline-block cursor-pointer">
          <p className="white--text text-md">{label}</p>
          <input
            name={name}
            type="file"
            className="hidden"
            onChange={changeHandler}
            onBlur={blurHandler}
          />
        </label>
      </div>
      {error && <p className="text-xs error--text mt-xs">{error}</p>}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="upload-img"
          className={`mt-md rounded ${styles.thumbnail}`}
        />
      )}
    </div>
  );
}
