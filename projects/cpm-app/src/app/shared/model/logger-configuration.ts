import { LogVerbosity } from "oal-core/lib/services/logger/enums/log-verbosity";
import { ILoggerConfiguration } from "../../api-core/data-contracts/i-logger-configuration";

export class LoggerConfiguration implements ILoggerConfiguration {
    constructor(loggerConfiguration: ILoggerConfiguration) {
      Object.assign(this, loggerConfiguration);
    }

    LogVerbosityLevel: LogVerbosity;

}
