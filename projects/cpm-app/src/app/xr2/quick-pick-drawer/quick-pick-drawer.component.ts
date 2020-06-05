import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-pick-drawer',
  templateUrl: './quick-pick-drawer.component.html',
  styleUrls: ['./quick-pick-drawer.component.scss']
})
export class QuickPickDrawerComponent implements OnInit {

  dashboardCardData = [
    {
      headerText: 'Door 1 | Ready',
      cardItems: [{ cardValue: '', cardText: '[Print Label]' ,
      cardMessage: 'Error occurred while loading the widget. Please try again later' }]
    },
    {
      headerText: 'Door 2 | Ready',
      cardItems: [{ cardValue: '', cardText: '[Print Label]' ,
      cardMessage: 'Error occurred while loading the widget. Please try again later' }]
    },
    {
      headerText: 'Door 3 | Ready',
      cardItems: [{ cardValue: '', cardText: '[Print Label]' ,
      cardMessage: 'Error occurred while loading the widget. Please try again later' }]
    },
    {
      headerText: 'Door 4 | Ready',
      cardItems: [{ cardValue: '', cardText: '[Print Label]' ,
      cardMessage: 'Error occurred while loading the widget. Please try again later' }]
    },
    {
      headerText: 'Door 5 | Ready',
      cardItems: [{ cardValue: '', cardText: '[Print Label]' ,
      cardMessage: 'Error occurred while loading the widget. Please try again later' }]
    },
    {
      headerText: 'Door 6 | Ready',
      cardItems: [{ cardValue: '', cardText: '[Print Label]' ,
      cardMessage: 'Error occurred while loading the widget. Please try again later' }]
    }
  ];

  maxHeaderText = "Text";
  maxCardText = "Text";

  constructor() { }

  ngOnInit() {
  }

}
