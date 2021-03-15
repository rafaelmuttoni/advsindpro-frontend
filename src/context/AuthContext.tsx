import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as auth from "src/services/auth";
import api from "src/services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}

type LoginFn = (identifier: string, password: string) => void;

interface AuthContextData {
  user: UserProps | null;
  signed: boolean;
  login: LoginFn;
  logout: () => void;
  loading: boolean;
  error: string | boolean;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signed = !!user;

  useEffect(() => {
    const loadStorageData = async (token: string) => {
      setLoading(true);
      try {
        const { data } = await auth.verifyToken(token);
        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("userToken", data.refreshToken);
        // set user in state
        const response = await api.get("/users");
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        localStorage.removeItem("userToken");
        return;
      }
    };

    const refreshToken = localStorage.getItem("userToken");
    if (refreshToken) {
      loadStorageData(refreshToken);
    }
  }, []);

  const login: LoginFn = async (identifier, password) => {
    setLoading(true);
    try {
      const { data } = await auth.login(identifier, password);
      // add token to api requests and to localstorage
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("userToken", data.refreshToken);
      // set user in state
      const response = await api.get("/users");
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    delete api.defaults.headers["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
