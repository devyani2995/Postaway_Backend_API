import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import loggerMiddleware from "./src/middleware/logger.middleware.js";
import {errorHandlerMiddleware} from "./src/middleware/errorhandler.middleware.js";
import { invalidRouterMiddleware } from "./src/middleware/invalidroutes.middleware.js";

import UserRouter from "./src/features/user/user.routes.js";
import PostRouter from "./src/features/post/post.routes.js";
import CommentRouter from "./src/features/comment/comment.routes.js";
import LikeRouter from "./src/features/like/like.routes.js";
import FriendRouter from "./src/features/friendship/friendship.routes.js"

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(loggerMiddleware);

app.use('/api/users', UserRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter);
app.use('/api/likes', LikeRouter);
app.use('/api/friends', FriendRouter);

app.use(invalidRouterMiddleware);
app.use(errorHandlerMiddleware);

export default app;
