import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import PostRepository from "../post/post.repo.js";

const CommentModel = mongoose.model("Comment", commentSchema);



export default class CommentRepository {
    async getall() {
        try {
            const comments = await CommentModel.find();
            return comments;
        } catch (err) {
            throw err;
        }
    }

    async getByPostId(postId) {
        try {
            const comments = await CommentModel.find({ postId });
            return comments;
        } catch (err) {
            throw err;
        }
    }

    async add(comment) {
        try {
            const newComment = new CommentModel(comment);
            const result = await newComment.save();
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateComment(uid, cid, content) {
        try {
            const auth = await this.authenticateUser(uid, cid);
            if(!auth)
                throw new Error("Unauthorized");
            const comment = await CommentModel.findById(cid);
            comment.content = content;
            const updatedComment = await comment.save();
            return updatedComment;
        } catch (err) {
            throw err;
        }
    }

    async deleteComment(uid, cid) {
        try {
            const auth = await this.authenticateUser(uid, cid);
            if(!auth) throw new Error ("Unauthorised");
            const result = await CommentModel.findById(cid);
            if (!result) throw new Error("Comment not found");
            const resp = await result.remove();
            return resp;
        } catch (err) {
            throw err;
        }
    }


    //authenticates user for udpate and delete operations on comment
    async authenticateUser(uid, cid){
        const postRepo = new PostRepository();
        try{
            const comment = await CommentModel.findById(cid);
            if(!comment) throw new Error ("Comment Not Found");
            if(comment.userId.toString() == uid.toString()) return true;
            const post = await postRepo.getByPid(comment.postId);
            if(post.user.toString() == uid.toString()) return true;
            return false;
        }catch(err){
            throw err;
        }
    }
}