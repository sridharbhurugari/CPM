import { IOcapHttpConfiguration } from '../interfaces/i-ocap-http-configuration';

export class OcapHttpConfiguration implements IOcapHttpConfiguration{
    apiKey: string;
    machineName: string;
    clientId: string;
    port: string;
    ocapServerIP: string;
    useSecured: string;
    userLocale: string;
}