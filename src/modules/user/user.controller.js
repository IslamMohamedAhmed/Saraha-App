import { userModel } from "../../../Database/Models/userModel.js";
import { sendEmail } from "../../Email/sendEmail.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const signup = async (req, res) => {
    await userModel.create(req.body);
    sendEmail(req.body.email);
    res.json({ message: 'success' });
};

const verify = async (req, res) => {
    await jwt.verify(req.params.token, "IssoQodearaFullStack", async (err, decoded) => {
        if (err) return res.json(err);
        await userModel.findOneAndUpdate({ email: decoded.email }, { verifyEmail: true });
        res.json({ message: "verfication Succeeded" });
    });
};

const signin = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
        const match = bcrypt.compareSync(req.body.password, user.password);
        if (match && user.verifyEmail) {
            let token = jwt.sign({ userId: user._id, email: user.email, roles: user.roles }, "Full");
            return res.json({ message: "Sign in Succeeded!!", token });
        }
    }
    return res.json({ message: "Email or password are incorrect!!" });
};


export {
    signup,
    verify,
    signin
}