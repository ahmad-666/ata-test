import { createContext, useCallback, useEffect, useState } from "react";
type AuthType = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
};
type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthContext = createContext<AuthType>({
  isAuth: false,
  login: () => {},
  logout: () => {},
});
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const login = useCallback(() => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  }, []);
  const logout = useCallback(() => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  }, []);
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth === "true") login();
    else logout();
  }, [login, logout]);
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
