export const isRequired = (val: unknown) => {
  if (!val || (typeof val === "string" && !val?.trim()?.length))
    return "فیلد اجباری است";
  return true;
};
export const isEmail = (val: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  if (regex.test(val)) return true;
  return "ایمیل معتبر وارد کنید";
};
export const isMobile = (val: string) => {
  const regex = /^09\d{9}$/;
  if (regex.test(val)) return true;
  return "موبایل معتبر وارد کنید";
};
export const isPassword = (val: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (regex.test(val)) return true;
  return "رمز باید حداقل 6 رقم باشد و شامل حروف بزرگ و کوچک و عدد باشد";
};
export const isSSN = (val: string) => {
  let result = false;
  if (val.length !== 10 || /(\d)(\1){9}/.test(val)) result = false;
  let sum = 0;
  let lastDigit = 0;
  let remainder = 0;
  const chars = val.split("");
  for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);
  remainder = sum % 11;
  lastDigit = remainder < 2 ? remainder : 11 - remainder;
  result = +chars[9] === lastDigit;
  if (result) return true;
  else return "شماره ملی معتبر وارد کنید";
};
export const isOnlyEng = (val: string) => {
  const regex = /^[A-z]+$/;
  if (regex.test(val)) return true;
  return "فقط حروف انگلیسی مجاز است";
};
export const isOnlyPersian = (val: string) => {
  const regex = /^[\u0600-\u06FF\s]+$/;
  if (regex.test(val)) return true;
  return "فقط حروف فارسی مجاز است";
};
export const isOnlyNumber = (val: string) => {
  const regex = /^\d+$/;
  if (regex.test(val)) return true;
  return "فقط عدد است";
};

export const isOnlyNumberPersian = (val: string) => {
  const regex = /^[\u0600-\u06FF\s0-9]+$/;
  if (regex.test(val)) return true;
  return "فقط حروف فارسی و عدد وارد کنید";
};
