import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  setToken: () => {}
})

export const MsgContext = createContext({
  msg: null,
  setMsg: () => {}
})