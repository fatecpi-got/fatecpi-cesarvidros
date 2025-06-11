import { Request, Response } from "express";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "seuSegredoSuperSeguro";

// Função para registrar um usuário
export const register = async (req: Request, res: Response) => {
    const { nome, email, senha, tipo_acesso, data_nascimento, numero_telefone, rua, cidade, estado, numero_casa, cep } = req.body;

    // Validação simples
    if (!nome || !email || !senha || !tipo_acesso || !data_nascimento || !numero_telefone || !rua || !cidade || !estado || !numero_casa || !cep) {
        return res.status(400).json({ message: "Preencha todos os campos obrigatórios!" });
    }
    
    try {
        // Verifica se o e-mail já existe no banco
        const userExists = await pool.query("SELECT id FROM USUARIO WHERE Email = $1 LIMIT 1", [email]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Insere usuário no banco e retorna o ID
        const newUser = await pool.query(
            "INSERT INTO USUARIO (Nome, Email, Senha, tipo_acesso, data_nascimento, numero_telefone, rua, cidade, estado, numero_casa, cep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, tipo_acesso",
            [nome, email, hashedPassword, tipo_acesso, data_nascimento, numero_telefone, rua, cidade, estado, numero_casa, cep]
        );

        // Gera o token JWT
        const token = jwt.sign(
            { id: newUser.rows[0].id, tipo_acesso: newUser.rows[0].tipo_acesso },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Retorna o ID do usuário, token e mensagem
        res.status(201).json({
            message: "Usuário registrado com sucesso!",
            userId: newUser.rows[0].id,
            token
        });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};

// Função para login
export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await pool.query("SELECT id, senha, tipo_acesso FROM USUARIO WHERE Email = $1 LIMIT 1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "E-mail ou senha incorretos!" });
        }

        // Compara a senha
        const isMatch = await bcrypt.compare(senha, user.rows[0].senha);
        if (!isMatch) {
            return res.status(400).json({ message: "E-mail ou senha incorretos!" });
        }

        // Gera um token JWT
        const token = jwt.sign(
            { id: user.rows[0].id, tipo_acesso: user.rows[0].tipo_acesso },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login realizado com sucesso!", token: token, userRole: user.rows[0].tipo_acesso, userId: user.rows[0].id});
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};
