import mongoose from "mongoose";

export async function dbConnect() {
    const DB_URL = process.env.DB_URL;
    try {
        await mongoose.connect(DB_URL, { dbName: "bookstore" });
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
