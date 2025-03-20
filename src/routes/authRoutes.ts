import { Router } from "express";
const { register, login } = require("../controllers/authController");


const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
