export interface IDeviceConfiguration {
        Active: boolean;

        /// <summary>
        /// Gets or sets the default owner client for this device
        /// </summary>
        DefaultOwner: string;

        /// <summary>
        /// Gets or sets the default owner client's short name.
        /// </summary>
         DefaultOwnerShortname: string;

        /// <summary>
        /// Gets or sets the device description.
        /// </summary>
         DeviceDescription: string;

        /// <summary>
        /// Gets or sets the device id.
        /// </summary>
        DeviceId: number;

        /// <summary>
        /// Gets or sets the device type id.
        /// </summary>
         DeviceType: string;

        /// <summary>
        /// Gets a value indicating whether this instance is valid.
        /// </summary>
        IsValid: boolean;

        /// <summary>
        /// Gets or sets the json.
        /// </summary>
        Json: string;

        /// <summary>
        /// Gets or sets a value indicating whether [lease required].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [lease required]; otherwise, <c>false</c>.
        /// </value>
        LeaseRequired: boolean;

        /// <summary>
        /// Gets or sets the device model
        /// </summary>
         Model: string;

        /// <summary>
        /// Gets or sets the order for the device.  Will help in deciding whihc device should be used in certain circumstances.
        /// </summary>
        Order: number;

        /// <summary>
        /// Gets or sets the printer name associated with this device.
        /// </summary>
        PrinterName: string;
}
