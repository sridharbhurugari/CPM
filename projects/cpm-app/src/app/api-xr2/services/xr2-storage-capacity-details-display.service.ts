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
            e.OverstockSort = +e.Overstock || 0;
            e.PacksizeSort = +e.Packsize || 1;
            // sort multidose as 0
            if (e.PacksizeSort === 1 && e.Packsize.length > 1 ) {
              e.PacksizeSort = 0;
            }
          });
          return r;
        })
      );
    return results;
  }
}
