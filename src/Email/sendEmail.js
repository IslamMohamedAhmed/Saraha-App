import { createTransport } from "nodemailer";
import jwt from 'jsonwebtoken';
import { createTemplate } from "./emailTemplate.js";
// Create a test account or replace with real credentials.
export const sendEmail = async (email) => {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: "islamqodeara21@gmail.com",
            pass: "ffvuilhbajqnmjli",
        },
    });

    let token = jwt.sign({ email }, "IssoQodearaFullStack");

    (async () => {
        const info = await transporter.sendMail({
            from: '"Saraha App Verification" <islamqodeara21@gmail.com>',
            to: email,
            subject: "Hello ✔",
            html: createTemplate(token), // plain‑text body
        });

        console.log("Message sent:", info.messageId);
    })();
}