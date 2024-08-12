import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const blogsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const Blogs = mongoose.model("Blogs", blogsSchema);

export const blogValidation = (body) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        userId: Joi.string(),
        category: Joi.string().required(),
        author: Joi.string().required(),
        views: Joi.number().required(),
        likes: Joi.number().required()
    });
    return schema.validate(body);
}
