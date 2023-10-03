module.exports = (io, socket, users) => {
  socket.on("outgoing-call", (payload) => {
    const { caller, recipient, data } = payload;
    console.log(payload);
    const room = users[recipient?.email];
    if (room) {
      socket.broadcast.to(room).emit("incoming-call", {
        from: {
          name: caller?.name,
          email: caller?.email,
          avatar: caller?.avatar,
        },
        signal: data,
      });
    } else {
      socket.emit("user-offline", { recipient });
    }
  });

  socket.on("answer", (payload) => {
    const room = users[payload?.caller?.email];
    if (room) {
      console.log(payload);
      socket.broadcast.to(room).emit("gotAnswer", payload?.signal);
    } else {
      socket.emit("user-offline", { payload });
    }
  });
};
