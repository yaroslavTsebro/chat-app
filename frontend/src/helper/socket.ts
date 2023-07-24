import { io } from "socket.io-client";

const isProd = process.env.NODE_ENV === "production";

const socket = io(isProd ? "/" : "ws://localhost:8080");
export default socket;
