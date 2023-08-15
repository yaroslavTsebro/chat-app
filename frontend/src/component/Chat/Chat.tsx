import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSettings } from "../../hooks/use-settings";
import { useCookies } from "react-cookie";
import { RouterProvider, useNavigate } from "react-router-dom";
import { refresh } from "../../http/user-api";
import { AuthResponse } from "../../entity/response/user/auth-response";
import { UserContext } from "../../context/user-context";
import { AppError } from "../../entity/response/app-error";
import { LocalUser } from "../../entity/model/local-user";
import { router } from "../../route/routes";

const Chat: React.FC = () => {
  const [cookie, setCookie, removeCookie] = useCookies<string>([
    "chat_refreshToken",
  ]);
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!cookie) {
        navigate("/login");
        return;
      }

      refresh().then((response) => {
        if (response instanceof AppError) {
          throw response;
        }

        console.log(response);
      });
    } catch (e) {}
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Chat;
