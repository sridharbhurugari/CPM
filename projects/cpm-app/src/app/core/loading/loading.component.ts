import { Component, OnInit } from '@angular/core';
import { OcAnimationSize } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loadingData = {
    supportingText: '',
    size: OcAnimationSize.large
  };

  constructor() { }

  ngOnInit() {
  }

}
