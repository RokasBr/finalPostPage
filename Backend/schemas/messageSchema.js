const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
