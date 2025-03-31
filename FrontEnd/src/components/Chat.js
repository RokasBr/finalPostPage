import React, { useState, useEffect } from "react";
import socket, { sendMessage, onNewMessage } from "../socket";

const Chat = ({ user, receiver }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        onNewMessage((message) => {
            setMessages((prev) => [...prev, message]);
        });
    }, []);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const messageData = { sender: user.username, receiver, message: newMessage };
        sendMessage(user.username, receiver, newMessage);
        setMessages((prev) => [...prev, messageData]); // Optimistic UI update
        setNewMessage("");
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === user.username ? "my-message" : "their-message"}>
                        <strong>{msg.sender}: </strong>{msg.message}
                    </div>
                ))}
            </div>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
