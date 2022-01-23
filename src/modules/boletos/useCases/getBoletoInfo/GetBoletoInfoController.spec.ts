import { app } from '../../../../app';
import request from 'supertest';

function formatStringToCurrencyBR(str: string): string {
  return String(
    new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(str) / 100)
  );
}

describe('GetBoletoInfoController tests', () => {
  it('Should be able able to return info from a valid bank boleto', async () => {
    const response = await request(app).get(
      '/boleto/34191790010104351004791020150008987820026300'
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      barCode: '34191790010104351004791020150008987820026300',
      expirationDate: '2021-10-23T03:00:00.000Z',
      amount: formatStringToCurrencyBR('26300'),
    });
  });

  it('Should be able able to return info from a valid bank boleto', async () => {
    const response = await request(app).get(
      '/boleto/836800000033002300481005222180569212001836093839'
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      barCode: '836800000033002300481005222180569212001836093839',
      amount: formatStringToCurrencyBR('30023'),
    });
  });

  it('Should not be able able to return info from a boleto with a length other than 44 or 48', async () => {
    const response = await request(app).get(
      '/boleto/8368000000330023004810052221805692120018360938'
    );
    expect(response.status).toBe(400);
  });

  it('Should not be able able to return info from a bank boleto with a invalid validation digit', async () => {
    const response = await request(app).get(
      '/boleto/34191790020104351004791020150008987820026300'
    );
    expect(response.status).toBe(400);
  });

  it('Should not be able able to return info from a dealer boleto with a invalid validation digit', async () => {
    const response = await request(app).get(
      '/boleto/836800000032002300481005222180569212001836093839'
    );
    expect(response.status).toBe(400);
  });
});
