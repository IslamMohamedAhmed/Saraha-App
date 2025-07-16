import mongoose from "mongoose";


export async function connectDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/SarahaApp');
        console.log('connection is successful!');
    }
    catch (err) {
        console.log(err);
    }
}
