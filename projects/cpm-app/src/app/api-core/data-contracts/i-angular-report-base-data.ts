import { IUnfilledAngularReportExtensionData } from "./i-unfilled-angular-report-extension-data";
import { IXr2AngularReportExtensionData } from "./i-xr2-angular-report-extension-data";

export interface IAngularReportBaseData extends IUnfilledAngularReportExtensionData, IXr2AngularReportExtensionData {
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
