import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

class DayjsDateProvider implements IDateProvider {
  addDays(start_date: Date, days: number): Date {
    return dayjs(start_date).add(days, 'days').toDate();
  }

  currentDate(): Date {
    return dayjs().toDate();
  }

  getBoletoExpireDate(days: number): Date {
    return dayjs('1997-10-07T00:00:00').add(days, 'days').toDate();
  }
}

export { DayjsDateProvider };
