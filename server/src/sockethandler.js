// socketHandlers.js
export const handleSocketConnection = (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    console.log(`User ${userId} connected and joined their room.`);
    socket.join(userId); // Join a room with the user's ID
  }

  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected.`);
  });
};
