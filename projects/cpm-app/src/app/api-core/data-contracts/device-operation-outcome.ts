export enum DeviceOperationOutcome {
/// The device operation succeeded.
/// </summary>
DeviceOperationOutcome_Successful,
/// <summary>
/// The device is not leased to client.
/// </summary>
DeviceOperationOutcome_DeviceNotLeasedToClient,
/// <summary>
/// The device is either offline or not found.
/// </summary>
DeviceOperationOutcome_DeviceOfflineOrNotFound,
/// <summary>
/// The device is configured as inactive.
/// </summary>
DeviceOperationOutcome_DeviceInactive,
/// <summary>
/// Generic message that the device does not require a lease
/// </summary>
DeviceOperationOutcome_DeviceLeaseNotRequired,
/// <summary>
/// A pending lease request already exists for device.
/// </summary>
DeviceOperationOutcome_PendingLeaseRequestExistsForDevice,
/// <summary>
/// Items are currently assigned to the device
/// </summary>
DeviceOperationOutcome_ItemsAssignedToDevice,
/// <summary>
/// Generic message that the device operation was unsuccessful
/// </summary>
DeviceOperationOutcome_Unsuccessful
}
