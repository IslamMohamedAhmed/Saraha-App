import { userModel } from "../../Database/Models/userModel.js";
import { appError } from "../utils/appError.js";

export const checkEmail = async (req, res, next) => {

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
        return next(new appError("email already exists!", 409));
    }

    next();
};





