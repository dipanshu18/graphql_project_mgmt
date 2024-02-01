import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

export default async function connectDB() {
  const connect = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    colors.cyan.underline(`DB connected: ${connect.connection.host}`)
  );
}
