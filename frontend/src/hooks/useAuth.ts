import api from "../utils/api";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { IUser } from "../interfaces/IUser";
import useFlashMessage from "./useFlashMessage";

interface IUseAuth {
  register: (user: IUser) => Promise<void>;
}

export function useAuth(): IUseAuth {
  const { setFlashMessage } = useFlashMessage();

  async function register(user: IUser): Promise<void> {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      console.log(data);
    } catch (error: any) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  return { register };
}
