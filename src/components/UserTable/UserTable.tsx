import DataTable from "../DataTable/DataTable";
import type { User } from "../../types/user";
import { useCallback, useMemo, useState } from "react";
import UserForm from "../UserForm/UserForm";
import UserDetails from "../UserDetails/UserDetails";
import Dialog from "../Dialog/Dialog";
import Snackbar from "../Snackbar/Snackbar";
import InputField from "../InputField/InputField";
import Pagination from "../Pagination/Pagination";

export default function UserTable() {
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
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
  ]);
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
  const deleteUser = useCallback(() => {
    setUsers((old) => old.filter((u) => u.id !== activeUser?.id));
    setActiveUser(null);
    setDeleteDialog(false);
  }, [activeUser]);
  const addNewUser = useCallback((newUser: User) => {
    setUsers((old) => [...old, newUser]);
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
  return (
    <div>
      <button
        className="rounded primary white--text text-sm py-md px-lg"
        onClick={() => setAddDialog(true)}
      >
        افزودن کارمند جدید
      </button>
      <DataTable columns={columns} rows={users} className="mt-xl" />
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
