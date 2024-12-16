import express from "express";
import FriendshipController from "./friendship.controller.js";
import jwtAuth from "../../middleware/jwtauth.middleware.js";

const friendshipController = new FriendshipController();
const router = express.Router();

//router.use(jwtAuth);

// Friendship routes
router.get('/get-friends/:userId', (req, res) => {
  friendshipController.getFriends(req, res);
});
router.get('/get-pending-requests/:userId', (req, res) => {
  friendshipController.getPendingRequests(req, res);
});
router.post('/toggle-friendship/:userId', (req, res) => {
  friendshipController.toggleFriendship(req, res);
});
router.post('/response-to-request/:userId', (req, res) => {
  friendshipController.responseToRequest(req, res);
});

export default router;