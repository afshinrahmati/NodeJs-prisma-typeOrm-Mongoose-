import mongoose, { Schema } from "mongoose";

const userMongoos = new mongoose.Schema({
  //   _id: {
  //     type: Schema.Types.ObjectId,
  //   },
  firstName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
});

export const UserMongoose = mongoose.model("User", userMongoos);
