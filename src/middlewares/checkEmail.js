import { userModel } from "../../Database/Models/userModel.js";

export const checkEmail = async (req, res, next) => {

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
        return res.json({ message: "email already exists!" });
    }

    next();
}; 





