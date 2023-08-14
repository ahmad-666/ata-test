import { useCallback, useMemo, useState } from "react";
type Field = any;
type UseFormArgs = {
  initVals: Record<string, Field>;
};
export default function LoginForm({ initVals }: UseFormArgs) {
  const [values, setValues] = useState<Record<string, Field>>(initVals);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, files, type } = e.target;
    const finalValue = type === "file" ? files?.[0] : value;
    setValues((old) => ({ ...old, [name]: finalValue }));
  }, []);
  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setTouched((old) => ({ ...old, [name]: true }));
  }, []);
  const resetForm = useCallback(() => {
    const resetValues: Record<string, string> = {};
    Object.keys(initVals).forEach((key) => (resetValues[key] = ""));
    setValues(resetValues);
    setErrors({});
    setTouched({});
  }, [initVals]);
  const formIsValid = useMemo(() => {
    return !Object.keys(errors).length;
  }, [errors]);
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const allTouched: Record<string, boolean> = {};
      Object.keys(initVals).forEach((key) => (allTouched[key] = true));
      setTouched(allTouched);
    },
    [initVals]
  );
  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((old) => ({ ...old, [name]: value }));
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
    setFieldValue,
  };
}
