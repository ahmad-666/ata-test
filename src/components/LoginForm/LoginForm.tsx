import styles from "./loginForm.module.css";
import InputField from "../InputField/InputField";
import { useCallback, useEffect, useContext } from "react";
import { isEmail, isPassword } from "../../utils/formRules";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../providers/Auth";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const {
    values,
    errors,
    setErrors,
    touched,
    onChange,
    onBlur,
    formIsValid,
    onSubmit,
    resetForm,
  } = useForm({
    initVals: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const validate = useCallback(() => {
    const errors: Record<string, string> = {};
    const emailValidation = isEmail(values.email);
    const passwordValidation = isPassword(values.password);
    if (emailValidation !== true) errors.email = emailValidation;
    if (passwordValidation !== true) errors.password = passwordValidation;
    return errors;
  }, [values]);
  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      onSubmit(e);
      if (formIsValid) {
        resetForm();
        login();
        navigate("/dashboard", { replace: true });
      }
    },
    [formIsValid, onSubmit, resetForm, login, navigate]
  );
  useEffect(() => {
    setErrors(validate());
  }, [setErrors, validate]);
  return (
    <div className={`relative w-full h-screen ${styles.gradient}`}>
      <div className={`white p-lg rounded absolute ${styles.loginForm}`}>
        <form noValidate onSubmit={submitHandler}>
          <InputField
            label="ایمیل"
            type="email"
            name="email"
            value={values.email}
            setValue={onChange}
            onBlur={onBlur}
            error={touched.email && errors.email}
          />
          <InputField
            label="رمز عبور"
            type="password"
            name="password"
            value={values.password}
            setValue={onChange}
            onBlur={onBlur}
            error={touched.password && errors.password}
            className="mt-lg"
          />
          <button className="rounded block mt-lg mx-auto primary white--text py-md px-lg text-md">
            ورود به حساب کاربری
          </button>
        </form>
      </div>
    </div>
  );
}
