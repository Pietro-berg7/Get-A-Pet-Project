import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IUser } from "../interfaces/IUser";
import useFlashMessage from "./useFlashMessage";

interface IUseAuth {
  authenticated: boolean;
  register: (user: IUser) => Promise<void>;
}

interface authUserData {
  message: string;
  token: string;
  userId: string;
}

export function useAuth(): IUseAuth {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user: IUser): Promise<void> {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data: authUserData = await api
        .post("/users/register", user)
        .then((response) => {
          return response.data;
        });

      await authUser(data);
    } catch (error: any) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data: authUserData): Promise<void> {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/");
  }

  return { authenticated, register };
}
