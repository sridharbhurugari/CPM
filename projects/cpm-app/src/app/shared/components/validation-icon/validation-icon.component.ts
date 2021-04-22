import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-validation-icon',
  templateUrl: './validation-icon.component.html',
  styleUrls: ['./validation-icon.component.scss']
})
export class ValidationIconComponent implements OnInit {
  @Input()
  toastTileResourceKey: string;

  @Input()
  toastMsgResourceKey: string;

  @Input()
  iconString: string;

  @Input()
  iconTheme: 'dark';

  @Input()
  toastType: 'info' | 'warn' | 'error'

  @Input()
  iconHeight = 50;

  @Input()
  iconWidth = 50;

  constructor(
    private toastService: ToastService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  iconClicked() {
    if(!this.toastMsgResourceKey){
      return;
    }

    this.translate.get([ this.toastTileResourceKey, this.toastMsgResourceKey ]).subscribe(results => {
      if (this.toastType == 'error') {
        this.toastService.error(results[this.toastTileResourceKey], results[this.toastMsgResourceKey]);
        return;
      }

      if (this.toastType == 'warn') {
        this.toastService.warning(results[this.toastTileResourceKey], results[this.toastMsgResourceKey]);
        return;
      }

      if (this.toastType == 'info') {
        this.toastService.info(results[this.toastTileResourceKey], results[this.toastMsgResourceKey]);
        return;
      }
    });
  }
}
