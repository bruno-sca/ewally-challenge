import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetBoletoInfoUseCase } from './GetBoletoInfoUseCase';

export class GetBoletoInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { barCode } = request.params;

    const getBoletoInfoUseCase = container.resolve(GetBoletoInfoUseCase);

    const boletoData = await getBoletoInfoUseCase.execute(barCode);

    return response.json(boletoData);
  }
}
