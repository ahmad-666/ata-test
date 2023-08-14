import { useMemo } from "react";
import type { User } from "../../types/user";
type UserDetailsProps = User;
export default function UserDetails({
  fname,
  lname,
  mobile,
  email,
  ssn,
  address,
  imgSrc,
}: UserDetailsProps) {
  const items = useMemo(() => {
    return [
      {
        title: "نام",
        value: fname,
      },
      {
        title: "نام خانوادگی",
        value: lname,
      },
      {
        title: "موبایل",
        value: mobile,
      },
      {
        title: "ایمیل",
        value: email,
      },
      {
        title: "شماره ملی",
        value: ssn,
      },
      {
        title: "آدرس",
        value: address,
      },
    ];
  }, [address, email, fname, lname, mobile, ssn]);
  return (
    <div>
      <div className="flex wrap">
        {items.map((item) => (
          <div key={item.title} className="grid-col cols-12 cols-md-6">
            <p className="slate--text text-bold text-sm">{item.title}</p>
            <p className="mt-md">{item.value}</p>
          </div>
        ))}
        <div className="grid-col cols-12 cols-md-6">
          <p className="slate--text text-bold text-sm">تصویر</p>
          <img
            className="mt-md rounded"
            style={{ maxWidth: "200px" }}
            src={imgSrc}
            alt={imgSrc}
          />
        </div>
      </div>
    </div>
  );
}
