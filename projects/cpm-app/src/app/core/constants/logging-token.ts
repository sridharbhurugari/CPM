import { InjectionToken } from '@angular/core';
import { ILoggerService, ILogger} from 'oal-core';

export const loggerServiceToken = new InjectionToken<ILoggerService>('Override Window Logger Service');
export const windowLoggerToken = new InjectionToken<ILogger>('Override Window Logger');
