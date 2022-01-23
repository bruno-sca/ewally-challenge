import { Router } from 'express';
import { boletosRoutes } from './boleto.routes';

const router = Router();

router.use('/boleto', boletosRoutes);

export { router };
