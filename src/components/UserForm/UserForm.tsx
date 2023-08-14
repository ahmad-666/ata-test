import { useCallback, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import InputField from "../InputField/InputField";
import FileUploader from "../FileUploader/FileUploader";
import {
  isEmail,
  isMobile,
  isOnlyNumberPersian,
  isOnlyPersian,
  isSSN,
  isRequired,
} from "../../utils/formRules";
import type { User } from "../../types/user";
type AddMode = {
  mode: "add";
  onAdd: (newUser: User) => void;
  onEdit?: never;
  editUser?: never;
};
type EditMode = {
  mode: "edit";
  onAdd?: never;
  onEdit: (editedUser: User) => void;
  editUser: User;
};
type UserFormProps = AddMode | EditMode;
export default function UserForm({
  mode,
  editUser,
  onAdd,
  onEdit,
}: UserFormProps) {
  const {
    values,
    errors,
    touched,
    onSubmit,
    resetForm,
    formIsValid,
    onChange,
    onBlur,
    setErrors,
    setFieldValue,
  } = useForm({
    initVals: {
      fname: "",
      lname: "",
      ssn: "",
      email: "",
      mobile: "",
      address: "",
      file: null,
    },
  });
  const [thumbnail, setThumbnail] = useState<string>("");
  useEffect(() => {
    if (mode === "edit" && editUser) {
      setFieldValue("fname", editUser.fname);
      setFieldValue("lname", editUser.lname);
      setFieldValue("ssn", editUser.ssn);
      setFieldValue("email", editUser.email);
      setFieldValue("mobile", editUser.mobile);
      setFieldValue("address", editUser.address);
      setThumbnail(editUser.imgSrc);
    }
  }, [mode, setFieldValue, editUser]);
  const validate = useCallback(() => {
    const errors: Record<string, string> = {};
    const validateFname = isOnlyPersian(values.fname);
    const validateLname = isOnlyPersian(values.lname);
    const validateSSN = isSSN(values.ssn);
    const validateEmail = isEmail(values.email);
    const validateMobile = isMobile(values.mobile);
    const validateAddress = isOnlyNumberPersian(values.address);
    const validateFile = isRequired(thumbnail);
    if (validateFname !== true) errors.fname = validateFname;
    if (validateLname !== true) errors.lname = validateLname;
    if (validateSSN !== true) errors.ssn = validateSSN;
    if (validateEmail !== true) errors.email = validateEmail;
    if (validateMobile !== true) errors.mobile = validateMobile;
    if (validateAddress !== true) errors.address = validateAddress;
    if (validateFile !== true) errors.file = validateFile;
    return errors;
  }, [values, thumbnail]);
  useEffect(() => {
    setErrors(validate());
  }, [setErrors, validate]);
  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      onSubmit(e);
      if (formIsValid) {
        if (mode === "add" && onAdd) {
          onAdd({
            id: Math.random(),
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            mobile: values.mobile,
            ssn: values.ssn,
            address: values.address,
            imgSrc: thumbnail,
          });
          resetForm();
        } else if (mode === "edit" && onEdit) {
          onEdit({
            id: editUser && editUser.id,
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            mobile: values.mobile,
            ssn: values.ssn,
            address: values.address,
            imgSrc: thumbnail,
          });
        }
      }
    },
    [
      editUser,
      formIsValid,
      mode,
      onAdd,
      onEdit,
      onSubmit,
      resetForm,
      thumbnail,
      values,
    ]
  );
  return (
    <div>
      <form noValidate onSubmit={submitHandler}>
        <div className="flex wrap">
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="fname"
              label="نام"
              value={values.fname}
              setValue={onChange}
              onBlur={onBlur}
              error={touched.fname && errors.fname}
            />
          </div>
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="lname"
              label="نام خانوادگی"
              value={values.lname}
              setValue={onChange}
              onBlur={onBlur}
              error={touched.lname && errors.lname}
            />
          </div>
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="ssn"
              label="شماره ملی"
              value={values.ssn}
              setValue={onChange}
              onBlur={onBlur}
              error={touched.ssn && errors.ssn}
              className="input-direction-ltr"
            />
          </div>
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="email"
              label="ایمیل"
              type="email"
              value={values.email}
              setValue={onChange}
              onBlur={onBlur}
              error={touched.email && errors.email}
            />
          </div>
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="mobile"
              label="موبایل"
              type="tel"
              value={values.mobile}
              setValue={onChange}
              onBlur={onBlur}
              error={touched.mobile && errors.mobile}
            />
          </div>
          <div className="grid-col cols-12">
            <InputField
              name="address"
              label="آدرس"
              value={values.address}
              setValue={onChange}
              onBlur={onBlur}
              error={touched.address && errors.address}
            />
          </div>
          <div className="grid-col cols-12">
            <FileUploader
              name="file"
              label="آپلود تصویر"
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              setValue={onChange}
              onBlur={onBlur}
              error={touched.file && errors.file}
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded mt-lg mx-auto block primary py-md px-lg white--text text-md"
        >
          {mode === "add" ? "افزودن کارمند" : "ویرایش کارمند"}
        </button>
      </form>
    </div>
  );
}
