const usersOnline = require("../modules/usersOnline");
const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Store the user when they log in
    socket.on("login", (username) => {
        usersOnline.addUser({ username, id: socket.id });
        io.emit("allUsers", usersOnline.getUsers());
    });

    // Handle sending messages
    socket.on("sendMessage", ({ sender, receiver, message }) => {
        const user = usersOnline.getUser(receiver);
        if (user) {
            io.to(user.id).emit("newMessage", { sender, message, time: Date.now() });
        }
    });

    socket.on("disconnect", () => {
        usersOnline.removeUser(socket.id);
    });
});

module.exports = io;
