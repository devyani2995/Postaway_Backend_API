import FriendshipModel from "./friendship.schema.js";

export default class FriendshipRepository {
  async getFriends(userId) {
    try {
      const friends = await FriendshipModel.find({
        $or: [{ sender: userId }, { receiver: userId }],
        status: "accepted",
      }).populate("sender receiver", "name imageUrl");

      return friends;
    } catch (err) {
      throw err;
    }
  }

  async getPendingRequests(userId) {
    try {
      const pendingRequests = await FriendshipModel.find({
        receiver: userId,
        status: "pending",
      }).populate("sender", "name imageUrl");

      return pendingRequests;
    } catch (err) {
      throw err;
    }
  }

  async toggleFriendship(senderId, receiverId) {
    try {
      const existingFriendship = await FriendshipModel.findOne({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      });

      if (existingFriendship) {
        if (existingFriendship.status === "accepted") {
          await existingFriendship.remove();
        } else {
          existingFriendship.status = "accepted";
          await existingFriendship.save();
        }
      } else {
        const newFriendship = new FriendshipModel({
          sender: senderId,
          receiver: receiverId,
          status: "pending",
        });
        await newFriendship.save();
      }
    } catch (err) {
      throw err;
    }
  }

  async responseToRequest(senderId, receiverId, status) {
    try {
      const friendship = await FriendshipModel.findOne({
        sender: senderId,
        receiver: receiverId,
      });

      if (friendship) {
        friendship.status = status;
        await friendship.save();
      } else {
        throw new Error("Friend request not found");
      }
    } catch (err) {
      throw err;
    }
  }
}