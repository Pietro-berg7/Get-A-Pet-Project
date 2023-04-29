import { createContext } from "react";

import { useAuth } from "../hooks/useAuth";
import { IUser } from "../interfaces/IUser";

interface IUserContext {
  register: (user: IUser) => Promise<void>;
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
});

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const { register } = useAuth();

  return <Context.Provider value={{ register }}>{children}</Context.Provider>;
}

export { Context, UserProvider };
