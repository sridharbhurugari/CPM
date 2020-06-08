import { Component, OnInit } from '@angular/core';
import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { IQuickPickOrderItem } from '../../api-xr2/data-contracts/i-quick-pick-order-item';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})
export class QuickPickPageComponent implements OnInit {

  quickpickDrawers: IQuickPickDrawer[];
  quickpickOrderItems: IQuickPickOrderItem[];


  constructor() {

    // Order mock list
    const orderMockList = [
      // {
      //   OrderId: '',
      //   DrawerId: '',
      //   PriorityCode: '',
      //   PriorityCodeColor: 'orange',
      //   Destination: "Nursing Area 33",
      //   DestinationId: '',
      //   DestinationType: '',
      //   PriorityCodeDescription: 'First Dose',
      //   ItemPicklistLines: [],
      //   BoxCount: 3,
      //   FilledBoxCount: 1,
      //   Date: "5/3/2020 10:15 AM",
      // },
      // {
      //   OrderId: '',
      //   DrawerId: '',
      //   PriorityCode: '',
      //   PriorityCodeColor: 'red',
      //   Destination: "Room 4657, South White, Skylar",
      //   DestinationId: '',
      //   DestinationType: '',
      //   PriorityCodeDescription: 'Stat Order',
      //   ItemPicklistLines: [],
      //   BoxCount: 3,
      //   FilledBoxCount: 1,
      //   Date: "5/3/2020 10:15 AM",
      // },
      // {
      //   OrderId: '',
      //   DrawerId: '',
      //   PriorityCode: '',
      //   PriorityCodeColor: 'orange',
      //   Destination: "Nursing Area 33",
      //   DestinationId: '',
      //   DestinationType: '',
      //   PriorityCodeDescription: 'First Dose',
      //   ItemPicklistLines: [],
      //   BoxCount: 3,
      //   FilledBoxCount: 3,
      //   Date: "5/3/2020 10:15 AM",
      // },
      // {
      //   OrderId: '',
      //   DrawerId: '',
      //   PriorityCode: '',
      //   PriorityCodeColor: 'red',
      //   Destination: "Room 4657, South White, Skylar",
      //   DestinationId: '',
      //   DestinationType: '',
      //   PriorityCodeDescription: 'Stat Order',
      //   ItemPicklistLines: [],
      //   BoxCount: 3,
      //   FilledBoxCount: 3,
      //   Date: "5/3/2020 10:15 AM",
      // },
      // {
      //   OrderId: '',
      //   DrawerId: '',
      //   PriorityCode: '',
      //   PriorityCodeColor: 'orange',
      //   Destination: "Nursing Area 33",
      //   DestinationId: '',
      //   DestinationType: '',
      //   PriorityCodeDescription: 'First Dose',
      //   ItemPicklistLines: [],
      //   BoxCount: null,
      //   FilledBoxCount: null,
      //   Date: "5/3/2020 10:15 AM",
      // },
      // {
      //   OrderId: '',
      //   DrawerId: '',
      //   PriorityCode: '',
      //   PriorityCodeColor: 'red',
      //   Destination: "Room 4657, South White, Skylar",
      //   DestinationId: '',
      //   DestinationType: '',
      //   PriorityCodeDescription: 'Stat Order',
      //   ItemPicklistLines: [],
      //   BoxCount: 3,
      //   FilledBoxCount: 2,
      //   Date: "5/3/2020 10:15 AM",
      // }
    ];

    // Drawer mock list
    const drawerMockList = [
      {
        Id: '1',
        Status: 'Ready',
        QuickPickOrderItem: null // orderMockList[1]
      },
      {
        Id: '2',
        Status: 'Available',
        QuickPickOrderItem: null
      },
      {
        Id: '3',
        Status: 'Not Available',
        QuickPickOrderItem: null // orderMockList[3]
      },
      {
        Id: '4',
        Status: 'Available',
        QuickPickOrderItem: null
      },
      {
        Id: '5',
        Status: 'Pending',
        QuickPickOrderItem: null // orderMockList[5]
      },
      {
        Id: '6',
        Status: 'Ready',
        QuickPickOrderItem: null // orderMockList[4]
      }
    ];

    this.quickpickDrawers = drawerMockList;
    this.quickpickOrderItems = orderMockList;
  }

  ngOnInit() {
  }

}
