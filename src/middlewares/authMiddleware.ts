import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: any;
}
const JWT_SECRET = process.env.JWT_SECRET || "seuSegredoSuperSeguro";

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado! Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário ao request
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido!" });
    }
};

