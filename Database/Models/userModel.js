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
    },
    profilePictureName: {
        type: String,
        default: ""
    }
}, { timestamps: true });

table.post('init',(doc)=>{
if(doc.profilePictureName){
    doc.profilePictureName = process.env.BASE_URL + doc.profilePictureName;
}
});

export const userModel = mongoose.model('users', table);