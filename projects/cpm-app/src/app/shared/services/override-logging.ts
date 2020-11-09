import { Injectable } from '@angular/core';
import { LogVerbosity, ILogger, LogSeverity } from 'oal-core';

@Injectable({
    providedIn: 'root'
})
export class WindowLoggerService implements ILogger {
    private readonly _logger: any;

    constructor() {
        this._logger = window['logger'];
    }

    logMessage(verbosity: any, severity: LogSeverity, category: any, message: string): void {
        switch (severity) {
            case LogSeverity.Information:
                this.logInfo(verbosity, category, message);
                break;

            case LogSeverity.Warning:
                this.logWarning(verbosity, category, message);
                break;

            case LogSeverity.Error:
                this.logError(verbosity, category, message);
                break;

            default:
                this.logInfo(verbosity, category, message);
        }
    }

    logInfo(verbosity: LogVerbosity, category: any, message: any) {
        this._logger
        ? this._logger.logInfo(verbosity, category, message)
        : console.log(message);
    }

    logWarning(verbosity: LogVerbosity, category: any, message: any) {
        this._logger
        ? this._logger.logWarning(verbosity, category, message)
        : console.log(message);
    }

    logError(verbosity: LogVerbosity, category: any, message: any) {
        this._logger
        ? this._logger.logError(verbosity, category, message)
        : console.log(message);
    }

    logException(verbosity: LogVerbosity, category: any, error: Error) {
        this._logger
        ? this._logger.logError(verbosity, category, error)
        : console.log(error);
    }
}
