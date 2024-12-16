import CommentRepository from './comment.repo.js';

const commentRepo = new CommentRepository();

export default class CommentController {
    async getall(req, res) {
        try {
            const comments = await commentRepo.getall();
            if (comments.length > 0)
                return res.status(200).send(comments);
            else
                return res.status(404).send({ msg: "No comments found" });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ msg: err.message });
        }
    }

    async getByPid(req, res) {
        try {
            const pid = req.params.pid;
            const comments = await commentRepo.getByPostId(pid);
            if (comments.length > 0)
                return res.status(200).send(comments);
            else
                return res.status(404).send({ msg: "No comments found for this post" });
        } catch (err) {
            console.log(err);

            return res.status(500).send({ msg: err.message });
        }
    }

    async postComment(req, res) {
        try {
            const pid = req.params.pid;
            const uid = req.cookies.userId;
            const content = req.body.content;
            const post = {
                userId: uid,
                postId: pid,
                content
            }
            const result = await commentRepo.add(post);
            if (result)
                return res.status(201).send(result);
            return res.status(400).send({ msg: "Error creating comment" });
        } catch (err) {
            console.log(err);

            return res.status(500).send({ msg: err.message });
        }
    }

    async updateComment(req, res) {
        try {
            const cid = req.params.cid;
            const uid = req.cookies.userId;
            const { content } = req.body;
            const result = await commentRepo.updateComment(uid, cid, content);
            if (result)
                return res.status(200).send(result);
            return res.status(404).send({ msg: "Comment not found or access denied" });
        } catch (err) {
            console.log(err);
            
            return res.status(500).send({ msg: err.message });
        }
    }

    async deleteComment(req, res) {
        try {
            const cid = req.params.cid;
            const uid = req.cookies.userId;
            const result = await commentRepo.deleteComment(uid, cid);
            if (result)
                return res.status(200).send({ msg: "Comment deleted successfully" });
            else
                return res.status(404).send({ msg: "Comment not found or access denied" });
        } catch (err) {
            console.log(err);

            return res.status(500).send({ msg: err.message });
        }
    }
}