import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(err.status || 500).json({ message: err.message || "Erro interno no servidor" });
};

export default errorHandler;
