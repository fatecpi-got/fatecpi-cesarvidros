import { Router } from "express";
const { register, login, addEndereco, addTelefone } = require("../controllers/authController");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/endereco", addEndereco);
router.post("/telefone", addTelefone);

export default router;
