import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextValues>({
  isAuthenticated: false,
  isLoading: false,
  logout: () => {},
  login: () => {},
});

type AuthContextValues = {
  isLoading: boolean;
  isAuthenticated: boolean;
  login(): void;
  logout(): void;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const login = () => switchAuthTo(true);
  const logout = () => switchAuthTo(false);

  const switchAuthTo = (value: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setAuthenticated(value);
      setLoading(false);
    }, 2000);
  };

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
