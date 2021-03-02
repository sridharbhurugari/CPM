import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';

export class VerificationDashboardData implements IVerificationDashboardData {

  constructor(verificationDashboardData: IVerificationDashboardData) {
    Object.assign(this, verificationDashboardData);
  }

  Add(dashboardDataToAdd: IVerificationDashboardData) {
    for(let property in dashboardDataToAdd) {
      this[property] += dashboardDataToAdd[property];
    }
  }

  TotalStatuses: number;
  CompleteStatuses: number;
  RequiredStatuses: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  CompleteOutputDevices: number;
  RequiredOutputDevices: number;
}
