import { Router } from "express";
const { register, login, addEndereco, addTelefone, cancelarCadastro } = require("../controllers/authController");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/endereco", addEndereco);
router.post("/telefone", addTelefone);
router.post("/cancelar", cancelarCadastro);

export default router;
