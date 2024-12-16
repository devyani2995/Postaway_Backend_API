import PostRepository from './post.repo.js';

const postRepo = new PostRepository();

export default class PostController{

    async getall(req, res){
        try{
            const posts = await postRepo.getall();
            if(posts.length>0)
                return res.status(200).send(posts);
            else
                return res.status(404).send("No posts found");
        }catch(err){
            console.log(err);
            return res.status(500).send(err.message);
        }
    }

    async getByPid(req, res){
        try{
            const pid = req.params.pid;
            const post = await postRepo.getByPid(pid);
            if(post)
                return res.status(200).send(post);
            else
                return res.status(404).send("No post found");
        }catch(err){
            console.log(err);

            return res.status(500).send(err.message);
        }
    }

    async getByUid(req, res){
        try{
            const uid = req.cookies.userId;
            const posts = await postRepo.getByUid(uid);
            if(posts)
                return res.status(200).send(posts);
            else
                return res.status(404).send("No posts found");   
        } catch(err){
            console.log(err);

            return res.status(500).send(err.message);
        }
    }

    async create(req, res){
        try{
            console.log(req.cookies.userId);
            const post ={
                user: req.cookies.userId,
                caption: req.body.caption,
                imageUrl: req.file.filename,
            }
            const result = await postRepo.add(post);
            if(result)
                return res.status(201).send(result);
            return res.status(400).send("error");
        }catch(err){
            console.log(err);

            return res.status(500).send(err.message);
        }
    }
    async delete(req, res) {
        try {
            const {pid} = req.params;
            const uid = req.cookies.userId; // No need to convert to Number
            const resp = await postRepo.delete(pid, uid);
            res.status(200).send({ msg: "Post deleted successfully", data: resp });
        } catch (err) {
            console.log(err);
            return res.status(500).send(err.message);
            
        }
    }
    
    async update(req, res) {
        try {
            const { caption, imageUrl } = req.body;
            const {pid} = req.params;
            const uid = req.cookies.userId;
            //console.log(uid, pid);
            req.body.imageUrl = req.file.filename; // or req.file.path
            const result = await postRepo.update(uid, pid, { caption, imageUrl });
            if (result)
                return res.status(200).send({ msg: "Post updated successfully", data: result });
            return res.status(404).send("Post not Found!");
        } catch (err) {
            console.log(err);
            return res.status(400).send(err.message);
        }
    }
}