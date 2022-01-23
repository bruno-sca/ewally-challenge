import { BoletoProvider } from './BoletoProvider';

let boletoProvider: BoletoProvider;

describe('BoletoProvider tests', () => {
  beforeAll(() => {
    boletoProvider = new BoletoProvider();
  });

  it('Should be able able to return info from a valid bank boleto', () => {
    expect(
      boletoProvider.validadeBankBoleto(
        '34191790010104351004791020150008987820026300'
      )
    ).toMatchObject({
      barCode: '34191790010104351004791020150008987820026300',
      daysToExpiration: 8782,
      value: boletoProvider.formatStringToCurrencyBR('26300'),
    });
  });

  it('Should not be able able to return info from a bank boleto with a invalid validation digit', () => {
    expect(
      boletoProvider.validadeBankBoleto(
        '34191790020104351004791020150008987820026300'
      )
    ).toEqual(false);
  });

  it('Should not be able able to return info from a bank boleto with a length other than 44', () => {
    expect(
      boletoProvider.validadeBankBoleto(
        '3419179001010435100479102015000887820026300'
      )
    ).toEqual(false);
    expect(
      boletoProvider.validadeBankBoleto(
        '341917900201043510047910201500089878200263000'
      )
    ).toEqual(false);
  });

  it('Should be able able to return info from a valid dealer boleto', () => {
    expect(
      boletoProvider.validadeDealerBoleto(
        '836800000033002300481005222180569212001836093839'
      )
    ).toMatchObject({
      barCode: '836800000033002300481005222180569212001836093839',
      value: boletoProvider.formatStringToCurrencyBR('30023'),
    });
  });

  it('Should not be able able to return info from a dealer boleto with a invalid validation digit', () => {
    expect(
      boletoProvider.validadeDealerBoleto(
        '836800000032002300481005222180569212001836093839'
      )
    ).toEqual(false);
  });

  it('Should not be able able to return info from a dealer boleto with a length other than 48', () => {
    expect(
      boletoProvider.validadeBankBoleto(
        '8368000000330023004810052221805692120018360938391'
      )
    ).toEqual(false);
    expect(
      boletoProvider.validadeBankBoleto(
        '83680000003300230048100522218056921200183609383'
      )
    ).toEqual(false);
  });
});
