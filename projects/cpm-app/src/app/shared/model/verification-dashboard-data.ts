import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';

export class VerificationDashboardData implements IVerificationDashboardData {

  constructor(verificationDashboardData: IVerificationDashboardData) {
    Object.assign(this, verificationDashboardData);
  }

  TotalVerifications: number;
  CompleteVerifications: number;
  RequiredVerifications: number;
}
