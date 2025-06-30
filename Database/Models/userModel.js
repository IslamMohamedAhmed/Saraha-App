import mongoose from "mongoose";
const table = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number,
        min: [10, "you are too young to create an account"],
        max: [80, "you are too old to create an account"]
    },
    roles: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    verifyEmail: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


export const userModel = mongoose.model('users', table);