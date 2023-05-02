import { createContext } from "react";

import { useAuth } from "../hooks/useAuth";
import { IUser } from "../interfaces/IUser";

interface IUserContext {
  authenticated: boolean;
  register: (user: IUser) => Promise<void>;
  logout?: () => void;
}

const emptyUser: IUser = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmpassword: "",
};

const Context = createContext<IUserContext>({
  register: async () => {
    emptyUser;
  },
  authenticated: false,
});

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const { register, authenticated, logout } = useAuth();

  return (
    <Context.Provider value={{ authenticated, register, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
