import { createContext } from "react";

import { useAuth } from "../hooks/useAuth";
import { IUser } from "../interfaces/IUser";
import { ILogin } from "../interfaces/ILogin";

interface IUserContext {
  authenticated: boolean;
  register: (user: IUser) => Promise<void>;
  login: (user: ILogin) => Promise<void>;
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
  login: async () => {
    ("");
    ("");
  },
  authenticated: false,
});

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const { register, authenticated, login, logout } = useAuth();

  return (
    <Context.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
