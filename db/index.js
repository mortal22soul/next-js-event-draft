import mongoose from "mongoose";

const connection = {}

export async function connect() {
    if (connection.isConnected) {
        console.log("Already connnected to DB");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || "")
        
        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log("DB Connection Failed" , error);
        
        process.exit(1)
    }
}