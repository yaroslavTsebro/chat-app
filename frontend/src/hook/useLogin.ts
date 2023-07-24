import axios from "axios";
import { setMaster, setSetting } from "../redux/slice/user";
import { useEffect, useState } from "react";
import { refresh } from "../http/user-api";
import { useDispatch, useSelector } from "react-redux";
import socket from "../helper/socket";
import { getSettings } from "../http/settings-api";
import { config } from "../config/config";
import { RootState } from "../redux/store";
import { User } from "../entity/model/user";

function getCookie(key: string): string | undefined {
  let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

const useLogin = () => {
  const dispatch = useDispatch();

  const [inactive, setInactive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const refreshToken = getCookie("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const { master } = useSelector((state: RootState) => state.user);

  const handleGetMaster = async (signal: AbortSignal) => {
    try {
      if (refreshToken && accessToken) {
        axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

        const setting = await getSettings();

        if (setting) {
          dispatch(setSetting(setting));

          const loginResponse = await refresh();

          dispatch(setMaster(loginResponse.user));
          socket.emit("user/connect", loginResponse.user._id);
        }

        setLoaded(true);
      } else {
        setTimeout(() => setLoaded(true), 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    // set default base url
    axios.defaults.baseURL = config.isDev
      ? "http://localhost:8080/api"
      : "/api";
    handleGetMaster(abortCtrl.signal);

    socket.on("user/inactivate", () => {
      setInactive(true);
      dispatch(setMaster(new User()));
    });

    return () => {
      abortCtrl.abort();
      socket.off("user/inactivate");
    };
  }, []);

  useEffect(() => {
    document.onvisibilitychange = (e: Event) => {
      const doc = e.target as Document; // Explicitly cast 'e.target' to the 'Document' type
      if (master) {
        const active = doc.visibilityState === "visible";
        socket.emit(active ? "user/connect" : "user/disconnect", master._id);
      }
    };
  }, [!!master]);
};
