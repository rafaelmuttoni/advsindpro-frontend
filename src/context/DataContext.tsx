import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import api from "src/services/api";
import { useAlert } from "./AlertContext";
import { useAuth } from "./AuthContext";

interface DataProviderProps {
  children: ReactNode;
}

interface DataProps {
  condos: [];
  indices: [];
  providers: [];
  services: [];
  events: [];
  residents: [];
  debts: [];
}

type UpdateDataFn = (method: string, payload: any) => void;

interface DataContextData {
  condo: string;
  data: DataProps | null;
  updateData: UpdateDataFn;
  loading: boolean;
}

const DataContext = createContext({} as DataContextData);

export const useData = () => {
  const context = useContext(DataContext);

  return context;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const { user, loading } = useAuth();
  const { alert } = useAlert();

  const [data, setData] = useState<DataProps | null>(null);
  const [condo, setCondo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("condos");
        setData(data);
      } catch (err) {
        alert("Ocorreu um erro na sua requisição", "error");
      }
    };

    user && fetchData();
  }, [user]);

  const updateData: UpdateDataFn = (method, payload) => {};

  return (
    <DataContext.Provider
      value={{
        condo,
        data,
        updateData,

        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
