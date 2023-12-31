import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OcapUrlBuilderService } from "../../shared/services/ocap-url-builder.service";
import { OcapHttpHeadersService } from "../../shared/services/ocap-http-headers.service";
import { HttpClient } from "@angular/common/http";
import { Xr2StorageCapacityDetailsDisplay } from "../../xr2/model/xr2-storage-capacity-details-display";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class Xr2StorageCapacityDetailsDisplayService {
  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) {}

  public get(
    xr2DeviceId: string,
    pocketTypeId: string
  ): Observable<Xr2StorageCapacityDetailsDisplay[]> {
    const url = this.ocapUrlBuilderService.buildUrl(
      `/api/PocketUtilizationItemDetails`
    );
    const params = { xr2DeviceId: xr2DeviceId, pocketTypeId: pocketTypeId };

    let results = this.httpClient
      .get<Xr2StorageCapacityDetailsDisplay[]>(url, {
        headers: this.ocapHttpHeadersService.getHeaders(),
        params,
      })
      .pipe(
        map((r) => {
          r.forEach((e) => {
            // sort unknown as -1
            e.PacksizeSort = +e.Packsize || -1;
            e.OverstockSort = e.Overstock;
            if(e.OverstockSort === null ) {
              e.OverstockSort = -1;
            }

            // sort multidose as -2
            if (e.PacksizeSort === -1 && e.Packsize.length > 1 ) {
              e.PacksizeSort = -2;
              e.OverstockSort = -2;
            }
          });
          return r;
        })
      );
    return results;
  }
}
