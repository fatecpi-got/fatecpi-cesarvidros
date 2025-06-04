import { Router } from "express";

import servicoRoutes from "./servicoRoutes";
import orcamentoRoutes from "./orcamentoRoutes";
import feedbackRoutes from "./feedbackRoutes";  
import pedidoRoutes from "./pedidoRoutes";
import subCategoriaRoutes from "./subCategoriaRoutes";


const router = Router();

// Define the base routes for each module
router.use("/servico", servicoRoutes);
router.use("/orcamento", orcamentoRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/pedido", pedidoRoutes);
router.use("/subcategoria", subCategoriaRoutes);

export default router;
