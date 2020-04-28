export enum DeviceOperationOutcome {
    Successful,
    DeviceNotLeasedToClient,
    DeviceOfflineOrNotFound,
    DeviceInactive,
    DeviceLeaseNotRequired,
    PendingLeaseRequestExistsForDevice,
    ItemsAssignedToDevice,
    Unsuccessful
}