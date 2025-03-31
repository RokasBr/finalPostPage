import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export const loginUser = (username) => {
    socket.emit("login", username);
};

export const sendMessage = (sender, receiver, message) => {
    socket.emit("sendMessage", { sender, receiver, message });
};

export const onNewMessage = (callback) => {
    socket.on("newMessage", callback);
};

export default socket;
