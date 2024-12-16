import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { postSchema } from "../post/post.schema.js";

const LikeModel = mongoose.model("Like", likeSchema);
const PostModel = mongoose.model("Post", postSchema);

export default class LikeRepository{
    async getall(){
        try{
            const likes = await LikeModel.find();
            return likes;
        }catch(err){
            throw err;
        }
    }

    async getbyPCid(pcid) {
      try {
          const postLikes = await LikeModel.find({ likeable: pcid, on_model: 'Post' });
          const commentLikes = await LikeModel.find({ likeable: pcid, on_model: 'Comment' });
          return [...postLikes, ...commentLikes];
      } catch (err) {
          throw err;
      }
  }

  async toggleLike(pcid, uid) {
    try {
        const likeable = await LikeModel.findOne({ likeable: pcid, user: uid });
        const isPost = await PostModel.findById(pcid);

        if (!likeable) {
            const like = { user: uid, likeable: pcid, on_model: isPost ? 'Post' : 'Comment' };
            const newLike = new LikeModel(like);
            await newLike.save();
            return newLike;
        } else {
            await likeable.deleteOne();
            return null;
        }
    } catch (err) {
        throw err;
    }
  }
}