import React, { useState } from 'react';

const Message = ({ message, onDelete, onReply }) => {
    const [reply, setReply] = useState('');

    const handleReply = () => {
        if (reply.trim() === '') return alert("Reply cannot be empty!");
        onReply(message.sender._id, reply); // Send reply to backend
        setReply('');
    };

    return (
        <div className="message">
            <div className="message-header">
                <span><strong>From:</strong> {message.sender?.username || "Unknown"}</span>
                <div className="message-date-delete">
                    <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                    <button onClick={() => onDelete(message._id)} className="delete-btn">Delete</button>
                </div>
            </div>
            <p className="message-text">{message.text}</p>
            <div className="reply-section">
                <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                />
                <button onClick={handleReply} className="reply-btn">Reply</button>
            </div>
        </div>
    );
};

export default Message;
