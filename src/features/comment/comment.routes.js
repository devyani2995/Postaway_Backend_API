//comment

import express from 'express'
import CommentController from './comment.controller.js';
//import {upload} from '../../middlewares/file-upload.middleware.js';
import jwtAuth from '../../middleware/jwtauth.middleware.js';
const router = express.Router();

const commentController = new CommentController();

router.use(jwtAuth);

router.get('/all',(req,res)=>{
    commentController.getall(req,res)
});
router.get('/:pid', (req,res)=>{
    commentController.getByPid(req,res)
});
router.post('/:pid', (req,res)=>{ 
    commentController.postComment(req,res)
});
router.delete('/:cid',(req,res)=>{ 
    commentController.deleteComment(req,res)
});
router.put('/:cid',(req,res)=>{
    commentController.updateComment(req,res)
});


export default router;
