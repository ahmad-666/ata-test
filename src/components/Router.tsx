import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import Dashboard from "./Dashboard/Dashboard";
import { AuthContext } from "../providers/Auth";
export default function Router() {
  const { isAuth } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={!isAuth ? <LoginForm /> : <Navigate replace to="/dashboard" />}
      />
      {/* {!isAuth && <Route path="/" element={<LoginForm />} />} */}
      {isAuth && <Route path="/dashboard" element={<Dashboard />} />}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
