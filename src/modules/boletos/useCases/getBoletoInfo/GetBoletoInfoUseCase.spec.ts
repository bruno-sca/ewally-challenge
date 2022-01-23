import { BoletoProvider } from '@shared/container/providers/BoletoProvider/implementations/BoletoProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { GetBoletoInfoUseCase } from './GetBoletoInfoUseCase';

let boletoProvider: BoletoProvider;
let dateProvider: DayjsDateProvider;
let getBoletoInfoUseCase: GetBoletoInfoUseCase;

describe('GetBoletoInfoUseCase tests', () => {
  beforeAll(() => {
    boletoProvider = new BoletoProvider();
    dateProvider = new DayjsDateProvider();
    getBoletoInfoUseCase = new GetBoletoInfoUseCase(
      boletoProvider,
      dateProvider
    );
  });

  it('Should be able able to return info from a valid bank boleto', async () => {
    const response = await getBoletoInfoUseCase.execute(
      '34191790010104351004791020150008987820026300'
    );
    expect(response).toMatchObject({
      barCode: '34191790010104351004791020150008987820026300',
      expirationDate: '2021-10-23T03:00:00.000Z',
      amount: boletoProvider.formatStringToCurrencyBR('26300'),
    });
  });

  it('Should be able able to return info from a valid dealer boleto', async () => {
    const response = await getBoletoInfoUseCase.execute(
      '836800000033002300481005222180569212001836093839'
    );
    expect(response).toMatchObject({
      barCode: '836800000033002300481005222180569212001836093839',
      amount: boletoProvider.formatStringToCurrencyBR('30023'),
    });
  });

  it('Should not be able able to return info from a boleto with a length other than 44 or 48', async () => {
    await expect(
      getBoletoInfoUseCase.execute('341917900101043510047910201500089878200263')
    ).rejects.toEqual(new AppError('Código Inválido!'));
  });

  it('Should not be able able to return info from a bank boleto with a invalid validation digit', async () => {
    await expect(
      getBoletoInfoUseCase.execute(
        '34191790020104351004791020150008987820026300'
      )
    ).rejects.toEqual(new AppError('Boleto Inválido!'));
  });

  it('Should not be able able to return info from a dealer boleto with a invalid validation digit', async () => {
    await expect(
      getBoletoInfoUseCase.execute(
        '836800000032002300481005222180569212001836093839'
      )
    ).rejects.toEqual(new AppError('Boleto Inválido!'));
  });
});
