const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const { credential } = require("firebase-admin");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log(`Connected user id: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if (userId !== 'undefined') userSocketMap[userId] = socket.id; 

    // send to all users list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`Disconnected user id: ${socket.id}`);

        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

// return socketId of user
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

module.exports = { app, io, server, getReceiverSocketId }