import { io } from "socket.io-client";

const isProd = process.env.NODE_ENV === "production";

const socket = io(isProd ? "/" : "ws://localhost:5000");
export default socket;
