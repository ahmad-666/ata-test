import { useCallback, useMemo, useState } from "react";
type UseFormArgs = {
  initVals: Record<string, string>;
};
export default function LoginForm({ initVals }: UseFormArgs) {
  const [values, setValues] = useState<Record<string, string>>(initVals);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((old) => ({ ...old, [name]: value }));
  }, []);
  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setTouched((old) => ({ ...old, [name]: true }));
  }, []);
  const resetForm = useCallback(() => {
    setValues({ email: "", password: "" });
    setErrors({});
    setTouched({});
  }, []);
  const formIsValid = useMemo(() => {
    return !Object.keys(errors).length;
  }, [errors]);
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
  }, []);
  return {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    setTouched,
    onChange,
    onBlur,
    formIsValid,
    resetForm,
    onSubmit,
  };
}
