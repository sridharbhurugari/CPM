export interface IAngularReportBaseData {
  OmniId: string;
  OmniName: string;
  SiteDescription: string;
  Address1: string;
  Address2: string;
  Address3: string;
  CombinedAddress: string;
  FormattedDateTime: string;
  FormPrinterName: string;
  OrderId: string; //For Unfilled report
  PriorityCode: string; //For Unfilled report
  DeviceDescriptionName : string; //for XR2 inventory report
}
