import LikeRepository from "./like.repo.js";

const likeRepo = new LikeRepository();

export default class LikeController{
    async getall(req, res){
        try{
            const resp = await likeRepo.getall()
            return res.status(200).send(resp);
        }catch(err){
            console.log(err);
            return res.status(500).send("Server-side Error");
        }
    }

    async getbyPCid(req, res) {
        const { pcid } = req.params;

        try {
            const resp = await likeRepo.getbyPCid(pcid);
            return res.status(200).send(resp);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server-side Error");
        }
    }

    async toggleLike(req, res) {
        try {
            const pcid = req.params.pcid;
            const uid = req.cookies.userId;
            const result = await likeRepo.toggleLike(pcid, uid);
            return res.status(200).send({ msg: "Like Toggled", data: result });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server-side Error");
        }
    }

}