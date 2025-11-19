import mongoose from "mongoose";


export async function connectDb() {
    try {
        await mongoose.connect('mongodb+srv://NanoRules:ZTFj54G78jusruu@cluster0.uk9amxm.mongodb.net/SarahaApp');
        console.log('connection is successful!');
    }
    catch (err) {
        console.log(err);
    }
}
