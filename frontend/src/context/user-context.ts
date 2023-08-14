import { createContext } from "react";
import { LocalUser } from "../entity/model/local-user";

export const UserContext = createContext<
  [
    LocalUser,
    (refreshAvatar?: boolean) => Promise<void>,
    React.Dispatch<string>,
    () => Promise<void>,
    boolean,
  ]
>(null as any);
