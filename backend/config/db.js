import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.info("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);

        throw err;
    }
};

export default connectDB;
