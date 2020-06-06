import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { QuickPickDrawer } from '../model/quick-pick-drawer';
import { QuickPickOrderItem } from '../model/quick-pick-order-item';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})
export class QuickPickPageComponent implements OnInit {

  quickpickDrawers: Observable<QuickPickDrawer>;
  quickpickOrderItems: Observable<QuickPickOrderItem>;


  constructor() {

    // Mock List - Query will be run here for Drawers

    // Mock List - Query will be run here for Orders
   }

  ngOnInit() {
  }

}
