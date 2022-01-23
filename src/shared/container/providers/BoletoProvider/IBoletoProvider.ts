export type IBoletoValidationResponse =
  | {
      barCode: string;
      value: string;
      daysToExpiration?: number;
    }
  | false;

export interface IBoletoProvider {
  validadeBankBoleto(param: string): IBoletoValidationResponse;
  validadeDealerBoleto(param: string): IBoletoValidationResponse;
}
