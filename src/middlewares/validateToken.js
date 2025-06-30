import jwt from 'jsonwebtoken';


export const validateToken = async (req, res, next) => {
    let token = req.header('token');
    jwt.verify(token, "Full", (err, decoded) => {
        if (err) return res.json({ message: "error", err });

        req.userId = decoded.userId;

    });
    next();
}



