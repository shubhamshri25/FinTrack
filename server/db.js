import mongoose from "mongoose";

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");
    } catch (error) {
        console.log("Connection error", error);
    }
}

export default connectDb;