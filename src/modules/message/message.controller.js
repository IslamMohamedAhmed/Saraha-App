
import { messageModel } from "../../../Database/Models/messageModel.js";
import { userModel } from "../../../Database/Models/userModel.js";
import { catchError } from "../../middlewares/catchError.js";
import { appError } from "../../utils/appError.js";
import qrCode from 'qrcode';
const addMessage = catchError(async (req, res, next) => {
    const user = await userModel.findOne({ _id: req.body.receiverId });
    if (user) {
        await messageModel.insertMany(req.body);
        return res.json({ message: "message was sent successfully" });
    }

    return next(new appError("user is invalid!!", 400));
});


const getAllMessages = catchError(async (req, res) => {

    const messages = await messageModel.find({ receiverId: req.userId });

    res.json({ message: "success", messages });
});

const shareProfile = catchError(async (req, res, next) => {
    qrCode.toDataURL("http://localhost:3000/messages", (err, qr) => {
        if (err) {
            next(new appError(err, 500));
        }
        else {
            res.send(`<img src="${qr}"/>`);
        }
    });
});

export {
    addMessage,
    getAllMessages,
    shareProfile
};