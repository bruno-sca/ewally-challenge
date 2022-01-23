import { GetBoletoInfoController } from '@modules/boletos/useCases/getBoletoInfo/GetBoletoInfoController';
import { Router } from 'express';

const boletosRoutes = Router();

const getBoletoInfoController = new GetBoletoInfoController();

boletosRoutes.get('/:barCode', getBoletoInfoController.handle);

export { boletosRoutes };
