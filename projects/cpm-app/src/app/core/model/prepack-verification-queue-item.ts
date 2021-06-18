import { IPrepackVerificationQueueItem } from "../../api-core/data-contracts/i-prepack-verification-queue-item";

export class PrepackVerificationQueueItem implements IPrepackVerificationQueueItem {

    constructor(prepackVerificationQueueItem: IPrepackVerificationQueueItem) {
        Object.assign(this, prepackVerificationQueueItem);
      }

    PrepackVerificationQueueId: number;
    ItemId: string;
    ItemDescription: string;
    DeviceId: number;
    DeviceDescription: string;
    QuantityToPackage: number;
    PackagedDate: Date;
    DrugIdentifier: string;
}
