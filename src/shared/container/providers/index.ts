import { container } from 'tsyringe';

import { IBoletoProvider } from './BoletoProvider/IBoletoProvider';
import { BoletoProvider } from './BoletoProvider/implementations/BoletoProvider';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IBoletoProvider>('BoletoProvider', BoletoProvider);
container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
