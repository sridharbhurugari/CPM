export interface IPickPriority {
  PickPriorityIdentity: number;
  OmniId: string;
  PriorityCode: string;
  PriorityDescription: string;
  ColorCode: string;
  Sequence: number;
  HighPriority: boolean
  VerifyPick: boolean;
  ShowOnUnfilledList: boolean;
  PriorityCategory: string;
  DispenseWindow: number;
  TimeStamp: Date;
  LastUpdatedBy: string;
  LastUpdateFrom: string;
  Deleted: boolean;
  IsDefaultCode: boolean;
  RobotPriorityVerificationPercent: number;
  PriorityVerificationGrouping: boolean;
  TrackItemLot: boolean;
}
