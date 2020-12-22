import { IAngularReportBaseExtensionData } from "./i-angular-report-base-extension-data";

export interface IAngularReportBaseData extends IAngularReportBaseExtensionData{
  OmniId: string;
  OmniName: string;
  SiteDescription: string;
  Address1: string;
  Address2: string;
  Address3: string;
  CombinedAddress: string;
  FormattedDateTime: string;
  FormPrinterName: string;
}
