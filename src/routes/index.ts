import { Router } from "express";
import serviceRoutes from './servicoRoutes';
import categoriaRoutes from './categoriaRoutes';
import subcategoriaRoutes from './subcategoriaRoutes';

const router = Router();

router.use('/servicos', serviceRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/sub-categorias', subcategoriaRoutes);

export default router;
