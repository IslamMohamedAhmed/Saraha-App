import { messageModel } from "../../../Database/Models/messageModel.js";
import { userModel } from "../../../Database/Models/userModel.js";



const addMessage = async (req, res) => {
    const user = await userModel.findOne({ _id: req.body.receiverId });
    if (user) {
        await messageModel.insertMany(req.body);
        return res.json({ message: "message was sent successfully" });
    }

    return res.json({ message: "user is invalid!!" });

};


const getAllMessages = async (req, res) => {
    
    const messages = await messageModel.find({ receiverId: req.userId });
    
    res.json({ message: "success", messages });
};


export {
    addMessage,
    getAllMessages
};