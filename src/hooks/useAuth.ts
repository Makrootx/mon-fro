/* eslint-disable no-useless-catch */
import { useState } from "react";
import { api } from "../api";

export const useAuth = () => {
  const [user, setUser] = useState<null | { username: string }>(null);

  const login = async (email: string, password: string) => {
    try {
      const { accessToken } = await api.login({ email, password });
      localStorage.setItem("jwt", accessToken);
      console.log(localStorage.getItem("jwt"));
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { accessToken, user } = await api.register({
        name: username,
        email,
        password,
      });
      localStorage.setItem("jwt", accessToken);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return { user, login, register, logout };
};
