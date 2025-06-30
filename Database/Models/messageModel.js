import mongoose from "mongoose";
const table = mongoose.Schema({
    messageText: {
        type: String
    },
    receiverId: {
        type: mongoose.Types.ObjectId
    }
}, { timestamps: true });


export const messageModel = mongoose.model('messages', table);