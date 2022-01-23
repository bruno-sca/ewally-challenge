interface IDateProvider {
  addDays(start_date: Date, days: number): Date;
  currentDate(): Date;
  getBoletoExpireDate(days: number): Date;
}

export { IDateProvider };
