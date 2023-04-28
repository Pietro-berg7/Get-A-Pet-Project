import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  user: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
}

export function useAuth() {
  async function register(user: User) {
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { register };
}
