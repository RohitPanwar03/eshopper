import mongoose from "mongoose";

export const ConnDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Database successfully")
    }
    catch (error) {
        console.log("Error while connecting to database")
        console.log(error)
    }
}