import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IBoletoProvider } from '@shared/container/providers/BoletoProvider/IBoletoProvider';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  barCode: string;
  amount: string;
  expirationDate?: string;
}

@injectable()
export class GetBoletoInfoUseCase {
  constructor(
    @inject('BoletoProvider')
    private boletoProvider: IBoletoProvider,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(barCode: string): Promise<IResponse> {
    const cleanBarCode = barCode.replace(/\D/g, '');

    if (barCode.length !== 44 && barCode.length !== 48)
      throw new AppError('Código Inválido!');

    const decodeBarCode =
      cleanBarCode.length > 44
        ? this.boletoProvider.validadeDealerBoleto(cleanBarCode)
        : this.boletoProvider.validadeBankBoleto(cleanBarCode);

    if (!decodeBarCode) throw new AppError('Boleto Inválido!');

    let response: IResponse = {
      barCode: decodeBarCode.barCode,
      amount: decodeBarCode.value,
    };

    if (decodeBarCode.daysToExpiration)
      response.expirationDate = this.dateProvider
        .getBoletoExpireDate(decodeBarCode.daysToExpiration)
        .toISOString();

    return response;
  }
}
