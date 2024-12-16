import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";

const PostModel = mongoose.model("Post", postSchema);

export default class PostRepository{

    async getall(){
        try{
            const resp = await PostModel.find();
            return resp;
        }catch(err){
            throw err;
        }
    }

    async getByPid(pid){
        try{
            const resp = await PostModel.findById(pid);
            return resp;
        }catch(err){
            throw err;
        }
    }

    async getByUid(uid){
        try{
            const resp = await PostModel.find({user: uid});
            return resp;
        }catch(err){
            throw err;
        }
    }

    async add(post){
        try {
            const newPost = new PostModel(post);
            const resp = await newPost.save();
            return resp;
        } catch (err) {
            throw err;
        }
    }


    async update(uid, pid, post) {
        try {
            let updatedPost = await PostModel.findById(pid);
            console.log(updatedPost);
            if (updatedPost.user != uid) throw new Error("Unauthorized");
            if (post.caption) updatedPost.caption = post.caption;
            if (post.imageUrl) updatedPost.imageUrl = post.imageUrl;
            const resp = await updatedPost.save();
            return resp;
        } catch (err) {
            throw err;
        }
    }
    
    async delete(pid, uid) {
        try {
            let deletedPost = await PostModel.findById(pid);
            if (deletedPost.user != uid) throw new Error("Unauthorized");
            await PostModel.findByIdAndDelete(pid);
            return deletedPost;
        } catch (err) {
            throw err;
        }
    }
}