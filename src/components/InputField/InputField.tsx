import { useCallback, useMemo, useState } from "react";
type InputFieldProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  error?: null | string;
  type?: string;
};
export default function InputField({
  value,
  setValue,
  label,
  error = null,
  type = "text",
}: InputFieldProps) {
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  const [isFocus, setIsFocus] = useState(false);
  const focusHandler = useCallback(() => {
    setIsFocus(true);
  }, []);
  const blurHandler = useCallback(() => {
    setIsFocus(false);
  }, []);
  const labelActive = useMemo(() => {
    if (isFocus || value) return true;
    return false;
  }, [isFocus, value]);
  return (
    <div>
      <div className="relative overflow-hidden rounded ">
        <input
          type={type}
          value={value}
          onChange={changeHandler}
          className={`slate-light2 border-none outline-none p-md pt-lg  w-full text-md slate--text`}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
        <label
          className={`transition-linear text-sm slate-light1--text absolute`}
          style={{
            right: !labelActive ? "20px" : "10px",
            top: !labelActive ? "50%" : "15%",
            transform: !labelActive
              ? "translateY(-50%) scale(1)"
              : "translateY(-50%) scale(.8)",
          }}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-sm error--text mt-xs">{error}</p>}
    </div>
  );
}
