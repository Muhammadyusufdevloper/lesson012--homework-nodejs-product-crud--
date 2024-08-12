import { Owner, ownerValidation } from "../models/ownerSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

class OwnersController {
    async getProfile(req, res) {
        try {
            let owner = await Owner.findById(req.user._id);
            if (!owner) {
                return res.status(404).json(informationReturn("Owner profile not found", "error", null));
            }
            res.status(200).json(informationReturn("Owner profile fetched successfully", "success", owner));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async registerOwner(req, res) {
        try {
            const { error } = ownerValidation(req.body);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "error", null));
            }
            const existOwner = await Owner.exists({ username: req.body.username });

            if (existOwner) {
                return res.status(400).json(informationReturn("Owner already exists", "warning", null));
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const owner = await Owner.create(req.body);
            res.status(201).json(informationReturn("Owner success register", "success", owner));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async loginOwner(req, res) {
        try {
            const { username, password } = req.body;
            const user = await Owner.findOne({ username });
            if (!user) {
                return res.status(400).json(informationReturn("User | Password not found", "error", null));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                return res.status(200).json({
                    ...informationReturn("User signed in", "success", user),
                    token
                });
            } else {
                return res.status(400).json(informationReturn("User | Password not found", "error", null));
            }
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }
}

export default new OwnersController();
