import FriendshipRepository from "./friendship.repo.js";

const friendshipRepo = new FriendshipRepository();

export default class FriendshipController {
  async getFriends(req, res) {
    try {
      const { userId } = req.params;
      const friends = await friendshipRepo.getFriends(userId);
      res.status(200).send(friends);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server-side error");
    }
  }

  async getPendingRequests(req, res) {
    try {
      const { userId } = req.params;
      const pendingRequests = await friendshipRepo.getPendingRequests(userId);
      res.status(200).send(pendingRequests);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server-side error");
    }
  }

  async toggleFriendship(req, res) {
    try {
      const { userId } = req.params;
      const { friendId } = req.body;
      await friendshipRepo.toggleFriendship(userId, friendId);
      res.status(200).send("Friendship toggled successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Server-side error");
    }
  }

  async responseToRequest(req, res) {
    try {
      const { userId } = req.params;
      const { friendId, status } = req.body;
      await friendshipRepo.responseToRequest(friendId, userId, status);
      res.status(200).send("Friend request responded successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Server-side error");
    }
  }
}