import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("User", userSchema);

export default class UserRepository{
    async signUp(user){
        try{
            const newUser = new UserModel(user);
            const resp = newUser.save();
            return resp;
        }catch(err){
            throw err;
        }
    }

    async findByEmail(email){
        try{
            const user = await UserModel.findOne({email});
            return user;
        }catch(err){
            throw err;
        }
    }

    async resetPassword(email, password){
        try{
            let user = await UserModel.findOne({email});
            user.password = password;
            await user.save();
            return user;
        }catch(err){
            throw err;
        }
    }
}

