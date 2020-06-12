import { Component, OnInit } from '@angular/core';
import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { IQuickPickDispenseBox } from '../../api-xr2/data-contracts/i-quick-pick-dispense-box';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})
export class QuickPickPageComponent implements OnInit {

  quickpickDrawers: IQuickPickDrawer[];
  quickPickDispenseBoxes: IQuickPickDispenseBox[];


  constructor() {

    // Order mock list
    const boxMockList = [
      {
        OrderId: '4322343',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '43243242',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '312343',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '321345437',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '21324456',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      },
      {
        OrderId: '23453367',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
        FilledQty: 31,
        ReqQty: 35,
        ItemsFilled: 5
      }
    ];

    // Drawer mock list
    const drawerMockList = [
      {
        Id: '1',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBox: boxMockList[1],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 2,
        State: 1
      },
      {
        Id: '2',
        Status: 'Available',
        QuickPickDispenseBox: null,
        DetailedView: false,
        CurrentBoxIndex: null,
        TotalBoxCount: null,
        State: 1
      },
      {
        Id: '3',
        Status: 'Available', // 'Not Available',
        QuickPickDispenseBox: boxMockList[3],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 3,
        State: 3
      },
      {
        Id: '4',
        Status: 'Available',
        QuickPickDispenseBox: null,
        DetailedView: false,
        CurrentBoxIndex: null,
        TotalBoxCount: null,
        State: 1
      },
      {
        Id: '5',
        Status: 'Available', // 'Pending',
        QuickPickDispenseBox: boxMockList[5],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 4,
        State: 2
      },
      {
        Id: '6',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBox: boxMockList[4],
        DetailedView: false,
        CurrentBoxIndex: 0,
        TotalBoxCount: 3,
        State: 1
      }
    ];

    this.quickpickDrawers = drawerMockList;
    this.quickPickDispenseBoxes = boxMockList;
  }

  ngOnInit() {
  }

}
