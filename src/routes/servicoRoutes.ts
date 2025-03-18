import { Router } from "express";
import { getAllServices, getAllServicesByCategoriaId, getAllServicesBySubCategoriaId } from "../controllers/servicosController";

const router = Router();

router.get('/get-all', getAllServices);
router.get('/get-all-by-categoria', getAllServicesByCategoriaId);
router.get('/get-all-by-sub-categoria', getAllServicesBySubCategoriaId);

export default router;