import { useCallback, useMemo, useState } from "react";
type InputFieldProps = {
  value: string;
  setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  error?: null | boolean | string;
  type?: string;
  className?: string;
};
export default function InputField({
  value,
  setValue,
  onBlur,
  name,
  label,
  error = null,
  type = "text",
  className = "",
}: InputFieldProps) {
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setValue) setValue(e);
    },
    [setValue]
  );
  const [isFocus, setIsFocus] = useState(false);
  const focusHandler = useCallback(() => {
    setIsFocus(true);
  }, []);
  const blurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      if (onBlur) onBlur(e);
    },
    [onBlur]
  );
  const labelActive = useMemo(() => {
    if (isFocus || value) return true;
    return false;
  }, [isFocus, value]);
  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded ">
        <input
          type={type}
          value={value}
          name={name}
          onChange={changeHandler}
          className={`slate-light2 border-none outline-none p-md pt-lg w-full text-sm slate--text`}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
        <label
          className={`transition-linear text-sm slate-light1--text absolute pointer-none`}
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
      {error && <p className="text-xs error--text mt-xs">{error}</p>}
    </div>
  );
}
