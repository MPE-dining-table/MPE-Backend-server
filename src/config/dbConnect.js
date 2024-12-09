import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    console.log("connection established: ", connection.connection.host);
  } catch (error) {
    console.log("connection to the database failed: ", error);
    process.exit(1)
  }
};

export default dbConnect;
