import React, { useEffect, useState } from "react";
import http from "../plugins/https";
import Message from "../components/Message";
import Toolbar from "../components/Toolbar";

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("Messages page loaded");
        const fetchMessages = async () => {
            try {
                const data = await http.get("http://localhost:2002/messages");
                console.log('Fetched messages:', data);
                if (data.success) {
                    setMessages(data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    // Function to delete a message
    const deleteMessage = async (messageId) => {
        try {
            await http.post(`http://localhost:2002/messages/delete`, { messageId });
            setMessages(messages.filter((msg) => msg._id !== messageId));
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    // Function to send a reply
    const sendReply = async (recipientId, text) => {
        try {
            const response = await http.post("http://localhost:2002/messages/send", {
                recipient: recipientId,
                text,
            });
            if (response.success) {
                alert("Reply sent successfully!");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    return (
        <div>
            <Toolbar />
            <h2>Messages</h2>
            {messages.length > 0 ? (
                messages.map((msg) => (
                    <Message key={msg._id} message={msg} onDelete={deleteMessage} onReply={sendReply} />
                ))
            ) : (
                <p>No messages found</p>
            )}
        </div>
    );
};

export default MessagesPage;
