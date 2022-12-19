import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  password: string;
}

interface UserProviderProps {
  children: ReactNode;
}


interface UserContextData {
  users: User[];
  refresh: boolean;
  setRefresh: (value: boolean) => void;
  isLoading: boolean;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((response) => {
      setUsers(response.data);
      setIsLoading(true);
    });
  }, [refresh]);

  return (
    <UserContext.Provider value={{ users, refresh, setRefresh, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
