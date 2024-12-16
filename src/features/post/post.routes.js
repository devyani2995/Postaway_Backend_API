//post

import express from 'express'
import PostController from './post.controller.js';
import jwtAuth from '../../middleware/jwtauth.middleware.js';
import { upload } from '../../middleware/fileupload.middleware.js';

const router = express.Router();

const postController = new PostController();

//router.use(jwtAuth);

router.get('/all', (req,res)=>{
    postController.getall(req,res)
});
router.get('/:pid', (req,res)=>{
    postController.getByPid(req,res)
});
router.get('/', (req,res)=>{
    postController.getByUid(req,res)
});
router.post('/',upload.single('imageUrl'),(req,res)=>{
     postController.create(req,res)
});
router.put('/:pid',upload.single('imageUrl'),(req,res)=>{
     postController.update(req,res)
});
router.delete('/:pid',(req,res)=>{
    postController.delete(req,res)
});

export default router;
