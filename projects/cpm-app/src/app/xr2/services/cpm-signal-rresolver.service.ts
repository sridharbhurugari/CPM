/*import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CpmSignalRService } from './cpm-signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class CpmSignalRResolverService implements Resolve<any> {

  constructor(private cpmSignalRService: CpmSignalRService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.cpmSignalRService.init();
    return this.cpmSignalRService;
  }
}*/
