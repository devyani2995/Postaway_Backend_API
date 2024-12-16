import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    required: true,
  },
}, { timestamps: true });

const FriendshipModel = mongoose.model("Friendship", friendshipSchema);

export default FriendshipModel;