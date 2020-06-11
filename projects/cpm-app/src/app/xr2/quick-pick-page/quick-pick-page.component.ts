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
        OrderId: '',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'First Dose',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        DrawerId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: '',
        PriorityCodeDescription: 'Stat Order',
        ItemPicklistLines: [],
        Date: "5/3/2020 10:15 AM",
      }
    ];

    // Drawer mock list
    const drawerMockList = [
      {
        Id: '1',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBoxes: [boxMockList[1]],
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '2',
        Status: 'Available',
        QuickPickDispenseBoxes: null,
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '3',
        Status: 'Available', // 'Not Available',
        QuickPickDispenseBoxes: [boxMockList[3]],
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '4',
        Status: 'Available',
        QuickPickDispenseBoxes: null,
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '5',
        Status: 'Available', // 'Pending',
        QuickPickDispenseBoxes: [boxMockList[5]],
        DetailedView: false,
        CurrentBoxIndex: 0
      },
      {
        Id: '6',
        Status: 'Available', // 'Ready',
        QuickPickDispenseBoxes: [boxMockList[4]],
        DetailedView: false,
        CurrentBoxIndex: 0
      }
    ];

    this.quickpickDrawers = drawerMockList;
    this.quickPickDispenseBoxes = boxMockList;
  }

  ngOnInit() {
  }

}
