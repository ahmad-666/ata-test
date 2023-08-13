import styles from "./userData.module.css";
type UserDataProps = {
  fname: string;
  lname: string;
  ssn: string;
  email: string;
  mobile: string;
  address: string;
  img: string;
};

export default function UserData({
  fname,
  lname,
  ssn,
  email,
  mobile,
  address,
  img,
}: UserDataProps) {
  return (
    <tr>
      <td>{fname}</td>
      <td>{lname}</td>
      <td>{ssn}</td>
      <td>{email}</td>
      <td>{mobile}</td>
      <td>{address}</td>
      <td>
        <img src={img} alt={`${fname}-${lname}`} className={styles.img} />
      </td>
    </tr>
  );
}
