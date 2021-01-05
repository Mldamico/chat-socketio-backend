const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", socket => {
      const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"]);
      if (!valido) {
        console.log("socket no identificado");
        return socket.disconnect();
      }
      console.log("cliente conectado", uid);
      socket.on("disconnect", () => {
        console.log("cliente desconectado");
      });
    });
  }
}

module.exports = Sockets;
