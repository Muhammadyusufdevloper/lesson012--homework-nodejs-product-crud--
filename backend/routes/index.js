import express from "express";
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js";
import OwnersController from "../controller/owner.js";
import { auth } from "../middleware/auth.js";
import { ownerMiddleWare } from "../middleware/owner-middleware.js";
const router = express.Router();

//----------------- Blogs routes -----------------\\
router.get("/api/blogs", [auth], BlogsController.get);
router.get("/api/blogs/search", [auth], BlogsController.getSearch);
router.get("/api/blogs/:id", [auth, ownerMiddleWare], BlogsController.getById);
router.post("/api/blogs", [auth, ownerMiddleWare], BlogsController.post);
router.put("/api/blogs/:id", [auth, ownerMiddleWare], BlogsController.put);
router.delete("/api/blogs/:id", [auth, ownerMiddleWare], BlogsController.delete);


//----------------- Users routes -----------------\\
router.get('/api/users/profile', [auth], UsersController.getProfile);
router.post('/api/users/sign-up', UsersController.registerUser);
router.post('/api/users/sign-in', UsersController.loginUser);

//----------------- Owners routes -----------------\\
router.get("/api/owners/profile", [auth], OwnersController.getProfile);
router.post("/api/owner/register", OwnersController.registerOwner);
router.post("/api/owner/login", OwnersController.loginOwner);


export default router;
