import { IBoletoProvider, IBoletoValidationResponse } from '../IBoletoProvider';

export class BoletoProvider implements IBoletoProvider {
  validadeBankBoleto(barCode: string): IBoletoValidationResponse {
    if (barCode.length !== 44) return false;

    const decoded_fields = this.decodeBankBoletos(barCode);

    if (
      decoded_fields.codes.some(
        (code) => this.mod10(code.numbers) !== Number(code.dv)
      )
    )
      return false;

    return {
      barCode: decoded_fields.barCode,
      value: decoded_fields.value,
      daysToExpiration: decoded_fields.daysToExpiration,
    };
  }
  validadeDealerBoleto(barCode: string): IBoletoValidationResponse {
    if (barCode.length !== 48) return false;

    const decoded_fields = this.decodeDealerBoletos(barCode);

    if (
      decoded_fields.codes.some(
        (code) => this.mod10(code.numbers) !== Number(code.dv)
      )
    )
      return false;

    return {
      barCode: decoded_fields.barCode,
      value: decoded_fields.value,
    };
  }

  decodeBankBoletos(barCode: string) {
    const matches = barCode.match(
      /^(?<field1>\d{9})(?<dv1>\d{1})(?<field2>\d{10})(?<dv2>\d{1})(?<field3>\d{10})(?<dv3>\d{1})(?<dv4>\d{1})(?<daysToExpiration>\d{4})(?<value>\d+)/
    );
    const fields = matches.groups;

    const field_keys = Object.keys(fields);

    return {
      barCode: matches[0],
      codes: [0, 2, 4].map((i) => ({
        numbers: fields[field_keys[i]],
        dv: fields[field_keys[i + 1]],
      })),
      dv: fields.dv4,
      value: this.formatStringToCurrencyBR(fields.value),
      daysToExpiration: Number(fields.daysToExpiration),
    };
  }

  decodeDealerBoletos(barCode: string) {
    const matches = barCode.match(
      /^(?<campo1>\d{11})[^\d]?(?<dv1>\d{1})[^\d]?(?<campo2>\d{11})[^\d]?(?<dv2>\d{1})[^\d]?(?<campo3>\d{11})[^\d]?(?<dv3>\d{1})[^\d]?(?<campo4>\d{11})[^\d]?(?<dv4>\d{1})$/m
    );

    const fields = matches.groups;
    const field_keys = Object.keys(fields);

    const codes = [0, 2, 4, 6].map((i) => ({
      numbers: fields[field_keys[i]],
      dv: fields[field_keys[i + 1]],
    }));

    return {
      barCode: matches[0],
      codes,
      value: this.formatStringToCurrencyBR(
        String(codes[0].numbers + codes[1].numbers).replace(
          /^\d{4}(?<valor>\d{11}).*/,
          '$1'
        )
      ),
    };
  }

  mod10(param: string): number {
    let sum = param
      .split('')
      .reverse()
      .reduce(
        (multiplied_str, currentNum, idx) =>
          String(Number(currentNum) * (idx % 2 === 0 ? 2 : 1)) + multiplied_str,
        ''
      )
      .split('')
      .reduce((total, currentNum) => Number(currentNum) + total, 0);

    sum %= 10;

    return sum !== 0 ? 10 - sum : sum;
  }

  formatStringToCurrencyBR(str: string): string {
    return String(
      new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(str) / 100)
    );
  }
}
