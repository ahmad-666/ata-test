import { useCallback } from "react";
import UserTable from "../UserTable/UserTable";
import { useContext } from "react";
import { AuthContext } from "../../providers/Auth";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const logoutHandler = useCallback(() => {
    logout();
    navigate("/", { replace: true });
  }, [logout, navigate]);
  return (
    <div className="main-section py-xl">
      <div className="flex justify-end">
        <button
          className="error white--text rounded text-xs py-sm px-md"
          onClick={logoutHandler}
        >
          خارج شدن از حساب
        </button>
      </div>
      <div className="mt-xl">
        <UserTable />
      </div>
    </div>
  );
}
