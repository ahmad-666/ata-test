import { useCallback } from "react";

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
  return (
    <div>
      <div className="relative overflow-hidden rounded slate-light">
        <input
          type={type}
          value={value}
          onChange={changeHandler}
          placeholder={label}
        />
        {error && <p className="text-sm error--text mt-sm"></p>}
      </div>
    </div>
  );
}
