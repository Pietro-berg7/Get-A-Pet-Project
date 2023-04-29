import { createContext } from "react";

import { useAuth } from "../hooks/useAuth";
import IUser from "../interfaces/IUser";

const Context = createContext<IUser>({
  user: {
    name: "",
    email: "",
    phone: "",
    password: "",
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
