"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }

  }, []);

  useEffect(() => {

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser harus berada di dalam UserProvider");
  }

  return context;

}