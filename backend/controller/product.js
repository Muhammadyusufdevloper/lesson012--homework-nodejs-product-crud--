import { Product, productValidation } from "../models/productSchema.js";

function requiredCatch() {
    return {
        msg: "Server error",
        variant: "error",
        payload: null
    };
}

function informationReturn(msg, variant, payload) {
    return {
        msg,
        variant,
        payload
    };
}

class ProductsController {
    async get(req, res) {
        try {
            const { limit, page } = req.query;
            const products = await Product.find().limit(limit).skip((page - 1) * limit);
            if (!products.length) {
                res.status(404).json(informationReturn("Products not found", "error", null));
            }
            const totalCount = await Product.countDocuments()
            res.status(200).json({ ...informationReturn("Products fetched successfully", "success", products), totalCount });
        } catch {
            res.status(500).json(requiredCatch());
        }
    }
    async getSearch(req, res) {
        try {
            let { value = "", limit = 5 } = req.query;
            let text = value.trim();
            if (!text) {
                return res.status(400).json(informationReturn("Text not found", "error", null));
            }
            limit = parseInt(limit, 10);
            const products = await Product.find({
                $or: [
                    { title: { $regex: text, $options: "i" } },
                ],
            }).limit(limit);
            if (!products.length) {
                res.status(404).json(informationReturn("Products not found", "error", null));
            }
            res.status(200).json(informationReturn("Products fetched successfully", "success", products));
        } catch {
            res.status(500).json(requiredCatch());
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                res.status(404).json(informationReturn("Product not found", "error", null));
            }
            res.status(200).json(informationReturn("Product fetched successfully", "success", product));
        } catch {
            res.status(500).json(requiredCatch());
        }
    }

    async post(req, res) {
        try {
            let images = req.files.map((file) => `${req.protocol}://${req.get("host")}/upload/${file.filename}`);
            let newProduct = {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                stock: req.body.stock,
                images,
                oldPrice: req.body.oldPrice,
                price: req.body.price,
                available: req.body.available,
            }
            const { error } = productValidation(newProduct);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "error", null));
            }
            const product = await Product.create(newProduct);
            res.status(201).json(informationReturn("Product created successfully", "success", product));
        } catch {
            res.status(500).json(requiredCatch());
        }
    }

    async put(req, res) {
        try {
            const { error } = productValidation(req.body);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "error", null));
            }
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json(informationReturn("Product not found", "error", null));
            }
            return res.status(200).json(informationReturn("Product updated successfully", "success", updatedProduct));
        } catch {
            return res.status(500).json(requiredCatch());
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                res.status(404).json(informationReturn("Product not found", "error", null));
            }
            res.status(200).json(informationReturn("Product deleted successfully", "success", product));
        } catch {
            res.status(500).json(requiredCatch());
        }
    }
}

export default new ProductsController()