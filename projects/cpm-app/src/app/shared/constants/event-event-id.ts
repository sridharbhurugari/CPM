export class EventEventId {

// Not in CPM: Remove?
    public static readonly QuickPickReloadDrawersEvent: string = 'QuickPickReloadDrawersEvent';

// CPM Common Events: ..//CPM-CentralPharmacy\Omnicell.CentralPharmacy.Common\Events\
    public static readonly HighPriorityPickRequestEvent: string = 'HighPriorityPickRequestEvent';
    public static readonly OcsUnavailableEvent: string = 'OcsUnavailableEvent';
    public static readonly OcsAvailableEvent: string = 'OcsAvailableEvent';
    public static readonly RefreshDeviceNeeds: string = 'RefreshDeviceNeeds';

 // Common Hardware Events: ..\OCAP-Framework\Omnicell.Hardware.Common\Events\
    public static readonly DeviceOperationResultEvent: string = 'DeviceOperationResultEvent';
    public static readonly HardwareLeaseGrantedEvent: string = 'HardwareLeaseGrantedEvent';
    public static readonly HardwareLeaseDeniedEvent: string = 'HardwareLeaseDeniedEvent';

// Carousel events: ..\CPM-CentralPharmacy\Omnicell.CentralPharmacy.Carousel.Common\Events\
    public static readonly CarouselFaultedEvent: string = 'CarouselFaultedEvent';
    public static readonly CarouselIsReadyEvent: string = 'CarouselIsReadyEvent';

//SignalR Events: ..\CPM-CentralPharmacy\Omnicell.CentralPharmacy.Common\Events\SignalREvents\AddOrUpdateUnderfilledPicklistEvent.cs
    public static readonly AddOrUpdateUnderfilledPicklistEvent: string = 'AddOrUpdateUnderfilledPicklistEvent';
    public static readonly RemoveUnderfilledPicklistEvent: string = 'RemoveUnderfilledPicklistEvent';
    public static readonly AddOrUpdateUnderfilledPicklistLineEvent: string = 'AddOrUpdateUnderfilledPicklistLineEvent';
    public static readonly RemoveUnderfilledPicklistLineEvent: string = 'RemoveUnderfilledPicklistLineEvent';

// Service Health:  ..\CPM-CentralPharmacy\Omnicell.CentralPharmacy.Server\Events\ServiceHealthEventTypes.cs
    public static readonly Ocs2Available: string = 'Ocs2Available';
    public static readonly Ocs2Unavailable: string = 'Ocs2Unavailable';

// XR2 Common Events: ..\CPM-CentralPharmacy\Omnicell.CentralPharmacy.XR2.Common\Events\EventTypes.cs
    public static readonly AddOrUpdatePicklistQueueItemMessage: string = 'AddOrUpdatePicklistQueueItemMessage';
    public static readonly RemovePicklistQueueItemMessage: string = 'RemovePicklistQueueItemMessage';
    public static readonly QuickPickDrawerUpdateEvent: string = 'QuickPickDrawerUpdateEvent';
    public static readonly QuickPickQueueUpdateEvent: string = 'QuickPickQueueUpdateEvent';
    public static readonly QuickPickErrorUpdateEvent: string = 'QuickPickErrorUpdateEvent';
    public static readonly QuickPickDeviceStatusUpdateEvent: string = 'QuickPickDeviceStatusUpdateEvent';
    public static readonly PickListQueueGroupedUpdateMessage: string = 'PickListQueueGroupedUpdateMessage';
    public static readonly PickListQueueGroupedListUpdateMessage: string = 'PickListQueueGroupedListUpdateMessage';
    public static readonly PicklistQueueItemListUpdateMessage: string = 'PicklistQueueItemListUpdateMessage';
    public static readonly DestockDataEvent: string = 'DestockDataEvent';
    public static readonly DestockDataErrorEvent: string = 'DestockDataErrorEvent';
}
