import { userModel } from "../../../Database/Models/userModel.js";
import { sendEmail } from "../../Email/sendEmail.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { catchError } from "../../middlewares/catchError.js";
import { appError } from "../../utils/appError.js";
import { Model } from "mongoose";

const signup = catchError(async (req, res) => {
    req.body.profilePictureName = req.file.filename;
    await userModel.create(req.body);
    sendEmail(req.body.email);
    res.json({ message: 'success' });
});

const verify = catchError(async (req, res, next) => {
    jwt.verify(req.params.token, process.env.JWT_KEY_SIGNUP, async (err, decoded) => {
        if (err) return next(new appError(err, 401));
        await userModel.findOneAndUpdate({ email: decoded.email }, { verifyEmail: true });
        res.json({ message: "Verification Succeeded" });
    });
});

const signin = catchError(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
        const match = bcrypt.compareSync(req.body.password, user.password);
        if (match && user.verifyEmail) {
            let token = jwt.sign({ userId: user._id, email: user.email, roles: user.roles }, "Full");
            return res.json({ message: "Sign in Succeeded!!", token });
        }
    }
    return next(new appError("Email or password are incorrect!!", 401));
});

const requestResetPassword = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id);
    if (user) {
        let token = jwt.sign({ userId: req.params.id, userEmail: user.email }, process.env.JWT_KEY_RESET_PASSWORD, { expiresIn: "30m" });
        res.json({ token });
    }
    else {
        next(new appError("user is not found!!", 404));
    }



});

const resetPassword = catchError(async (req, res, next) => {
    jwt.verify(req.params.token, process.env.JWT_KEY_RESET_PASSWORD, async (err, decoded) => {
        if (err) return next(new appError(err, 401));
        await userModel.findOneAndUpdate({ email: decoded.userEmail }, { password: req.body.password });
        res.json({ message: "Password was updated successfully" });
    });
});
export {
    signup,
    verify,
    signin,
    requestResetPassword,
    resetPassword
}