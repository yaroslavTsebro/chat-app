import {Socket} from "socket.io";

export default (socket: Socket) => {
  socket.on('user/connect', async (userId :string) => {
    // await handleUserConnect(socket, userId);
  });

  socket.on('disconnect', async () => {
    // await handleDisconnect(socket);
  });

  socket.on('user/disconnect', async () => {
    // await handleUserDisconnect(socket);
  });
};
