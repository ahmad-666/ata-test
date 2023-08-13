import { ChangeEvent, useCallback, useState } from "react";
import styles from "./fileUploader.module.css";

type FileUploaderProps = {
  onChange: (file: File) => void;
  label: string;
  thumbnail: null | string;
};
export default function FileUploader({
  onChange,
  label,
  thumbnail,
}: FileUploaderProps) {
  const [thumbnailSrc, setThumbnailSrc] = useState(thumbnail);
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange(file);
        const src = URL.createObjectURL(file);
        setThumbnailSrc(src);
      }
    },
    [onChange]
  );
  return (
    <div>
      <div>
        <label className="primary p-lg rounded">
          <p className="white--text text-md">{label}</p>
          <input type="file" className="hidden" onChange={changeHandler} />
        </label>
      </div>
      {thumbnailSrc && (
        <img
          src={thumbnailSrc}
          alt="upload-img"
          className={`mt-md rounded ${styles.thumbnail}`}
        />
      )}
    </div>
  );
}
