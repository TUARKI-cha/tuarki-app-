import { Server } from "socket.io";

let io: any;

export async function GET() {

  if (!io) {

    io = new Server(3001, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {

      console.log("usuario conectado");

      socket.on("join-room", (roomId) => {

        socket.join(roomId);

        socket.to(roomId).emit(
          "user-connected"
        );

      });

      socket.on("offer", (data) => {

        socket.to(data.roomId).emit(
          "offer",
          data.offer
        );

      });

      socket.on("answer", (data) => {

        socket.to(data.roomId).emit(
          "answer",
          data.answer
        );

      });

      socket.on("ice-candidate", (data) => {

        socket.to(data.roomId).emit(
          "ice-candidate",
          data.candidate
        );

      });

    });

  }

  return Response.json({
    success: true,
  });

}