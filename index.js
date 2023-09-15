const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 8000;

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

let message = [];


io.on("connection", (socket) => {
  console.log("a user connected : " + socket.id);
  socket.on("sendMessage", (newMessage) => {
    message.push(newMessage)
    console.log('isi message',message)
   io.emit("message", message)
 });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
