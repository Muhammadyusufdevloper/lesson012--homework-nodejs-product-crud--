import mongoose, { Schema } from "mongoose";
import Joi from "joi";
const adminsSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male",
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "owner"],
        default: "admin",
    }
}, { timestamps: true });

export const Admins = mongoose.model("Admins", adminsSchema);

export const adminsValidation = (body) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        gender: Joi.string().allow("male"),
        isActive: Joi.boolean(),
        role: Joi.string().valid("user", "admin", "owner").default("admin")
    });
    return schema.validate(body);
};