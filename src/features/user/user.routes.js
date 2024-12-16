//user

import { upload } from '../../middleware/fileupload.middleware.js';
import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const router = express.Router();



router.post('/signup', (req, res)=>{ 
    userController.signUp(req, res)
});
router.post('/signin', (req, res)=>{ 
    userController.signIn(req, res)
});
// router.post('/reset-password', (req, res)=>{ 
//     userController.resetPassword(req, res)
// });
router.get('/logout', (req, res)=>{ 
    userController.logout(req, res)
});

router.get('/get-details/:userId', (req, res)=>{ 
    userController.getUser(req, res)
});

router.get('/get-all-details/', (req, res)=>{ 
    userController.getAll(req, res)
});

router.put('/update-details/:userId',upload.single('imageUrl'), (req, res)=>{ 
    userController.update(req, res)
});

// router.post('/update-details/avatar', upload.single('imageUrl'),(req, res)=>{ 
//     userController.uploadAvatar(req, res)
// });

export default router;