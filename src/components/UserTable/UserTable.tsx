import DataTable from "../DataTable/DataTable";
import type { User } from "../../types/user";
import { useCallback, useEffect, useMemo, useState } from "react";
import UserForm from "../UserForm/UserForm";
import UserDetails from "../UserDetails/UserDetails";
import Dialog from "../Dialog/Dialog";
import Snackbar from "../Snackbar/Snackbar";
import InputField from "../InputField/InputField";
import useForm from "../../hooks/useForm";
export default function UserTable() {
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [page, setPage] = useState(1);
  const { values, onSubmit, onChange } = useForm({
    initVals: {
      fname: "",
      lname: "",
      ssn: "",
      email: "",
      mobile: "",
      address: "",
    },
  });
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      fname: "نام",
      lname: "نام",
      address: "مشهد",
      email: "a@g.co",
      mobile: "09158912938",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 2,
      fname: "نام دو",
      lname: "نام خانوادگی دو",
      address: "تهران",
      email: "ab@g.co",
      mobile: "09158912930",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 3,
      fname: "نام",
      lname: "نام",
      address: "مشهد",
      email: "a@g.co",
      mobile: "09158912938",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 4,
      fname: "نام دو",
      lname: "نام خانوادگی دو",
      address: "تهران",
      email: "ab@g.co",
      mobile: "09158912930",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 5,
      fname: "نام",
      lname: "نام",
      address: "مشهد",
      email: "a@g.co",
      mobile: "09158912938",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 6,
      fname: "نام دو",
      lname: "نام خانوادگی دو",
      address: "تهران",
      email: "ab@g.co",
      mobile: "09158912930",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 7,
      fname: "نام",
      lname: "نام",
      address: "مشهد",
      email: "a@g.co",
      mobile: "09158912938",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 8,
      fname: "نام دو",
      lname: "نام خانوادگی دو",
      address: "تهران",
      email: "ab@g.co",
      mobile: "09158912930",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 9,
      fname: "نام",
      lname: "نام",
      address: "مشهد",
      email: "a@g.co",
      mobile: "09158912938",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
    {
      id: 10,
      fname: "نام دو",
      lname: "نام خانوادگی دو",
      address: "تهران",
      email: "ab@g.co",
      mobile: "09158912930",
      ssn: "0922569746",
      imgSrc: "/avatar.png",
    },
  ]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<null | User>(null);
  const columns = useMemo(() => {
    return [
      {
        label: "نام",
        value: "fname",
      },
      {
        label: "نام خانوادگی",
        value: "lname",
      },
      {
        label: "موبایل",
        value: "mobile",
      },
      {
        label: "ایمیل",
        value: "email",
      },
      {
        label: "شماره ملی",
        value: "ssn",
      },
      {
        label: "آدرس",
        value: "address",
        minWidth: 200,
      },

      {
        label: "عکس",
        value: "imgSrc",
        render: ({ value }: { value: string }) => {
          return (
            <img
              src={value}
              alt={value}
              className="rounded"
              style={{
                maxWidth: "100px",
              }}
            />
          );
        },
      },
      {
        label: "عملیات",
        value: "actions",
        render: (data: any, row: any) => {
          return (
            <div className="flex wrap gap-sm">
              <button
                className="rounded primary white--text text-xs p-sm"
                onClick={() => {
                  setActiveUser(row);
                  setDetailsDialog(true);
                }}
              >
                مشاهده جزییات
              </button>
              <button
                className="rounded secondary white--text text-xs p-sm"
                onClick={() => {
                  setActiveUser(row);
                  setEditDialog(true);
                }}
              >
                ویرایش
              </button>
              <button
                className="rounded error white--text text-xs p-sm"
                onClick={() => {
                  setActiveUser(row);
                  setDeleteDialog(true);
                }}
              >
                حذف
              </button>
            </div>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);
  const deleteUser = useCallback(() => {
    setUsers((old) => old.filter((u) => u.id !== activeUser?.id));
    setActiveUser(null);
    setDeleteDialog(false);
  }, [activeUser]);
  const addNewUser = useCallback((newUser: User) => {
    setUsers((old) => [newUser, ...old]);
    setAddDialog(false);
  }, []);
  const editUser = useCallback((editedUser: User) => {
    setUsers((old) => {
      return old.map((user) => {
        if (user.id !== editedUser.id) return user;
        return editedUser;
      });
    });
    setEditDialog(false);
  }, []);
  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      onSubmit(e);
      const filteredUsers = users.filter((user) => {
        return (
          user.fname.includes(values.fname) &&
          user.lname.includes(values.lname) &&
          user.mobile.includes(values.mobile) &&
          user.email.includes(values.email) &&
          user.ssn.includes(values.ssn) &&
          user.address.includes(values.address)
        );
      });
      setFilteredUsers(filteredUsers);
      setPage(1);
    },
    [onSubmit, users, values]
  );
  return (
    <div>
      <form noValidate onSubmit={submitHandler} className="mt-xl">
        <h1 className="slate-dark2--text text-bold text-lg">جست و جو</h1>
        <div className="flex wrap mt-lg">
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="fname"
              label="نام"
              value={values.fname}
              setValue={onChange}
            />
          </div>
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="lname"
              label="نام خانوادگی"
              value={values.lname}
              setValue={onChange}
            />
          </div>
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="ssn"
              label="شماره ملی"
              value={values.ssn}
              setValue={onChange}
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
            />
          </div>
          <div className="grid-col cols-12 cols-sm-6 cols-lg-4">
            <InputField
              name="mobile"
              label="موبایل"
              type="tel"
              value={values.mobile}
              setValue={onChange}
            />
          </div>
          <div className="grid-col cols-12">
            <InputField
              name="address"
              label="آدرس"
              value={values.address}
              setValue={onChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded mt-lg mx-auto block primary py-md px-lg white--text text-md"
        >
          جست و جو
        </button>
      </form>
      <button
        className="rounded secondary white--text text-sm py-md px-lg mt-xl"
        onClick={() => setAddDialog(true)}
      >
        افزودن کارمند جدید
      </button>
      <DataTable
        columns={columns}
        rows={filteredUsers}
        className="mt-xl"
        page={page}
        setPage={setPage}
        pageSize={3}
      />
      {activeUser && (
        <Dialog
          show={detailsDialog}
          setShow={setDetailsDialog}
          title="جزییات کارمند"
        >
          <UserDetails
            id={activeUser.id}
            fname={activeUser?.fname}
            lname={activeUser?.lname}
            imgSrc={activeUser?.imgSrc}
            ssn={activeUser?.ssn}
            mobile={activeUser?.mobile}
            email={activeUser?.email}
            address={activeUser?.address}
          />
        </Dialog>
      )}
      <Dialog show={addDialog} setShow={setAddDialog} title="افزودن کارمند">
        <UserForm mode="add" onAdd={addNewUser} />
      </Dialog>
      <Dialog show={editDialog} setShow={setEditDialog} title="ویرایش کارمند">
        <UserForm mode="edit" editUser={activeUser!} onEdit={editUser} />
      </Dialog>
      <Dialog show={deleteDialog} setShow={setDeleteDialog} title="حذف کارمند">
        <div>
          <p className="text-sm slate-dark2--text">
            آیا مطمئن هستید که میخواهید مورد انتخابی را حذف کنید ؟
          </p>
          <button
            className="rounded mt-lg mx-auto block error white--text text-sm py-sm px-lg"
            onClick={deleteUser}
          >
            حذف کارمند
          </button>
        </div>
      </Dialog>
      <Snackbar show={showSnackbar} setShow={setShowSnackbar} type="success">
        <p className="text-sm white--text">تغییرات با موفقیت اعمال شد</p>
      </Snackbar>
    </div>
  );
}
