//post

import express from 'express'
import LikeController from './like.controller.js';
import jwtAuth from '../../middleware/jwtauth.middleware.js';

const router = express.Router();

const likeController = new LikeController();

router.use(jwtAuth);

router.get('/all/',(req,res)=>{
     likeController.getall(req,res);
});

router.get('/:pcid', (req, res) => {
    likeController.getbyPCid(req, res);
});

router.post('/toggle/:pcid', (req, res) => {
    likeController.toggleLike(req, res);
});

export default router;
