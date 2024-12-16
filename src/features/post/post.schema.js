import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        }
    ]
});