import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

export default Client;
