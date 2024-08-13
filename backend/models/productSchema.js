import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        required: false,
        default: []
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: false,
        default: true
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", productsSchema);

export const productValidation = (body) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        stock: Joi.number().required(),
        images: Joi.array(),
        price: Joi.number().required(),
        oldPrice: Joi.number().required(),
        available: Joi.boolean()
    });
    return schema.validate(body);
}
