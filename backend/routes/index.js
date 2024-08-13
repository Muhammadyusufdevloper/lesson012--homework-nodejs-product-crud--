import express from "express";
import ProductsController from "../controller/product.js";
import UsersController from "../controller/user.js";
import OwnersController from "../controller/owner.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/uploader.js";

const router = express.Router();

//----------------- Products routes -----------------\\
router.get("/api/products", [auth], ProductsController.get);
router.get("/api/products/search", [auth], ProductsController.getSearch);
router.get("/api/products/:id", [auth], ProductsController.getById);
router.post("/api/products", [auth, upload.array("images")], ProductsController.post);
router.put("/api/products/:id", [auth], ProductsController.put);
router.delete("/api/products/:id", [auth], ProductsController.delete);

//----------------- Users routes -----------------\\
router.get('/api/users/profile', [auth], UsersController.getProfile);
router.post('/api/users/sign-up', UsersController.registerUser);
router.post('/api/users/sign-in', UsersController.loginUser);

//----------------- Owners routes -----------------\\
router.get("/api/owners/profile", [auth], OwnersController.getProfile);
router.post("/api/owner/register", OwnersController.registerOwner);
router.post("/api/owner/login", OwnersController.loginOwner);

export default router;
