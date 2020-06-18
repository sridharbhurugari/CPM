(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**********************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/app.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-app-layout>\r\n  <ng-container class='ocheader'>\r\n  </ng-container>\r\n\r\n  <ng-container class=\"ocprogressbar\">\r\n    <oc-progressbar></oc-progressbar>\r\n  </ng-container>\r\n</oc-app-layout>\r\n<oc-progress-animation #myLoader *ngIf=\"loading\" [data]=\"loadingData\"></oc-progress-animation>\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/device-sequence-order/device-sequence-order.component.html":
/*!*******************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/device-sequence-order/device-sequence-order.component.html ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-grid #ocgrid ocgridfilter=\"false\">\r\n    <ng-container class=\"ocgridheader\">\r\n      <div class=\"first\" ></div>\r\n      <div class=\"col description\">{{colHeader}}</div>\r\n    </ng-container>\r\n\r\n    <ng-container class=\"ocgridbody\" >\r\n      <div class=\"row\" *ngFor=\"let device of Devices\">\r\n        <div class=\"first\" style=\"align-items: center;\">\r\n        </div>\r\n        <div class=\"col\" [attr.data-title]=\"colHeader\">{{device.DeviceDescription}}</div>\r\n      </div>\r\n    </ng-container>\r\n</oc-grid>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/edit-device-sequence/edit-device-sequence.component.html":
/*!*****************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/edit-device-sequence/edit-device-sequence.component.html ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-grid appGridMultiSelect (selectionChanged)=\"onSelectionChanged($event)\" appGridReorder (orderChanged)=\"onOrderChanged($event)\" ocgridfilter=\"false\">\r\n    <ng-container class=\"ocgridheader\">\r\n        <div class=\"first\" data-colwrap=\"true\"></div>\r\n        <div class=\"col\">\r\n            {{'Device' | translate}}\r\n        </div>\r\n    </ng-container>\r\n    <ng-container class=\"ocgridbody\">\r\n        <div class=\"row\" *ngFor=\"let device of enabledDevices; let isFirst = first; let isLast = last\">\r\n            <div class=\"first\">\r\n                <oc-checkbox [isEnabled]=\"!disabled\" [valueField]=\"device\" [selected]=\"true\"></oc-checkbox>\r\n            </div>\r\n            <div style=\"flex-direction: row;\" class=\"col\" [attr.data-title]=\"'DEVICE' | translate\">\r\n                <div style=\"flex-grow: 1;\">\r\n                    <div style=\"display: flex; flex-direction: column; justify-content: center; min-height: 48px;\">\r\n                        {{device.DeviceDescription}}\r\n                    </div>\r\n                </div>\r\n                <app-row-reorder-buttons [disabled]=\"disabled\" [value]=\"device\" [upDisabled]=\"isFirst\" [downDisabled]=\"isLast\"></app-row-reorder-buttons>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\" *ngFor=\"let device of disabledDevices\">\r\n            <div class=\"first\">\r\n                <oc-checkbox [isEnabled]=\"!disabled\" [valueField]=\"device\" [selected]=\"false\"></oc-checkbox>\r\n            </div>\r\n            <div [attr.data-title]=\"'DEVICE' | translate\">\r\n                {{device.DeviceDescription}}\r\n            </div>\r\n        </div>\r\n    </ng-container>\r\n</oc-grid>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/edit-pick-route-page/edit-pick-route-page.component.html":
/*!*****************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/edit-pick-route-page/edit-pick-route-page.component.html ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-action-layout>\r\n    <ng-container class=\"ocactionheader\">\r\n        <div class=\"cpmactiontitle\">{{\"ROUTE_MAINTENANCE\" | translate}}</div>\r\n    </ng-container>\r\n    <ng-container class=\"ocactiondetails\">\r\n        <div class=\"cpmheaderrow\">\r\n           <div *ngIf=\"!isDefaultRoute\">\r\n              <app-header-title-bottom-margin-container [title]=\"'NAME' | translate\" >\r\n                 <input ocTextbox [ngModel]=\"newRouteName\" (ngModelChange)=\"onRouteNameChange($event)\" />\r\n              </app-header-title-bottom-margin-container>\r\n            </div>\r\n            <div *ngIf=\"isDefaultRoute\">\r\n               <app-header-container [title]=\"'NAME' | translate\" >{{newRouteName}}</app-header-container>\r\n            </div>\r\n        </div>\r\n        <div class=\"panelContainer\">\r\n            <div class=\"leftPanel\">\r\n                <oc-grid ocgridfilter=\"false\">\r\n                    <ng-container class=\"ocgridheader\">\r\n                        <div class=\"first\" data-colwrap=\"true\"></div>\r\n                        <div class=\"col\">{{'TYPE' | translate}}</div>\r\n                    </ng-container>\r\n                    <ng-container class=\"ocgridbody\">\r\n                        <div class=\"row\" *ngFor=\"let priorityCode of (pickRoute$ | async)?.AssignedPriorities\">\r\n                            <div class=\"first\"></div>\r\n                            <div class=\"col\" [attr.data-title]=\"'TYPE' | translate\">{{priorityCode}}</div>\r\n                        </div>\r\n                    </ng-container>\r\n                </oc-grid>\r\n            </div>\r\n            <div class=\"rightPanel\">\r\n                <app-edit-device-sequence [enabledDevices]=\"enabledDevices$ | async\" [disabledDevices]=\"disabledDevices$ | async\" (deviceSequenceChanged)=\"onDeviceSequenceChanged($event)\">\r\n                </app-edit-device-sequence>\r\n            </div>\r\n        </div>\r\n    </ng-container>\r\n    <ng-container class=\"ocactionfooter\">\r\n        <oc-footer>\r\n            <div class=\"ocleftalign\">\r\n                <oc-button-action [disabled]=\"requestStatus != 'none'\" [buttonText]=\"'BACK' | translate\" (click)=\"navigateBack()\"></oc-button-action>\r\n            </div>\r\n            <div class=\"ocrightalign\">\r\n                <oc-button-action *ngIf=\"!isDefaultRoute\"\r\n                    [disabled]=\"!canDelete || isDefaultRoute || !ocsIsHealthy\"\r\n                    [buttonText]=\"'DELETE' | translate\"\r\n                    (click)=\"delete()\"></oc-button-action>\r\n                <oc-button-action *ngIf=\"!isDefaultRoute\"\r\n                    [buttonIcon]=\"requestStatus == 'save' ? 'spin' : 'clear'\"\r\n                    [disabled]=\"(!newDeviceSequence || newDeviceSequence.length == 0) && !routeNameChanged || !ocsIsHealthy\"\r\n                    [buttonText]=\"'SAVE' | translate\"\r\n                    (click)=\"save()\"></oc-button-action>\r\n                <oc-button-action\r\n                    [buttonIcon]=\"requestStatus == 'saveAs' ? 'spin' : 'clear'\"\r\n                    [disabled]=\"(!newDeviceSequence || newDeviceSequence.length == 0) && !routeNameChanged || !ocsIsHealthy\"\r\n                    [buttonText]=\"'SAVE_AS' | translate\"\r\n                    (click)=\"saveAs()\"></oc-button-action>\r\n            </div>\r\n        </oc-footer>\r\n    </ng-container>\r\n</oc-action-layout>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.html":
/*!***********************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.html ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-action-layout *ngIf=\"displayCycleCountItem\">\r\n    <ng-container class=\"ocactionheader\">\r\n        <div class=\"cpmactiontitle\">{{ 'GUIDED_CYCLE_COUNT' | translate }}</div>\r\n        <div class=\"dateTime\">\r\n            {{time| date:'M/d/yyyy h:mm a'}}</div>\r\n            <div class=\"printlable\"\r\n        *ngIf=\"HasLabelPrinterConfigured()\">\r\n            <oc-svgicon icon=\"print\" theme=\"white\" height=\"30\" width=\"30\" (click)=\"PrintLabel()\"></oc-svgicon>\r\n        </div>\r\n        <div class=\"totalItemCount\">\r\n            <span>{{currentItemCount}} / {{itemCount}}</span></div>\r\n    </ng-container>\r\n\r\n    <ng-container class=\"ocactiondetails\">\r\n        <div class=\"displayGuidedCycleCount\">\r\n\r\n            <div class=\"BrandName\">\r\n                <div>{{ displayCycleCountItem.GenericNameFormatted }}<span *ngIf=\"CheckSafetyScanConfiguration()\"><img src=\"Scan.svg\"></span></div>\r\n            </div>\r\n            <div class=\"GenericName\">\r\n                <div>{{ displayCycleCountItem.BrandNameFormatted }}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"panelContainer1\">\r\n            <div class=\"itemIdBox\">\r\n\r\n                <div class=\"itemIdHeader\">\r\n                    <span>{{'ITEM_ID' | translate}}</span>\r\n                </div>\r\n                <div class=\"ItemId\">\r\n                    <span>{{ displayCycleCountItem.ItemId }}\r\n\r\n                    </span>\r\n                </div>\r\n            </div>\r\n            <div class=\"DeviceLocation\">\r\n                <div>\r\n                    <div class=\"itemIdHeader\">\r\n                        <span>{{'GUIDED_CYCLE_COUNT_LOCATION' | translate }}</span>\r\n                    </div>\r\n                    <div class=\"location\">\r\n                        <div class=\"locationdescription\">\r\n                            <div>\r\n                                {{ displayCycleCountItem.LocationDescription }}\r\n                            </div>\r\n                            <div>\r\n                            <span *ngIf=\"CheckSafetyScanConfiguration()\"><img src=\"Scan.svg\"></span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"devicelocationaccess\">\r\n                    <app-device-location-access [deviceLocationAccessData]=\"displayCycleCountItem\"\r\n                        [disabled]=\"carouselFaulted\" (isLeaseBusy)=\"handleLeaseBusyChanged($event)\"\r\n                        (isAccessBusy)=\"deviceLocationAccessBusy = $event\"\r\n                        (accessResult)=\"handleDeviceLocationAccessResult($event)\"></app-device-location-access>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ng-container>\r\n\r\n    <ng-container class=\"ocactiondetails\">\r\n        <div class=\"panelContainer\">\r\n\r\n            <div class=\"leftCycleCountPanel\">\r\n                <div class=\"leftPanelRow\"> {{\"IN_STOCK\" | translate}}\r\n                    <div class=\"textContent\">{{displayCycleCountItem.InStockQuantity}}\r\n                    </div>\r\n                </div>\r\n                <div class=\"whiteline\"></div>\r\n                <div class=\"leftPanelRow\"> {{\"PAR_LEVEL\" | translate}}\r\n                    <div class=\"textContent\">{{displayCycleCountItem.ParLevel}}\r\n                    </div>\r\n                </div>\r\n                <div class=\"whiteline\"></div>\r\n                <div class=\"leftPanelRow\">\r\n                    {{(displayCycleCountItem.ReorderSource == 'B' ? \"RESTOCK_LEVEL\" : \"REORDER_LEVEL\") | translate}}\r\n                    <div class=\"textContent\">\r\n                        {{displayCycleCountItem.ReorderSource == 'B' ? displayCycleCountItem.ReorderLevel:displayCycleCountItem.QuantityMin}}\r\n                    </div>\r\n                </div>\r\n                <div class=\"whiteline\"></div>\r\n\r\n                <div class=\"leftPanelRow\" *ngIf=\"!CheckItemExpGranularity()\">\r\n                    {{\"EXPIRATION_DATE\" | translate}}\r\n                    <div class=\"expiration\">\r\n                        <oc-datepicker id=\"datepicker\" [format]=\"displayCycleCountItem.ItemDateFormat\"\r\n                            [(ngModel)]=\"displayCycleCountItem.ExpirationDateFormatted\" [isRequired]=\"daterequired\"\r\n                            [autocorrect]=\"false\" [isDisabled]=\"disablethedate\" popupDirection=\"UP\"\r\n                            (ngModelChange)=onDateChange($event) [minDate]=\"todaydate\" [tabIndexes]=\"datepickerindexes\">\r\n                        </oc-datepicker>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"expirationwhiteline\" *ngIf=\"!CheckItemExpGranularity()\"></div>\r\n                <div class=expwhiteline *ngIf=\"CheckItemExpGranularity()\"></div>\r\n            </div>\r\n            <div class=\"rightCycleCountPanel\">\r\n                <div class=\"demo\">\r\n                    <oc-numeric [title]=\"'ITEM_QUANTITY' | translate\" [(ngModel)]=\"displayCycleCountItem.QuantityOnHand\"\r\n                        [minValue]=\"0\" [maxValue]=\"999999\" [units]=\"displayCycleCountItem.Units\" [autoCorrect]=\"true\"\r\n                        (valueChange)=\"onQuantityChange($event)\" [tabIndexes]=\"numericindexes\" id=\"numericElement\">\r\n                    </oc-numeric>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ng-container>\r\n    <ng-container class=\"ocactionfooter\">\r\n        <oc-footer>\r\n            <div class=\"ocleftalign\">\r\n                <oc-button-action [buttonText]=\"'CANCEL' | translate\" (click)=\"navigateBack()\" tabindex=\"-1\">\r\n                </oc-button-action>\r\n            </div>\r\n            <div class=\"buttonadjust\">\r\n                <div class=\"ocrightalign\">\r\n                    <oc-button-action [buttonText]=\"'SKIP' | translate\" (click)=\"navigateSkip()\" tabindex=\"6\"\r\n                        [disabled]=\"deviceLocationAccessBusy || carouselFaulted\"></oc-button-action>\r\n                    <oc-button-action id=\"nextbutton\" *ngIf=\"!isLastItem\" [buttonText]=\" 'NEXT' | translate \" (click)=\"navigateContinue()\"\r\n                        [disabled]=\"nextButtonDisable || deviceLocationAccessBusy || carouselFaulted\" tabindex=\"5\">\r\n                    </oc-button-action>\r\n                    <oc-button-action id=\"donebutton\" [buttonText]=\"'DONE' | translate\" (click)=\"navigateContinue()\"\r\n                        *ngIf=\"isLastItem\" [disabled]=\"doneButtonDisable\" [disabled]=\"doneButtonDisable || deviceLocationAccessBusy || carouselFaulted\"\r\n                        tabindex=\"5\"></oc-button-action>\r\n                </div>\r\n            </div>\r\n        </oc-footer>\r\n    </ng-container>\r\n\r\n</oc-action-layout>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.html":
/*!***********************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.html ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"ocactiondetails\">\r\n    <div class=\"cpmheaderrow\">          \r\n     <oc-button-action [buttonText]=\"'MANUAL_CYCLE_COUNT' | translate\" (click)=\"navigatemanualcyclecount()\" ></oc-button-action>     \r\n      <app-header-container></app-header-container>           \r\n      <oc-search-box class=\"searchbox\" #searchBox placeHolderText=\"Search\"></oc-search-box>\r\n    </div>\r\n  <ng-container>\r\n    <oc-grid #ocgrid ocgridfilter=\"false\">\r\n      <ng-container class=\"ocgridheader\">\r\n          <div class=\"first\" data-colwrap=\"true\"></div>\r\n          <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"500\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"devicePropertyName\"\r\n                               headerResourceKey=\"DEVICE\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n          </div>\r\n          <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"280\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"lastCycleCountPropertyName\"\r\n                               headerResourceKey=\"LAST_CYCLE_COUNT_DATE\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n          </div>\r\n          <div app-col-header-sortable class=\"last\" ocGridColResize data-width=\"280\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"earliestExpirationDatePropertyName\"\r\n                               headerResourceKey=\"EARLIEST_EXPIRATION_DATE\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n          </div>\r\n      </ng-container>\r\n      <ng-container class=\"ocgridbody\">\r\n        <div class=\"row\" *ngFor=\"let guidedDevice of (displayGuidedDeviceList$ | async) | searchPipe:searchTextFilter:searchFields\"\r\n          (click)=\"(guidedDevice.NumberOfLocationsWithOutdatedCycleCount > 0\r\n          || guidedDevice.NumberOfLocationsExpiringSoon > 0 ) && navigate(guidedDevice.DeviceId)\">\r\n            <div class=\"first\" style=\"align-items: center;\"></div>\r\n            <div class=\"col width-device\" [attr.data-title]=\"'DEVICE' | translate\">{{guidedDevice.DeviceDescription}}</div>\r\n            <div class=\"col width-lastcount\" [attr.data-title]=\"'LAST_CYCLE_COUNT_DATE' | translate\">\r\n              <div [ngPlural]=\"guidedDevice.NumberOfLocationsWithOutdatedCycleCount\">\r\n                  <ng-template ngPluralCase=\"=1\">{{guidedDevice.NumberOfLocationsWithOutdatedCycleCount}} {{'BIN' | translate}}</ng-template>\r\n                  <ng-template ngPluralCase=\"other\">{{guidedDevice.NumberOfLocationsWithOutdatedCycleCount}} {{'BINS' | translate}}</ng-template>\r\n              </div>\r\n            </div>\r\n            <div class=\"last width-exp\" [attr.data-title]=\"'EARLIEST_EXPIRATION_DATE' | translate\">\r\n              <div [ngPlural]=\"guidedDevice.NumberOfLocationsExpiringSoon\">\r\n                <ng-template ngPluralCase=\"=1\"> {{guidedDevice.NumberOfLocationsExpiringSoon}} {{'BIN' | translate}} </ng-template>\r\n                <ng-template ngPluralCase=\"other\"> {{guidedDevice.NumberOfLocationsExpiringSoon}} {{'BINS' | translate}} </ng-template>\r\n              </div>\r\n              <div class=\"cpmwarningtext\" *ngIf=\"guidedDevice.ContainsExpiredItem\">\r\n                Contains bins that are expired\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </ng-container>\r\n    </oc-grid>\r\n  </ng-container>\r\n</ng-container>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.html":
/*!***********************************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.html ***!
  \***********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-action-layout>\r\n    <ng-container class=\"ocactionheader\">\r\n        <div class=\"cpmactiontitle\">{{ 'CYCLE_COUNT' | translate }}</div>\r\n        <div class=\"dateTime\">\r\n            {{time| date:'M/d/yyyy h:mm a'}}\r\n        </div>\r\n    </ng-container>\r\n\r\n    <ng-container class=\"ocactiondetails\">\r\n        <div class=\"displayGuidedCycleCount\">\r\n            <div class=\"searchBar\">\r\n                <oc-search-dropdown id=\"requestorSearch\" #dropdownSearchUser [placeHolderText]='searchRequestorText'\r\n                    [columnTemplate]='columnTemplate.THREECOLUMN' [loadingText]=''\r\n                    [noResultsFoundText]='noResultsFoundText' [gridHeight]=\"'400px'\" [gridWidth]=\"'1250px'\"\r\n                    [columnsConfig]='columnsConfig' [searchBoxAlign]='searchBoxAlign.LEFT' [clearSearch]=\"true\"\r\n                    (itemSelected)='itemSelected($event)'></oc-search-dropdown>\r\n            </div>\r\n\r\n            <div class=\"BrandName\" *ngIf=\"displayCycleCountItem\">\r\n                <div>{{ displayCycleCountItem.GenericNameFormatted }}</div>\r\n            </div>\r\n            <div class=\"GenericName\" *ngIf=\"displayCycleCountItem\">\r\n                <div>{{ displayCycleCountItem.BrandNameFormatted }}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"panelContainer1\">\r\n            <div class=\"itemIdBox\">\r\n\r\n                <div class=\"itemIdHeader\">\r\n                    <span>{{'ITEM_ID' | translate}}</span>\r\n                </div>\r\n                <div class=\"ItemId\" *ngIf=\"displayCycleCountItem\">\r\n                    <span>{{ displayCycleCountItem.ItemId }}\r\n\r\n                    </span>\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"DeviceLocation\">\r\n                <div>\r\n                    <div class=\"itemIdHeader\">\r\n                        <span>{{'GUIDED_CYCLE_COUNT_LOCATION' | translate }}</span>\r\n                        <span *ngIf=\"isSingleSelectEnable\">-{{locationCount}}</span>\r\n                    </div>\r\n                    <div class=\"location\">\r\n                        <div class=\"locationdescription\" *ngIf=\"displayCycleCountItem\">\r\n                            <oc-singleselect #selection3 [tableData]=\"multiLocations\" selectedItem=\"{}\"\r\n                                componentWidth=\"750\" dropdownRowsVisible=\"6\"\r\n                                (selectionChanged)=\"onSelectionChanged($event)\" searchPlaceholderText=\"Find item\"\r\n                                selectText=\"Select item\" noItemsText=\"No Items\" *ngIf=\"isSingleSelectEnable\">\r\n                            </oc-singleselect>\r\n\r\n                            <div *ngIf=\"!isSingleSelectEnable\">\r\n                                {{ displayCycleCountItem.LocationDescription }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"devicelocationaccess\" *ngIf=displayCycleCountItem>\r\n                    <app-device-location-access [deviceLocationAccessData]=\"displayCycleCountItem\"\r\n                        [disabled]=\"carouselFaulted\" (isLeaseBusy)=\"handleLeaseBusyChanged($event)\"\r\n                        (isAccessBusy)=\"deviceLocationAccessBusy = $event\"\r\n                        (accessResult)=\"handleDeviceLocationAccessResult($event)\"></app-device-location-access>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </ng-container>\r\n\r\n    <ng-container class=\"ocactiondetails\">\r\n        <div class=\"panelContainer\">\r\n\r\n            <div class=\"leftCycleCountPanel\">\r\n                <div class=\"leftPanelRow\"> {{\"IN_STOCK\" | translate}}\r\n                    <div *ngIf=\"!isMultiLocation\">\r\n                        <div class=\"textContent\" *ngIf=\"displayCycleCountItem\">{{displayCycleCountItem.InStockQuantity}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"whiteline\"></div>\r\n                <div class=\"leftPanelRow\"> {{\"PAR_LEVEL\" | translate}}\r\n                    <div *ngIf=\"!isMultiLocation\">\r\n                        <div class=\"textContent\" *ngIf=\"displayCycleCountItem\">{{displayCycleCountItem.ParLevel}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"whiteline\"></div>\r\n                <div class=\"leftPanelRow\">\r\n                    <div *ngIf=\"!displayCycleCountItem\">\r\n                        {{\"REORDER_LEVEL\" | translate}}\r\n                    </div>\r\n                    <div *ngIf=\"displayCycleCountItem\">\r\n                        <div *ngIf=\"!isMultiLocation\">\r\n                            {{(displayCycleCountItem.ReorderSource == 'B' ? \"RESTOCK_LEVEL\" : \"REORDER_LEVEL\") | translate}}\r\n                            <div class=\"textContent\">\r\n                                {{displayCycleCountItem.ReorderSource == 'B' ? displayCycleCountItem.ReorderLevel:displayCycleCountItem.QuantityMin}}\r\n                            </div>\r\n                        </div>\r\n                        <div *ngIf=\"isMultiLocation\">\r\n                            {{\"REORDER_LEVEL\" | translate}}\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"whiteline\"></div>\r\n\r\n                <div class=\"leftPanelRow\" *ngIf=\"!CheckItemExpGranularity()\">\r\n                    <div *ngIf=\"!isMultiLocation\">\r\n                        {{\"EXPIRATION_DATE\" | translate}}\r\n                    </div>\r\n                    <div class=\"expiration\" *ngIf=\"!isMultiLocation\">\r\n                        <div *ngIf=\"displayCycleCountItem\">\r\n                            <oc-datepicker id=\"datepicker\" [format]=\"displayCycleCountItem.ItemDateFormat\"\r\n                                [(ngModel)]=\"displayCycleCountItem.ExpirationDateFormatted\" [isRequired]=\"daterequired\"\r\n                                [autocorrect]=\"false\" [isDisabled]=\"disablethedate\" popupDirection=\"UP\"\r\n                                (ngModelChange)=onDateChange($event) [minDate]=\"todaydate\"\r\n                                [tabIndexes]=\"datepickerindexes\">\r\n                            </oc-datepicker>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"expirationwhiteline\" *ngIf=\"!CheckItemExpGranularity()\"></div>\r\n                <div class=expwhiteline *ngIf=\"CheckItemExpGranularity()\"></div>\r\n            </div>\r\n            <div class=\"rightCycleCountPanel\">\r\n                <div class=\"demo\">\r\n                    <div *ngIf=\"!displayCycleCountItem\">\r\n                        <oc-numeric [title]=\"'ITEM_QUANTITY' | translate\">\r\n                        </oc-numeric>\r\n                    </div>\r\n                    <div *ngIf=\"displayCycleCountItem\">\r\n                        <div *ngIf=\"!isMultiLocation\">\r\n                            <oc-numeric [title]=\"'ITEM_QUANTITY' | translate\"\r\n                                [(ngModel)]=\"displayCycleCountItem.QuantityOnHand\" [minValue]=\"0\" [maxValue]=\"999999\"\r\n                                [units]=\"displayCycleCountItem.Units\" [autoCorrect]=\"true\"\r\n                                (valueChange)=\"onQuantityChange($event)\" [tabIndexes]=\"numericindexes\"\r\n                                id=\"numericElement\">\r\n                            </oc-numeric>\r\n                        </div>\r\n                        <div *ngIf=\"isMultiLocation\">\r\n                            <oc-numeric [title]=\"'ITEM_QUANTITY' | translate\">\r\n                            </oc-numeric>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ng-container>\r\n    <ng-container class=\"ocactionfooter\">\r\n        <oc-footer>\r\n            <div class=\"ocleftalign\">\r\n                <oc-button-action [buttonText]=\"'CANCEL' | translate\" (click)=\"navigateBack()\" tabindex=\"-1\">\r\n                </oc-button-action>\r\n            </div>\r\n            <div class=\"buttonadjust\">\r\n                <div class=\"ocrightalign\">\r\n                    <oc-button-action id=\"donebutton\" [buttonText]=\"'DONE' | translate\" (click)=\"navigateContinue()\"\r\n                        [disabled]=\"doneButtonDisable\"\r\n                        [disabled]=\"doneButtonDisable || deviceLocationAccessBusy || carouselFaulted\" tabindex=\"5\">\r\n                    </oc-button-action>\r\n                </div>\r\n            </div>\r\n        </oc-footer>\r\n    </ng-container>\r\n</oc-action-layout>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/hardware-lease-page/hardware-lease-page.component.html":
/*!***************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/hardware-lease-page/hardware-lease-page.component.html ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-action-layout>\r\n    <ng-container class=\"ocactionheader\">\r\n        <div class=\"cpmactiontitle\">{{ 'REQUEST_DEVICE_ACCESS' | translate}}</div>\r\n        <div class=\"dateTime\">\r\n            {{time | date:'M/d/yyyy h:mm a'}}</div>\r\n    </ng-container>\r\n\r\n     <ng-container class=\"ocactiondetails\">\r\n        <h3 class=\"description\">{{pageDescription$}}</h3>\r\n\r\n        <oc-grid #ocgrid ocgridfilter=\"false\">\r\n            <ng-container class=\"ocgridheader\">\r\n                <div class=\"first\" style=\"align-items: center;\"></div>\r\n                <div class=\"col width-device\" ocGridColResize [attr.data-width]=\"'350'\" >{{devicePropertyName | translate}}</div>\r\n                <div class=\"col width-device\" ocGridColResize [attr.data-width]=\"'500'\">{{deviceOwnerPropertyName | translate}}</div>\r\n            </ng-container>\r\n\r\n            <ng-container class=\"ocgridbody\">\r\n                <div class=\"row\" *ngFor=\"let device of displayDeviceConfigurationList\">\r\n                    <div class=\"first\" style=\"align-items: center;\"></div>\r\n                    <div class=\"col width-device\" [attr.data-title]=\"'devicePropertyName' | translate\">{{device.DeviceDescription}}</div>\r\n                    <div class=\"col width-device\" [attr.data-title]=\"'deviceOwnerPropertyName' | translate\">{{device.DefaultOwnerShortname}}</div>\r\n                </div>\r\n            </ng-container>\r\n\r\n        </oc-grid>\r\n    </ng-container>\r\n\r\n    <ng-container class=\"ocactionfooter\">\r\n        <oc-footer>\r\n            <div class=\"ocleftalign\">\r\n                <oc-button-action [buttonText]=\"'CANCEL' | translate\" [disabled]=\"disabledButtons\" (click)=\"navigateBack()\">}</oc-button-action>\r\n            </div>\r\n            <div class=\"ocrightalign\">\r\n                <oc-button-action [buttonText]=\"'GO' | translate\" [disabled]=\"disabledButtons\" [buttonIcon]=\"spinIcon\" (click)=\"requestAccessClick()\" >}</oc-button-action>\r\n            </div>\r\n        </oc-footer>\r\n    </ng-container>\r\n\r\n</oc-action-layout>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/item-management/item-management.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/item-management/item-management.component.html ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"ocactiondetails\">\r\n  <div class=\"cpmheaderrow\">\r\n    <app-header-container></app-header-container>\r\n    <oc-search-box class=\"searchbox\" #searchBox placeHolderText=\"Search\"></oc-search-box>\r\n  </div>\r\n  <ng-container>\r\n    <oc-grid #ocgrid ocgridfilter=\"false\">\r\n      <ng-container class=\"ocgridheader\">\r\n        <div class=\"first\" data-colwrap=\"true\"></div>\r\n        <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"500\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"itemDescriptionPropertyName\" headerResourceKey=\"DESCRIPTION_ID\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n        <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"250\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"unitDoseQtyOnHandPropertyName\" headerResourceKey=\"UNIT_DOSE_QOH\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n        <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"200\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"bulkQtyOnHandPropertyName\" headerResourceKey=\"BULK_QOH\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n        <div app-col-header-sortable class=\"last\" ocGridColResize data-width=\"200\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"totalQtyOnHandPropertyName\" headerResourceKey=\"TOTAL_QOH\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n      </ng-container>\r\n      <ng-container class=\"ocgridbody\">\r\n        <div class=\"row\"\r\n          *ngFor=\"let itemManagement of (ItemManagements$ | async) | searchPipe:searchTextFilter:searchFields\"\r\n          (click)=\"navigate(itemManagement.ItemId)\">\r\n          <div class=\"first\" style=\"align-items: center;\"></div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'DESCRIPTION_ID' | translate\">\r\n            <span>{{itemManagement.ItemDescription}}</span>\r\n            <span>{{itemManagement.ItemId}}</span>\r\n          </div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'UNIT_DOSE_QOH' | translate\" style=\"text-align: center;\">\r\n            <span>{{itemManagement.UnitDoseQtyOnHand}} {{itemManagement.UnitsOfIssue}}</span>\r\n            <div [ngPlural]=\"itemManagement.UnitDoseLocationCount\" class=\"umFont\">\r\n              <ng-template ngPluralCase=\"=1\">{{itemManagement.UnitDoseLocationCount}} {{'BIN_LOCATION' | translate}}\r\n              </ng-template>\r\n              <ng-template ngPluralCase=\"other\">{{itemManagement.UnitDoseLocationCount}} {{'BIN_LOCATIONS' | translate}}\r\n              </ng-template>\r\n            </div>\r\n          </div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'BULK_QOH' | translate\" style=\"text-align: center;\">\r\n            <span>{{itemManagement.BulkQtyOnHand}}</span>\r\n            <span class=\"umFont\">{{itemManagement.UnitsOfIssue}}</span>\r\n          </div>\r\n          <div class=\"last width-type\" [attr.data-title]=\"'TOTAL_QOH' | translate\" style=\"text-align: center;\">\r\n            <span>{{itemManagement.TotalQtyOnHand}}</span>\r\n            <span class=\"umFont\">{{itemManagement.UnitsOfIssue}}</span>\r\n          </div>\r\n        </div>\r\n      </ng-container>\r\n    </oc-grid>\r\n  </ng-container>\r\n</ng-container>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/pick-route-select/pick-route-select.component.html":
/*!***********************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/pick-route-select/pick-route-select.component.html ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-grid #ocgrid ocgridfilter=\"false\">\r\n    <ng-container class=\"ocgridheader\">\r\n      <div class=\"first\" ></div>\r\n      <div class=\"col\">{{colDescription}}</div>\r\n    </ng-container>\r\n\r\n    <ng-container class=\"ocgridbody\" >\r\n      <div class=\"row selectionRow\" *ngFor=\"let item of listMap | keyvalue\"\r\n      [id] = \"item.key\"\r\n      (click)=\"selectionChanged(item.key)\">\r\n        <div class=\"first\" style=\"align-items: center;\">\r\n          <div class=\"radio-container\" >\r\n            <div class=\"radio-item\" >\r\n              <input\r\n              id='{{item.key.PickRouteId}}'\r\n              class=\"ocRadioButton\"\r\n              name='{{groupName}}'\r\n              type='radio'\r\n              [value]='item.key'\r\n              [(ngModel)] = 'selectedItem'\r\n              [disabled]=false\r\n              />\r\n              <label class='' for='{{item.key}}'>\r\n                  <div class=\"radiomark\"></div>\r\n                  <div class=\"labeltext\"></div>\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col\" [attr.data-title]=\"colDescription\">{{item.value}}</div>\r\n      </div>\r\n    </ng-container>\r\n</oc-grid>\r\n\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.html":
/*!*************************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.html ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-priority-code-pick-routes [priorityCodePickRoutes]=\"priorityCodePickRoutes$ | async\"></app-priority-code-pick-routes>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.html":
/*!***************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.html ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"cpmgridheader\">\r\n  <oc-search-box #searchBox [placeHolderText]=\"'ENTER_TEXT' | translate\"></oc-search-box>\r\n</div>\r\n<oc-grid #ocgrid ocgridfilter=\"false\">\r\n  <ng-container class=\"ocgridheader\">\r\n    <div class=\"first\"></div>\r\n    <div class=\"col width-type\">{{'TYPE' | translate}}</div>\r\n    <div class=\"col width=id\">{{'ROUTE_NAME' | translate}}</div>\r\n  </ng-container>\r\n  <ng-container class=\"ocgridbody\">\r\n    <div class=\"row\" *ngFor=\"let priorityCodePickRoute of priorityCodePickRoutes | searchPipe:searchTextFilter:searchFields\"\r\n     (click)=\"navigate(priorityCodePickRoute.PriorityCodePickRouteId)\">\r\n      <div class=\"first\" style=\"align-items: center;\">\r\n        <div class=\"firstcolumncolorblock\" [style.background-color]=\"priorityCodePickRoute.PriorityColorCode\"></div>\r\n      </div>\r\n      <div class=\"col\" [attr.data-title]=\"'TYPE' | translate\">{{priorityCodePickRoute.PriorityCodeDescription}}</div>\r\n      <div class=\"col\" [attr.data-title]=\"'ROUTE_NAME' | translate\">{{priorityCodePickRoute.PickRouteDescription}}</div>\r\n    </div>\r\n  </ng-container>\r\n</oc-grid>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.html":
/*!*************************************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.html ***!
  \*************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-action-layout>\r\n    <ng-container class=\"ocactionheader\">\r\n        <div class=\"cpmactiontitle\">{{\"ROUTE_ASSIGNMENT\" | translate}}</div>\r\n    </ng-container>\r\n    <ng-container class=\"ocactiondetails\">\r\n        <div class=\"cpmheaderrow\">\r\n            <app-header-container [title]=\"'TYPE' | translate\">{{(priorityCode$ | async)?.PriorityCodeDescription}}</app-header-container>\r\n        </div>\r\n      </ng-container>\r\n        <ng-container class=\"ocactiondetails\">\r\n        <div class=\"panelContainer\" >\r\n            <div class=\"leftPanel\" >\r\n               <app-pick-route-select\r\n               (SelectionChange)=\"pickrouteUpdated($event)\"\r\n               [listMap]=\"routeList | async\"\r\n               [selectedItem]=\"pickRoute\"\r\n               [colDescription]=\"'ROUTE_NAME' | translate\"\r\n               >\r\n              </app-pick-route-select>\r\n            </div>\r\n            <div class=\"rightPanel\" >\r\n                <app-device-sequence-order\r\n                [Devices]=\"deviceList$ | async\"\r\n                [colHeader] =\"'DEVICE' | translate\">\r\n               </app-device-sequence-order>\r\n            </div>\r\n          </div>\r\n    </ng-container>\r\n    <ng-container class=\"ocactionfooter\">\r\n        <oc-footer>\r\n            <div class=\"ocleftalign\">\r\n                <oc-button-action [disabled]=\"saveInProgress\" [buttonText]=\"'BACK' | translate\" (click)=\"navigateBack()\"></oc-button-action>\r\n            </div>\r\n            <div class=\"ocrightalign\">\r\n                <oc-button-action [routerLink]=\"['/pickRoutes', routerLinkPickRouteId]\" [buttonText]=\"'MAINTENANCE' | translate\"\r\n                    [disabled]=\"saveInProgress || !isEditAvailable || !ocsIsHealthy\"></oc-button-action>\r\n                <oc-button-action [buttonIcon]=\"saveInProgress ? 'spin' : 'clear'\" [buttonText]=\"'SAVE' | translate\" [disabled]=\"saveInProgress || !canSave || !ocsIsHealthy\" (click)=\"save()\"></oc-button-action>\r\n            </div>\r\n       </oc-footer>\r\n    </ng-container>\r\n</oc-action-layout>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.html":
/*!***************************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.html ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-action-layout>\r\n    <ng-container class=\"ocactionheader\">\r\n        <div class=\"cpmactiontitle\">{{(picklist$ | async)?.PriorityDescription}}</div>\r\n    </ng-container>\r\n    <ng-container class=\"ocactiondetails\">\r\n        <div class=\"cpmheaderrow\">\r\n            <app-header-container [title]=\"'ID' | translate\">{{(picklist$ | async)?.OrderId}}</app-header-container>\r\n            <app-header-container [title]=\"'ROUTE' | translate\">{{(picklist$ | async)?.RouteName}}</app-header-container>\r\n            <app-header-container [title]=\"'DATE' | translate\">\r\n                {{(picklist$ | async)?.OrderDate | date:'shortDate'}}\r\n                {{(picklist$ | async)?.OrderDate | date:'mediumTime'}}\r\n            </app-header-container>\r\n        </div>\r\n        <app-underfilled-picklist-lines [picklistLines]=\"picklistLines$ | async\"></app-underfilled-picklist-lines>\r\n    </ng-container>\r\n    <ng-container class=\"ocactionfooter\">\r\n        <oc-footer>\r\n            <div class=\"ocleftalign\">\r\n                <oc-button-action [buttonText]=\"'CANCEL' | translate\" (click)=\"navigateBack()\">}</oc-button-action>\r\n            </div>\r\n        </oc-footer>\r\n    </ng-container>\r\n</oc-action-layout>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.html":
/*!*****************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.html ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-grid #ocgrid ocgridfilter=\"false\">\r\n  <ng-container class=\"ocgridheader\">\r\n    <div class=\"first\" data-colwrap=\"true\"></div>\r\n    <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"450\" data-colwrap=\"true\"\r\n      [columnPropertyName]='descriptionPropertyName' headerResourceKey='DESCRIPTION_ID'\r\n      [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n    </div>\r\n    <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"194\" data-colwrap=\"true\"\r\n      [columnPropertyName]='descriptionPropertyName' headerResourceKey='PHARMACY_QOH'\r\n      [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n    </div>\r\n    <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"250\" data-colwrap=\"true\"\r\n      [columnPropertyName]='destinationPropertyName' headerResourceKey='DESTINATION'\r\n      [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n    </div>\r\n    <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"140\" data-colwrap=\"true\"\r\n      [columnPropertyName]='qtyFillReqPropertyName' headerResourceKey='QTY_FILLED_REQUESTED'\r\n      [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n    </div>\r\n    <div app-col-header-sortable class=\"last\" ocGridColResize data-width=\"150\" data-colwrap=\"true\"\r\n      [columnPropertyName]='fillDatePropertyName' headerResourceKey='DATE_COMPLETED'\r\n      [currentSortPropertyName]=\"currentSortPropertyName\" (columnSelected)=\"columnSelected($event)\">\r\n    </div>\r\n  </ng-container>\r\n  <ng-container class=\"ocgridbody\">\r\n    <div class=\"row\" *ngFor=\"let picklistLine of picklistLines\">\r\n      <div class=\"first\">\r\n      </div>\r\n      <div class=\"col\" [attr.data-title]=\"'DESCRIPTION_ID' | translate\">\r\n        <span>{{picklistLine.ItemFormattedGenericName}}</span>\r\n        <span>{{picklistLine.ItemBrandName}}</span>\r\n        <span>{{picklistLine.ItemId}}</span>\r\n      </div>\r\n      <div class=\"col\" [attr.data-title]=\"'PHARMACY_QOH' | translate\" style=\"text-align: center;\">\r\n        <span>{{picklistLine.PharmacyQOH}}</span>\r\n      </div>\r\n      <div class=\"col\" [attr.data-title]=\"'DESTINATION' | translate\">\r\n        <div *ngIf=\"picklistLine.DisplayPatientRoomAndArea\">\r\n          <span>{{picklistLine.PatientRoom}}{{'COMMA_SEPARATOR' | translate}}</span>\r\n          <span> {{picklistLine.AreaDescription}}</span>\r\n        </div>\r\n        <div *ngIf=\"picklistLine.DisplayPatientRoom\">\r\n          {{picklistLine.PatientRoom}}\r\n        </div>\r\n        <div *ngIf=\"picklistLine.DisplayArea\">\r\n          {{picklistLine.AreaDescription}}\r\n        </div>\r\n        <div *ngIf=\"picklistLine.DisplayOmniName\">\r\n          {{picklistLine.DestinationOmni}}\r\n        </div>\r\n        <div *ngIf=\"picklistLine.DisplayPatientNameSecondLine\">\r\n          {{picklistLine.PatientName}}\r\n        </div>\r\n      </div>\r\n      <div class=\"col\" [attr.data-title]=\"'QTY_FILLED_REQUESTED' | translate\" style=\"text-align: center;\">\r\n        {{picklistLine.FillQuantity}} / {{picklistLine.OrderQuantity}}\r\n      </div>\r\n      <div class=\"last\" [attr.data-title]=\"'DATE_COMPLETED' | translate\">\r\n        <div>{{picklistLine.FillDate | date: 'shortDate'}}</div>\r\n        <div>{{picklistLine.FillDate | date: 'mediumTime'}}</div>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n</oc-grid>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.html":
/*!*****************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.html ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-underfilled-picklists [picklists]=\"picklists | async\"></app-underfilled-picklists>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklists/underfilled-picklists.component.html":
/*!*******************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/core/underfilled-picklists/underfilled-picklists.component.html ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"cpmheaderrow\">          \r\n  <app-header-container></app-header-container>           \r\n  <oc-search-box #searchBox [placeHolderText]=\"'ENTER_TEXT' | translate\"></oc-search-box>\r\n</div>\r\n<oc-grid #ocgrid ocgridfilter=\"false\">\r\n  <ng-container class=\"ocgridheader\">\r\n      <div app-col-header-sortable class=\"first\" data-colwrap=\"true\"\r\n                               [columnPropertyName]='sequencePropertyName'\r\n                               headerResourceKey=''\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n      </div>\r\n      <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"160\" data-colwrap=\"true\"\r\n                               [columnPropertyName]='typePropertyName'\r\n                               headerResourceKey='TYPE'\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n      </div>\r\n      <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"180\" data-colwrap=\"true\"\r\n                               [columnPropertyName]='orderPropertyName'\r\n                               headerResourceKey='ORDER_ID'\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n      </div>\r\n      <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"414\" data-colwrap=\"true\"\r\n                               [columnPropertyName]='descriptionPropertyName'\r\n                               headerResourceKey='DESCRIPTION'\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n      </div>\r\n      <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"270\" data-colwrap=\"true\"\r\n                               [columnPropertyName]='destinationPropertyName'\r\n                               headerResourceKey='DESTINATION'\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n      </div>\r\n      <div app-col-header-sortable class=\"last\" ocGridColResize data-width=\"160\" data-colwrap=\"true\"\r\n                               [columnPropertyName]='datePropertyName'\r\n                               headerResourceKey='DATE'\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               (columnSelected)=\"columnSelected($event)\">\r\n      </div>\r\n  </ng-container>\r\n  <ng-container class=\"ocgridbody\">\r\n    <div class=\"row\" *ngFor=\"let picklist of picklists | searchPipe:searchTextFilter:searchFields\" (click)=\"navigate(picklist.OrderId)\">\r\n      <div class=\"first\" style=\"align-items: center;\">\r\n        <div class=\"firstcolumncolorblock\" [style.background-color]=\"picklist.PriorityColorCode\"></div>\r\n      </div>\r\n      <div class=\"col width-type\" [attr.data-title]=\"'TYPE' | translate\">{{picklist.PriorityDescription}}</div>\r\n      <div class=\"col width-id\" [attr.data-title]=\"'ORDER_ID' | translate\">{{picklist.OrderId}}</div>\r\n      <div class=\"col width-description\" [attr.data-title]=\"'DESCRIPTION' | translate\">\r\n        <div *ngIf=\"picklist.DisplayGenericName\">{{picklist.ItemFormattedGenericName}}</div>\r\n        <div *ngIf=\"picklist.DisplayBrandName\">{{picklist.ItemBrandName}}</div>\r\n        <div *ngIf=\"picklist.DisplayItemCount\">\r\n          <span>{{picklist.UnderfilledItemCountDisplay}}</span>\r\n        </div>\r\n        <div *ngIf=\"picklist.DisplayRouteName\">{{picklist.RouteName}}</div>\r\n      </div>\r\n      <div class=\"col width-destination\" [attr.data-title]=\"'DESTINATION' | translate\">\r\n        <div *ngIf=\"picklist.DisplayPatientCount\">\r\n          <div>\r\n            <span>{{picklist.UnderfilledPatientCountDisplay}}</span>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"picklist.DisplayPatientRoomAndArea\">\r\n            <span>{{picklist.PatientRoom}}{{'COMMA_SEPARATOR' | translate}}</span>\r\n            <span> {{picklist.AreaDescription}}</span>\r\n        </div>\r\n        <div *ngIf=\"picklist.DisplayPatientRoom\">\r\n          {{picklist.PatientRoom}}\r\n        </div>\r\n        <div *ngIf=\"picklist.DisplayArea\">\r\n          {{picklist.AreaDescription}}\r\n        </div>\r\n        <div *ngIf=\"picklist.DisplayMultiDestination\">\r\n            <span>{{picklist.UnderfilledDestinationCountDisplay}}</span>\r\n        </div>\r\n        <div *ngIf=\"picklist.DisplayOmniName\">\r\n          {{picklist.DestinationOmni}}\r\n        </div>\r\n        <div *ngIf=\"picklist.DisplayPatientNameSecondLine\">\r\n          {{picklist.PatientName}}\r\n        </div>\r\n      </div>\r\n      <div class=\"last width-date\" [attr.data-title]=\"'DATE' | translate\">\r\n        <div>{{picklist.CompletedDate | date: 'shortDate'}}</div>\r\n        <div>{{picklist.CompletedDate | date: 'shortTime'}}</div>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n</oc-grid>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/col-header-sortable/col-header-sortable.component.html":
/*!****************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/col-header-sortable/col-header-sortable.component.html ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"headertext\">\r\n    <div *ngIf=\"headerResourceKey\">{{headerResourceKey | translate}}</div>\r\n</span>\r\n<span class=\"headericon\">\r\n    <div *ngIf=\"currentSortPropertyName == columnPropertyName\">\r\n        <oc-svgicon *ngIf=\"IsSortAscending\" icon=\"up\" theme=\"white\"></oc-svgicon>\r\n        <oc-svgicon *ngIf=\"IsSortDescending\" icon=\"down\" theme=\"white\"></oc-svgicon>\r\n    </div>\r\n</span>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/confirm-popup/confirm-popup.component.html":
/*!****************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/confirm-popup/confirm-popup.component.html ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-popupwindow-layout [windowFooter]=\"true\">\r\n  <ng-container class=\"ocwindowheader\">\r\n    <div>{{data.headerResourceKey | translate}}</div>\r\n  </ng-container>\r\n  <ng-container class=\"ocwindowcontent\">\r\n    <p>\r\n      {{data.confirmTextboxResourceKey | translate}}\r\n    </p>\r\n  </ng-container>\r\n  <ng-container class=\"ocwindowfooter\">\r\n  <oc-footer>\r\n    <div class=\"ocleftalign\">\r\n      <oc-button-action [buttonText]=\"'CANCEL' | translate\" (click) =\"cancel()\"></oc-button-action>\r\n    </div>\r\n    <div class=\"ocrightalign\">\r\n      <oc-button-action [buttonText]=\"'CONFIRM' | translate\" (click) =\"continue()\"></oc-button-action>\r\n    </div>\r\n  </oc-footer>\r\n</ng-container>\r\n</oc-popupwindow-layout>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/device-location-access/device-location-access.component.html":
/*!**********************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/device-location-access/device-location-access.component.html ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"accessbutton ocbtn secondary\" *ngIf=\"displayButton\" (click)=\"accessLocation()\" [disabled]=\"disabled || deviceLocationAccessBusy\">\r\n    <svg *ngIf=\"!deviceLocationAccessBusy\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\r\n        y=\"0px\" viewBox=\"0 0 36 36\" class=\"repositionicon\" xml:space=\"preserve\">\r\n        <g>\r\n            <path class=\"st0\" d=\"M34,15v19H11V15H34 M36,13H9v23h27V13L36,13z\" />\r\n            <rect x=\"14\" y=\"25\" class=\"st0\" width=\"17\" height=\"2\" />\r\n            <rect x=\"14\" y=\"29\" class=\"st0\" width=\"17\" height=\"2\" />\r\n            <rect x=\"21\" y=\"32\" class=\"st0\" width=\"3\" height=\"1\" />\r\n            <path class=\"st0\" d=\"M22,13c0,6.1-4.9,11-11,11C4.9,24,0,19.1,0,13C0,6.9,4.9,2,11,2C17.1,2,22,6.9,22,13z\" />\r\n            <path class=\"st1\"\r\n                d=\"M18,6v1h-1v0.9c-1.5-1.6-3.7-2.6-6-2.6c-4.4,0-8,3.5-8,7.7c0,4.3,3.6,7.7,8,7.7c2.5,0,4.7-1.1,6.3-2.9L18,17\r\n    \t\th-3.8l-0.1,0.1c-0.9,0.6-2,1-3.1,1c-2.9,0-5.3-2.3-5.3-5S8.1,8,11,8c1.5,0,3,0.7,4,1.7V10h-1v1h-1v1h6v-1v-1V9V8V7V6H18z\" />\r\n        </g>\r\n    </svg>\r\n    <oc-svgicon *ngIf=\"deviceLocationAccessBusy\" icon=\"spin\" theme=\"white\"></oc-svgicon>\r\n</button>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/header-container/header-container.component.html":
/*!**********************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/header-container/header-container.component.html ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"cpmheadercontainer\">\r\n    <div class=\"cpmheadertitle\">\r\n        {{title}}\r\n    </div>\r\n    <div class=\"cpmheadervalue\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.html":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.html ***!
  \**************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"cpmheadercontainer\">\r\n  <div class=\"cpmheadertitle\">\r\n      {{title}}\r\n  </div>\r\n  <div class=\"cpmheadervalue\">\r\n      <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.html":
/*!****************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.html ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-button-action class=\"reorderBtnLeft\" [buttonIcon]=\"'up'\" mode=\"secondary\" (click)=\"onUpClicked()\" [disabled]=\"disabled || upDisabled\"></oc-button-action>\r\n<oc-button-action [buttonIcon]=\"'down'\" mode=\"secondary\" (click)=\"onDownClicked()\" [disabled]=\"disabled || downDisabled\"></oc-button-action>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/spinner-popup/spinner-popup.component.html":
/*!****************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/spinner-popup/spinner-popup.component.html ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-svgicon icon=\"spin\" width=\"64\" height=\"64\"></oc-svgicon>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/shared/components/text-result-popup/text-result-popup.component.html":
/*!************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/shared/components/text-result-popup/text-result-popup.component.html ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-popupwindow-layout [windowFooter]=\"true\">\r\n    <ng-container class=\"ocwindowheader\">\r\n      <div>{{data.headerResourceKey | translate}}</div>\r\n    </ng-container>\r\n    <ng-container class=\"ocwindowcontent\">\r\n      <p *ngIf=\"beforeTextboxResourceKey\">\r\n        {{beforeTextboxResourceKey | translate}}\r\n      </p>\r\n      <oc-textbox #nameInput [placeholder]=\"placeholderTextResourceKey | translate\" (valueUpdated)=\"textValueChanged($event)\"></oc-textbox>\r\n      <p *ngIf=\"afterTextboxResourceKey\">\r\n        {{afterTextboxResourceKey | translate}}\r\n      </p>\r\n    </ng-container>\r\n    <ng-container class=\"ocwindowfooter\">\r\n    <oc-footer>\r\n      <div class=\"ocleftalign\">\r\n        <oc-button-action [buttonText]=\"'CANCEL' | translate\" (click) =\"cancel()\"></oc-button-action>\r\n      </div>\r\n      <div class=\"ocrightalign\">\r\n        <oc-button-action [disabled]=\"!textValue\" [buttonText]=\"'CONFIRM' | translate\" (click) =\"continue()\"></oc-button-action>\r\n      </div>\r\n    </oc-footer>\r\n  </ng-container>\r\n</oc-popupwindow-layout>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.html ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"ocactiondetails\">\r\n  <div class=\"cpmheaderrow\">          \r\n    <app-header-container></app-header-container>           \r\n    <oc-search-box class=\"searchbox\" #searchBox [placeHolderText]=\" 'SEARCH_TEXT_DISPLAY' | translate \"></oc-search-box>\r\n  </div>\r\n  <ng-container>\r\n    <oc-grid #ocgrid ocgridfilter=\"false\">\r\n      <ng-container class=\"ocgridheader\">\r\n          <div class=\"first\" data-colwrap=\"true\"></div>\r\n          <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"150\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"trayIDPropertyName\"\r\n                               headerResourceKey=\"XR2_EXCEPTIONS_TRAY_ID\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               [customColumnSortOrder]=\"sortOrder\"\r\n                               (columnSelected)=\"columnSelected($event)\"\r\n                                >\r\n          </div>\r\n          <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"250\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"trayTypePropertyName\"\r\n                               headerResourceKey=\"XR2_EXCEPTIONS_TRAY_TYPE\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               [customColumnSortOrder]=\"sortOrder\" \r\n                               (columnSelected)=\"columnSelected($event)\"\r\n                               >\r\n          </div>\r\n          <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"260\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"exceptionPocketsPropertyName\"\r\n                               headerResourceKey=\"XR2_EXCEPTIONS_POCKETS\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               [customColumnSortOrder]=\"sortOrder\"\r\n                               (columnSelected)=\"columnSelected($event)\"\r\n                                >\r\n          </div>\r\n          <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"230\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"deviceNamePropertyName\"\r\n                               headerResourceKey=\"XR2_EXCEPTIONS_DEVICE_NAME\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               [customColumnSortOrder]=\"sortOrder\"\r\n                               (columnSelected)=\"columnSelected($event)\" \r\n                                >\r\n          </div>\r\n          <div app-col-header-sortable class=\"last\" ocGridColResize data-width=\"230\" data-colwrap=\"true\"\r\n                               [columnPropertyName]=\"completedDatePropertyName\"\r\n                               headerResourceKey=\"XR2_EXCEPTIONS_COMPLETED_DATE\"\r\n                               [currentSortPropertyName]=\"currentSortPropertyName\"\r\n                               [customColumnSortOrder]=\"sortOrder\"\r\n                               (columnSelected)=\"columnSelected($event)\"\r\n                               >\r\n          </div>\r\n      </ng-container>\r\n      <ng-container class=\"ocgridbody\">\r\n        <div class=\"row\" *ngFor=\"let exceptions of (displayExceptionsList$ | async) | searchPipe:searchTextFilter:searchFields\"\r\n        (click)=\"navigatedetailspage(exceptions)\" >\r\n            <div class=\"first\" style=\"align-items: center;\"></div>\r\n            <div class=\"col col-trayid\" [attr.data-title]=\"'XR2_EXCEPTIONS_TRAY_ID' | translate\">{{exceptions.TrayID}}</div>\r\n            <div class=\"col col-traytype\" [attr.data-title]=\"'XR2_EXCEPTIONS_TRAY_DESCRIPTION' | translate\">{{exceptions.TrayDescription}}</div>\r\n            <div class=\"col col-pockets\" [attr.data-title]=\"'XR2_EXCEPTIONS_POCKETS' | translate\">{{exceptions.ExceptionPockets}} Pockets</div>\r\n            <div class=\"col col-device-name\" [attr.data-title]=\"'XR2_EXCEPTIONS_DEVICE_NAME' | translate\"> {{exceptions.DeviceName}}\r\n            </div>\r\n            <div class=\"last width-completed-date\" [attr.data-title]=\"'XR2_EXCEPTIONS_COMPLETED_DATE' | translate\">{{exceptions.CompletedDateTime | date:'M/d/yyyy h:mm:ss a'}}\r\n            </div>\r\n          </div>\r\n      </ng-container>\r\n    </oc-grid>\r\n  </ng-container>\r\n</ng-container>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/xr2/picklists-queue-page/picklists-queue-page.component.html":
/*!****************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/xr2/picklists-queue-page/picklists-queue-page.component.html ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-picklists-queue [picklistQueueItems]=\"picklistsQueueItems | async\"></app-picklists-queue>\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/xr2/picklists-queue/picklists-queue.component.html":
/*!******************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/xr2/picklists-queue/picklists-queue.component.html ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <ng-container class=\"ocactiondetails\">\r\n    <div class=\"cpmheaderrow\">\r\n      <app-header-container></app-header-container>\r\n      <oc-search-box #searchBox [placeHolderText]=\"'ENTER_TEXT' | translate\"></oc-search-box>\r\n    </div>\r\n    <oc-grid #ocgrid ocgridfilter=\"false\">\r\n      <ng-container class=\"ocgridheader\">\r\n        <div class=\"first\" data-colwrap=\"true\"></div>\r\n        <div class=\"col width-type\" ocGridColResize data-width=\"400\" data-colwrap=\"true\">{{'DESTINATION' | translate}}\r\n        </div>\r\n        <div class=\"col width-type\" data-width=\"100\" data-colwrap=\"true\">{{'ITEMS' | translate}}</div>\r\n        <div class=\"col width-type\" data-width=\"160\" data-colwrap=\"true\">{{'STATUS' | translate}}\r\n        </div>\r\n        <div class=\"col width-destination\" data-width=\"270\" data-colwrap=\"true\">{{'DEVICE' | translate}}\r\n        </div>\r\n        <div class=\"last width-type\" data-width=\"350\" data-colwrap=\"true\">{{'ACTIONS' | translate}}</div>\r\n      </ng-container>\r\n      <ng-container class=\"ocgridbody\">\r\n        <div class=\"row\"\r\n          *ngFor=\"let picklistQueueItem of picklistQueueItems | searchPipe:searchTextFilter:searchFields\">\r\n          <div class=\"first\" style=\"align-items: center;\">\r\n            <div class=\"firstcolumncolorblock\" [style.background-color]=\"picklistQueueItem.PriorityCodeColor\"></div>\r\n          </div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'DESTINATION' | translate\">\r\n            <span>{{picklistQueueItem.Destination}}</span>\r\n            <span>{{picklistQueueItem.PriorityCode}}</span>\r\n          </div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'ITEMS' | translate\">{{picklistQueueItem.ItemCount}}</div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'STATUS' | translate\" *ngIf=\"picklistQueueItem.Status===1\">\r\n            {{'NOTSENT' | translate}}</div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'STATUS' | translate\" *ngIf=\"picklistQueueItem.Status===2\">\r\n            {{'PROCESSING' | translate}}</div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'STATUS' | translate\"\r\n            *ngIf=\"picklistQueueItem.Status===3 || picklistQueueItem.Status===4\">{{picklistQueueItem.FilledBoxCount}}\r\n            {{'OF' | translate}} {{picklistQueueItem.BoxCount}}</div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'DEVICE' | translate\">\r\n            <span>{{picklistQueueItem.DeviceDescription}}</span>\r\n            <oc-singleselect\r\n            popupDirection=\"AUTO\"\r\n            [disabled] = \"picklistQueueItem.Status > 1\"\r\n            [tableData] = \"getActiveOutputDeviceList(picklistQueueItem)\"\r\n            [selectedItem] = \"getSelectedOutputDeviceRow(picklistQueueItem)\"\r\n            (selectionChanged)=\"onOutputDeviceSelectionChanged($event, picklistQueueItem)\">\r\n            </oc-singleselect>\r\n          </div>\r\n          <div class=\"col width-type\" [attr.data-title]=\"'ACTIONS' | translate\">\r\n            <div class=\"btn-group\">\r\n              <oc-button-action [buttonText]=\"'SKIP' | translate\" (click)=\"reroute(picklistQueueItem)\"\r\n              [disabled]=\"picklistQueueItem.Saving\" class=\"skip-button\">\r\n              </oc-button-action>\r\n              <oc-button-action *ngIf=\"picklistQueueItem.Status===1\" [buttonText]=\"'RELEASE' | translate\"\r\n                (click)=\"sendToRobot(picklistQueueItem)\" [disabled]=\"picklistQueueItem.Saving || !getSelectedOutputDeviceRow(picklistQueueItem)\"></oc-button-action>\r\n              <oc-button-action *ngIf=\"picklistQueueItem.Status===2 || picklistQueueItem.Status===3\"\r\n                [buttonText]=\"'PRINT' | translate\" (click)=\"printLabels(picklistQueueItem)\"\r\n                [disabled]=\"picklistQueueItem.Saving || picklistQueueItem.Status===2 || picklistQueueItem.OutputDeviceId !== '200'\"></oc-button-action>\r\n              <oc-button-action *ngIf=\"picklistQueueItem.Status===4\" [buttonText]=\"'REPRINT' | translate\"\r\n                (click)=\"printLabels(picklistQueueItem)\" [disabled]=\"picklistQueueItem.Saving\"></oc-button-action>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </ng-container>\r\n    </oc-grid>\r\n  </ng-container>\r\n\r\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/xr2/xr2-exception-details-page/Xr2-Exception-details-page.component.html":
/*!****************************************************************************************************************************************************************!*\
  !*** C:/Users/7178/source/repos/CPM-AngularLibrary/node_modules/raw-loader!./src/app/xr2/xr2-exception-details-page/Xr2-Exception-details-page.component.html ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<oc-action-layout>\r\n  <ng-container class=\"ocactionheader\">\r\n    <div class=\"cpmactiontitle\">{{ 'XR2_EXCEPTIONS_DETAILS_HEADER' | translate }}</div>\r\n </ng-container>\r\n<ng-container class=\"ocactiondetails\">\r\n  <div class=\"cpmheaderrow\">\r\n    <app-header-container>\r\n    <div class=\"ocheaderarea\">\r\n      <table>\r\n        <thead>\r\n       <tr>\r\n        <th class=\"trayidheader\">{{trayIDHeader$}}</th>\r\n        <th class=\"traytypeheader\">{{trayTypeHeader$}}</th>\r\n        <th class=\"devicenameheader\">{{deviceNameHeader$}}</th>\r\n        <th class=\"completeddateheader\">{{completedDateHeader$}}</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td class=\"trayidtext\">{{trayID}}</td>\r\n        <td class=\"traytypetext\">{{trayType}}</td>\r\n        <td class=\"devicenametext\">{{deviceName}}</td>\r\n        <td class=\"completeddatetext\">{{completedDate | date:'M/d/yyyy h:mm:ss a'}}</td>\r\n    </tr>\r\n  </tbody>\r\n  </table>\r\n    </div>\r\n  </app-header-container>\r\n  </div>\r\n  <ng-container>\r\n    <oc-grid #ocgrid ocgridfilter=\"false\">\r\n      <ng-container class=\"ocgridheader\">\r\n        <div class=\"first\" data-colwrap=\"true\"></div>\r\n        <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"250\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"reasonPropertyName\" headerResourceKey=\"XR2_EXCEPTIONS_DETAILS_REASON\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" \r\n          (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n        <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"100\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"rowProperyName\" headerResourceKey=\"XR2_EXCEPTIONS_DETAILS_ROW\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" \r\n          (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n        <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"140\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"columnPropertyName\" headerResourceKey=\"XR2_EXCEPTIONS_DETAILS_COLUMN\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" \r\n          (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n        <div app-col-header-sortable class=\"col\" ocGridColResize data-width=\"410\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"itemDescriptionPropertyName\" headerResourceKey=\"XR2_EXCEPTIONS_DETAILS_ITEMDESCRIPTION\"\r\n          >\r\n        </div>\r\n        <div app-col-header-sortable class=\"last\" ocGridColResize data-width=\"220\" data-colwrap=\"true\"\r\n          [columnPropertyName]=\"barcodeNDCPropertyName\" headerResourceKey=\"XR2_EXCEPTIONS_DETAILS_BARCODE_NDC\"\r\n          [currentSortPropertyName]=\"currentSortPropertyName\" \r\n          (columnSelected)=\"columnSelected($event)\">\r\n        </div>\r\n      </ng-container>\r\n      <ng-container class=\"ocgridbody\">\r\n        <div class=\"row\"\r\n          *ngFor=\"let exceptions of (displayExceptionDetailList$ | async)\">\r\n          <div class=\"first\" style=\"align-items: center;\"></div>\r\n          <div class=\"col col-reson\" [attr.data-title]=\"'XR2_EXCEPTIONS_DETAILS_REASON' | translate\">{{exceptions.Reason}}\r\n          </div>\r\n          <div class=\"col col-row\" style=\"align-items: center;\" [attr.data-title]=\"'XR2_EXCEPTIONS_DETAILS_ROW' | translate\">\r\n            {{exceptions.PocketRow}}</div>\r\n          <div class=\"col col-column\" style=\"align-items: center;\" [attr.data-title]=\"'XR2_EXCEPTIONS_DETAILS_COLUMN' | translate\">\r\n            {{exceptions.PocketColumn}}</div>\r\n          <div class=\"col col-description\" [attr.data-title]=\"'XR2_EXCEPTIONS_DETAILS_ITEMDESCRIPTION' | translate\">\r\n            {{exceptions.ItemDescription}} <br>\r\n            {{exceptions.ItemID}}\r\n          </div>\r\n          <div class=\"last col-width-barcode\" [attr.data-title]=\"'XR2_EXCEPTIONS_DETAILS_BARCODE_NDC' | translate\">\r\n            {{exceptions.BarCode }}\r\n          </div>\r\n        </div>\r\n      </ng-container>\r\n    </oc-grid>\r\n  </ng-container>\r\n</ng-container>\r\n<ng-container class=\"ocactionfooter\">\r\n  <oc-footer>\r\n      <div class=\"ocleftalign\">\r\n          <oc-button-action [buttonText]=\"'BACK' | translate\" (click)=\"navigateBack()\" tabindex=\"-1\">\r\n          </oc-button-action>\r\n      </div>\r\n    </oc-footer>\r\n  </ng-container>\r\n</oc-action-layout>"

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api-core/api-core.module.ts":
/*!*********************************************!*\
  !*** ./src/app/api-core/api-core.module.ts ***!
  \*********************************************/
/*! exports provided: ApiCoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiCoreModule", function() { return ApiCoreModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");



let ApiCoreModule = class ApiCoreModule {
};
ApiCoreModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ]
    })
], ApiCoreModule);



/***/ }),

/***/ "./src/app/api-core/data-contracts/device-operation-outcome.ts":
/*!*********************************************************************!*\
  !*** ./src/app/api-core/data-contracts/device-operation-outcome.ts ***!
  \*********************************************************************/
/*! exports provided: DeviceOperationOutcome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceOperationOutcome", function() { return DeviceOperationOutcome; });
var DeviceOperationOutcome;
(function (DeviceOperationOutcome) {
    /// The device operation succeeded.
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_Successful"] = 0] = "DeviceOperationOutcome_Successful";
    /// <summary>
    /// The device is not leased to client.
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_DeviceNotLeasedToClient"] = 1] = "DeviceOperationOutcome_DeviceNotLeasedToClient";
    /// <summary>
    /// The device is either offline or not found.
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_DeviceOfflineOrNotFound"] = 2] = "DeviceOperationOutcome_DeviceOfflineOrNotFound";
    /// <summary>
    /// The device is configured as inactive.
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_DeviceInactive"] = 3] = "DeviceOperationOutcome_DeviceInactive";
    /// <summary>
    /// Generic message that the device does not require a lease
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_DeviceLeaseNotRequired"] = 4] = "DeviceOperationOutcome_DeviceLeaseNotRequired";
    /// <summary>
    /// A pending lease request already exists for device.
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_PendingLeaseRequestExistsForDevice"] = 5] = "DeviceOperationOutcome_PendingLeaseRequestExistsForDevice";
    /// <summary>
    /// Items are currently assigned to the device
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_ItemsAssignedToDevice"] = 6] = "DeviceOperationOutcome_ItemsAssignedToDevice";
    /// <summary>
    /// Generic message that the device operation was unsuccessful
    /// </summary>
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOperationOutcome_Unsuccessful"] = 7] = "DeviceOperationOutcome_Unsuccessful";
})(DeviceOperationOutcome || (DeviceOperationOutcome = {}));


/***/ }),

/***/ "./src/app/api-core/data-contracts/guided-cycle-count-print-label.ts":
/*!***************************************************************************!*\
  !*** ./src/app/api-core/data-contracts/guided-cycle-count-print-label.ts ***!
  \***************************************************************************/
/*! exports provided: GuidedCycleCountPrintLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedCycleCountPrintLabel", function() { return GuidedCycleCountPrintLabel; });
class GuidedCycleCountPrintLabel {
    constructor(guidedCycleCountPrintLabel) {
        Object.assign(this, guidedCycleCountPrintLabel);
    }
}
GuidedCycleCountPrintLabel.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/api-core/data-contracts/guided-cycle-count-update.ts":
/*!**********************************************************************!*\
  !*** ./src/app/api-core/data-contracts/guided-cycle-count-update.ts ***!
  \**********************************************************************/
/*! exports provided: deviceCycleCountItemUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceCycleCountItemUpdate", function() { return deviceCycleCountItemUpdate; });
class deviceCycleCountItemUpdate {
    constructor(deviceCycleCountItemUpdate) {
        Object.assign(this, deviceCycleCountItemUpdate);
    }
}
deviceCycleCountItemUpdate.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/api-core/data-contracts/guided-manual-cycle-count-itemid.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/api-core/data-contracts/guided-manual-cycle-count-itemid.ts ***!
  \*****************************************************************************/
/*! exports provided: GuidedManualCycleCountItemid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedManualCycleCountItemid", function() { return GuidedManualCycleCountItemid; });
class GuidedManualCycleCountItemid {
    constructor(manualcyclecountitem) {
        Object.assign(this, manualcyclecountitem);
        this.DeviceLocationAccessQuantity = this.QuantityOnHand;
        this.DeviceLocationAccessUnits = this.Units;
        this.ItemTradeName = this.ItemTradeName;
        this.ItemGenericNameFormatted = this.GenericNameFormatted;
    }
}
GuidedManualCycleCountItemid.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/api-core/data-contracts/lease-verification-request.ts":
/*!***********************************************************************!*\
  !*** ./src/app/api-core/data-contracts/lease-verification-request.ts ***!
  \***********************************************************************/
/*! exports provided: LeaseVerificationRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaseVerificationRequest", function() { return LeaseVerificationRequest; });
class LeaseVerificationRequest {
}


/***/ }),

/***/ "./src/app/api-core/data-contracts/lease-verification-result.ts":
/*!**********************************************************************!*\
  !*** ./src/app/api-core/data-contracts/lease-verification-result.ts ***!
  \**********************************************************************/
/*! exports provided: LeaseVerificationResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaseVerificationResult", function() { return LeaseVerificationResult; });
var LeaseVerificationResult;
(function (LeaseVerificationResult) {
    LeaseVerificationResult[LeaseVerificationResult["Success"] = 0] = "Success";
    LeaseVerificationResult[LeaseVerificationResult["Failure"] = 1] = "Failure";
})(LeaseVerificationResult || (LeaseVerificationResult = {}));


/***/ }),

/***/ "./src/app/api-core/data-contracts/request-hardware-lease-request.ts":
/*!***************************************************************************!*\
  !*** ./src/app/api-core/data-contracts/request-hardware-lease-request.ts ***!
  \***************************************************************************/
/*! exports provided: RequestHardwareLeaseRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestHardwareLeaseRequest", function() { return RequestHardwareLeaseRequest; });
class RequestHardwareLeaseRequest {
}


/***/ }),

/***/ "./src/app/api-core/services/carousel-commands.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/api-core/services/carousel-commands.service.ts ***!
  \****************************************************************/
/*! exports provided: CarouselCommandsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselCommandsService", function() { return CarouselCommandsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let CarouselCommandsService = class CarouselCommandsService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    moveToShelf(requestCorrelationId, deviceId, shelfNumber) {
        let url = this.ocapUrlBuilderService.buildUrl('/api/carousel/go');
        let headers = this.ocapHttpHeadersService.getHeaders();
        let moveRequest = {
            RequestId: requestCorrelationId.toString(),
            DeviceId: deviceId,
            Shelf: shelfNumber,
        };
        return this.httpClient.post(url, moveRequest, {
            headers: headers
        });
    }
    clearLightbar(requestCorrelationId, deviceId) {
        let url = this.ocapUrlBuilderService.buildUrl('/api/carousel/clearDisplay');
        let headers = this.ocapHttpHeadersService.getHeaders();
        let clearRequest = {
            RequestId: requestCorrelationId.toString(),
            DeviceId: deviceId,
        };
        return this.httpClient.post(url, clearRequest, {
            headers: headers
        });
    }
    displayLightbar(requestCorrelationId, deviceId, binNumber, slotNumber, itemDisplay, quantityDisplay, unitsDisplay) {
        let url = this.ocapUrlBuilderService.buildUrl('/api/carousel/displayGuidanceText');
        let headers = this.ocapHttpHeadersService.getHeaders();
        let displayRequest = {
            RequestId: requestCorrelationId.toString(),
            DeviceId: deviceId,
            Bin: binNumber,
            Slot: slotNumber,
            Quantity: quantityDisplay,
            Description: itemDisplay,
            Units: unitsDisplay,
        };
        return this.httpClient.post(url, displayRequest, {
            headers: headers
        });
    }
};
CarouselCommandsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
CarouselCommandsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CarouselCommandsService);



/***/ }),

/***/ "./src/app/api-core/services/core-event-connection.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/api-core/services/core-event-connection.service.ts ***!
  \********************************************************************/
/*! exports provided: CoreEventConnectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreEventConnectionService", function() { return CoreEventConnectionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/event-connection.service */ "./src/app/shared/services/event-connection.service.ts");




let CoreEventConnectionService = class CoreEventConnectionService {
    constructor(eventConnectionService) {
        this.eventConnectionService = eventConnectionService;
        this.ocsIsHealthySubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.deviceOperationResultEventSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.deviceLeaseGrantedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.deviceLeaseDeniedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.carouselFaultedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.carouselReadySubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.startedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.eventConnectionService.receivedSubject.subscribe(message => this.eventHandlers(message));
        this.eventConnectionService.startedSubject.subscribe(() => this.startedSubject.next());
    }
    eventHandlers(message) {
        if (message === undefined) {
            return;
        }
        if (message.EventId === undefined) {
            if (message.$type.includes('DeviceOperationResultEvent')) {
                this.deviceOperationResultEventSubject.next({
                    DeviceId: message.DeviceId,
                    IsExpired: message.IsExpired,
                    IsSuccessful: message.IsSuccessful,
                    ResultId: message.ResultId,
                });
            }
            if (message.$type.includes('HardwareLeaseGrantedEvent')) {
                this.deviceLeaseGrantedSubject.next({
                    DeviceId: message.DeviceId,
                    RequestId: message.RequestId,
                });
            }
            if (message.$type.includes('HardwareLeaseDeniedEvent')) {
                this.deviceLeaseDeniedSubject.next({
                    DeviceId: message.DeviceId,
                    RequestId: message.RequestId,
                });
            }
            if (message.$type.includes('CarouselIsReadyEvent')) {
                this.carouselReadySubject.next({ DeviceId: message.DeviceId });
            }
            if (message.$type.includes('CarouselFaultedEvent')) {
                this.carouselFaultedSubject.next({ DeviceId: message.DeviceId });
            }
            if (message.$type.includes('OcsAvailableEvent')) {
                this.ocsIsHealthySubject.next(true);
            }
            if (message.$type.includes('OcsUnavailableEvent')) {
                this.ocsIsHealthySubject.next(false);
            }
            return;
        }
        if (message.EventId === 'Ocs2Available') {
            this.ocsIsHealthySubject.next(true);
            return;
        }
        if (message.EventId === 'Ocs2Unavailable') {
            this.ocsIsHealthySubject.next(false);
            return;
        }
        if (message.EventId === 'DeviceOperationResultEvent') {
            this.deviceOperationResultEventSubject.next({
                DeviceId: message.DeviceId,
                IsExpired: message.IsExpired,
                IsSuccessful: message.IsSuccessful,
                ResultId: message.ResultId,
            });
        }
        if (message.EventId === 'HardwareLeaseGrantedEvent') {
            this.deviceLeaseGrantedSubject.next({
                DeviceId: message.DeviceId,
                RequestId: message.RequestId,
            });
        }
        if (message.EventId === 'HardwareLeaseDeniedEvent') {
            this.deviceLeaseDeniedSubject.next({
                DeviceId: message.DeviceId,
                RequestId: message.RequestId,
            });
        }
        if (message.EventId === 'CarouselIsReadyEvent') {
            this.carouselReadySubject.next({ DeviceId: message.DeviceId });
        }
        if (message.EventId === 'CarouselFaultedEvent') {
            this.carouselFaultedSubject.next({ DeviceId: message.DeviceId });
        }
    }
};
CoreEventConnectionService.ctorParameters = () => [
    { type: _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_3__["EventConnectionService"] }
];
CoreEventConnectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CoreEventConnectionService);



/***/ }),

/***/ "./src/app/api-core/services/devices.service.ts":
/*!******************************************************!*\
  !*** ./src/app/api-core/services/devices.service.ts ***!
  \******************************************************/
/*! exports provided: DevicesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevicesService", function() { return DevicesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let DevicesService = class DevicesService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get() {
        var url = this.ocapUrlBuilderService.buildUrl('/api/cpmDevices');
        var headers = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.get(url, {
            headers: headers
        });
    }
};
DevicesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
DevicesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DevicesService);



/***/ }),

/***/ "./src/app/api-core/services/guided-cycle-count-service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/api-core/services/guided-cycle-count-service.ts ***!
  \*****************************************************************/
/*! exports provided: GuidedCycleCountService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedCycleCountService", function() { return GuidedCycleCountService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let GuidedCycleCountService = class GuidedCycleCountService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get(deviceId) {
        var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount`);
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    post(deviceId, item) {
        var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/update`);
        return this.httpClient.post(url, item, {
            headers: this.ocapHttpHeadersService.getHeaders(),
        });
    }
    PrintLabel(deviceId, binData) {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/PrintLabel`);
        return this.httpClient.post(url, binData, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
GuidedCycleCountService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
GuidedCycleCountService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], GuidedCycleCountService);



/***/ }),

/***/ "./src/app/api-core/services/guided-device-list-service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/api-core/services/guided-device-list-service.ts ***!
  \*****************************************************************/
/*! exports provided: GuidedDeviceListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedDeviceListService", function() { return GuidedDeviceListService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let GuidedDeviceListService = class GuidedDeviceListService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get() {
        var url = this.ocapUrlBuilderService.buildUrl('/api/devices/itemLocations/cycleCountSummaries');
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
GuidedDeviceListService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
GuidedDeviceListService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], GuidedDeviceListService);



/***/ }),

/***/ "./src/app/api-core/services/guided-manual-cycle-count-service.service.ts":
/*!********************************************************************************!*\
  !*** ./src/app/api-core/services/guided-manual-cycle-count-service.service.ts ***!
  \********************************************************************************/
/*! exports provided: GuidedManualCycleCountServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedManualCycleCountServiceService", function() { return GuidedManualCycleCountServiceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let GuidedManualCycleCountServiceService = class GuidedManualCycleCountServiceService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get(itemid) {
        let url = this.ocapUrlBuilderService.buildUrl(`/api/devices/itemLocations/cycleCount/${itemid}`);
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    post(deviceId, item) {
        let url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/update`);
        return this.httpClient.post(url, item, {
            headers: this.ocapHttpHeadersService.getHeaders(),
        });
    }
    getSearchItems(searchString) {
        let url = this.ocapUrlBuilderService.buildUrl('/api/devices/itemLocations/cycleCountSearchItems');
        const params = { searchString: searchString };
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders(), params
        });
    }
};
GuidedManualCycleCountServiceService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
GuidedManualCycleCountServiceService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], GuidedManualCycleCountServiceService);



/***/ }),

/***/ "./src/app/api-core/services/hardware-lease-event-connection.service.ts":
/*!******************************************************************************!*\
  !*** ./src/app/api-core/services/hardware-lease-event-connection.service.ts ***!
  \******************************************************************************/
/*! exports provided: HardwareLeaseEventConnectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardwareLeaseEventConnectionService", function() { return HardwareLeaseEventConnectionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _shared_services_ocap_http_configuration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-configuration.service */ "./src/app/shared/services/ocap-http-configuration.service.ts");
/* harmony import */ var _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/event-connection.service */ "./src/app/shared/services/event-connection.service.ts");





let HardwareLeaseEventConnectionService = class HardwareLeaseEventConnectionService {
    constructor(eventConnectionService, ocapConfigurationService) {
        this.eventConnectionService = eventConnectionService;
        this.ocapConfigurationService = ocapConfigurationService;
        this.hardwareLeaseDeniedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.hardwareLeaseGrantedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.setClientId();
        this.eventConnectionService.receivedSubject.subscribe(message => this.configureHardwareLeaseHandlers(message));
    }
    setClientId() {
        const configuration = this.ocapConfigurationService.get();
        console.log('ClientId found : ' + configuration.clientId);
        this.clientId = configuration.clientId;
    }
    configureHardwareLeaseHandlers(message) {
        console.log(message);
        if (message === undefined) {
            return;
        }
        if (message.EventId === undefined) {
            if (message.ClientId === this.clientId) {
                console.log('Matching Client Id triggering event subscription');
                if (message.$type.includes('HardwareLeaseGrantedEvent')) {
                    this.hardwareLeaseGrantedSubject.next();
                }
                else if (message.$type.includes('HardwareLeaseDeniedEvent')) {
                    this.hardwareLeaseDeniedSubject.next();
                }
            }
        }
    }
};
HardwareLeaseEventConnectionService.ctorParameters = () => [
    { type: _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_4__["EventConnectionService"] },
    { type: _shared_services_ocap_http_configuration_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpConfigurationService"] }
];
HardwareLeaseEventConnectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], HardwareLeaseEventConnectionService);



/***/ }),

/***/ "./src/app/api-core/services/hardware-lease-service.ts":
/*!*************************************************************!*\
  !*** ./src/app/api-core/services/hardware-lease-service.ts ***!
  \*************************************************************/
/*! exports provided: HardwareLeaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardwareLeaseService", function() { return HardwareLeaseService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _data_contracts_lease_verification_request__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data-contracts/lease-verification-request */ "./src/app/api-core/data-contracts/lease-verification-request.ts");
/* harmony import */ var _data_contracts_request_hardware_lease_request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data-contracts/request-hardware-lease-request */ "./src/app/api-core/data-contracts/request-hardware-lease-request.ts");







let HardwareLeaseService = class HardwareLeaseService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    HasDeviceLease(deviceId) {
        const leaseVerificationReq = new _data_contracts_lease_verification_request__WEBPACK_IMPORTED_MODULE_5__["LeaseVerificationRequest"]();
        leaseVerificationReq.DeviceId = deviceId;
        const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/VerifyLease`);
        return this.httpClient.post(url, leaseVerificationReq, {
            headers: this.ocapHttpHeadersService.getHeaders(),
        });
    }
    RequestDeviceLease(deviceId) {
        console.log(deviceId);
        const requestHardwareLeaseRequest = new _data_contracts_request_hardware_lease_request__WEBPACK_IMPORTED_MODULE_6__["RequestHardwareLeaseRequest"]();
        requestHardwareLeaseRequest.DeviceId = deviceId;
        const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/requestLease`);
        return this.httpClient.post(url, requestHardwareLeaseRequest, {
            headers: this.ocapHttpHeadersService.getHeaders(),
        });
    }
    RequestDeviceLeaseCorrelate(requestCorrelationId, deviceId) {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/requestLease`);
        const request = {
            RequestId: requestCorrelationId.toString(),
            DeviceId: deviceId,
        };
        return this.httpClient.post(url, request, {
            headers: this.ocapHttpHeadersService.getHeaders(),
        });
    }
    getDeviceConfiguration(deviceId) {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/configuration`);
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
HardwareLeaseService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
HardwareLeaseService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], HardwareLeaseService);



/***/ }),

/***/ "./src/app/api-core/services/item-management.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/api-core/services/item-management.service.ts ***!
  \**************************************************************/
/*! exports provided: ItemManagementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemManagementService", function() { return ItemManagementService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let ItemManagementService = class ItemManagementService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get() {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/ItemManagement`);
        const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
        const result = this.httpClient.get(url, {
            headers: serviceHeaders
        });
        return result;
    }
};
ItemManagementService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
ItemManagementService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ItemManagementService);



/***/ }),

/***/ "./src/app/api-core/services/ocs-status.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/api-core/services/ocs-status.service.ts ***!
  \*********************************************************/
/*! exports provided: OcsStatusService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OcsStatusService", function() { return OcsStatusService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let OcsStatusService = class OcsStatusService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    requestStatus() {
        const url = this.ocapUrlBuilderService.buildUrl('/api/ocsService/status');
        const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.get(url, { headers: serviceHeaders });
    }
};
OcsStatusService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
OcsStatusService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], OcsStatusService);



/***/ }),

/***/ "./src/app/api-core/services/pick-routes.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/api-core/services/pick-routes.service.ts ***!
  \**********************************************************/
/*! exports provided: PickRoutesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickRoutesService", function() { return PickRoutesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let PickRoutesService = class PickRoutesService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get(pickRouteId) {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes/${pickRouteId}`);
        const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.get(url, {
            headers: serviceHeaders
        });
    }
    save(pickRouteGuid, pickRouteDescription, deviceSequence) {
        const deviceSequenceDataContracts = deviceSequence.map(x => {
            return { DeviceId: x.DeviceId, Sequence: x.SequenceOrder };
        });
        const body = {
            PickRouteGuid: pickRouteGuid,
            Description: pickRouteDescription,
            DeviceSequence: deviceSequenceDataContracts
        };
        const url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes`);
        const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.put(url, body, { headers: serviceHeaders });
    }
    saveAs(pickRouteDescription, deviceSequence) {
        const deviceSequenceDataContracts = deviceSequence.map(x => {
            return { DeviceId: x.DeviceId, Sequence: x.SequenceOrder };
        });
        const body = {
            Description: pickRouteDescription,
            DeviceSequence: deviceSequenceDataContracts
        };
        const url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes`);
        const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.post(url, body, { headers: serviceHeaders });
    }
    delete(pickRouteGuid) {
        var url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes/${pickRouteGuid}`);
        var headers = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.delete(url, { headers: headers });
    }
};
PickRoutesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
PickRoutesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], PickRoutesService);



/***/ }),

/***/ "./src/app/api-core/services/priority-code-pick-routes.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/api-core/services/priority-code-pick-routes.service.ts ***!
  \************************************************************************/
/*! exports provided: PriorityCodePickRoutesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityCodePickRoutesService", function() { return PriorityCodePickRoutesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");





let PriorityCodePickRoutesService = class PriorityCodePickRoutesService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get() {
        var url = this.ocapUrlBuilderService.buildUrl('/api/priorityCodePickRoutes');
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    getPriority(priorityCodePickRouteId) {
        var url = this.ocapUrlBuilderService.buildUrl(`/api/priorityCodePickRoutes/${priorityCodePickRouteId}`);
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
PriorityCodePickRoutesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpHeadersService"] }
];
PriorityCodePickRoutesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], PriorityCodePickRoutesService);



/***/ }),

/***/ "./src/app/api-core/services/priority-code-route-assignments.service.ts":
/*!******************************************************************************!*\
  !*** ./src/app/api-core/services/priority-code-route-assignments.service.ts ***!
  \******************************************************************************/
/*! exports provided: PriorityCodeRouteAssignmentsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityCodeRouteAssignmentsService", function() { return PriorityCodeRouteAssignmentsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");





let PriorityCodeRouteAssignmentsService = class PriorityCodeRouteAssignmentsService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    getRoutes() {
        const url = this.ocapUrlBuilderService.buildUrl('/api/PickRoutes');
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    save(pickRouteGuid, priorityCode) {
        const body = {
            PriorityCode: priorityCode,
            PickRouteGuid: pickRouteGuid,
        };
        const url = this.ocapUrlBuilderService.buildUrl(`/api/priorityCodePickRoutes`);
        const headers = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.put(url, body, { headers });
    }
};
PriorityCodeRouteAssignmentsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpHeadersService"] }
];
PriorityCodeRouteAssignmentsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], PriorityCodeRouteAssignmentsService);



/***/ }),

/***/ "./src/app/api-core/services/underfilled-picklist-lines.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/api-core/services/underfilled-picklist-lines.service.ts ***!
  \*************************************************************************/
/*! exports provided: UnderfilledPicklistLinesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklistLinesService", function() { return UnderfilledPicklistLinesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");





let UnderfilledPicklistLinesService = class UnderfilledPicklistLinesService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get(orderId) {
        var encodedOrderId = encodeURIComponent(orderId);
        var url = this.ocapUrlBuilderService.buildUrl(`/api/picklists/underfilled/picklistLines?orderId=${encodedOrderId}`);
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
UnderfilledPicklistLinesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpHeadersService"] }
];
UnderfilledPicklistLinesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UnderfilledPicklistLinesService);



/***/ }),

/***/ "./src/app/api-core/services/underfilled-picklists.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/api-core/services/underfilled-picklists.service.ts ***!
  \********************************************************************/
/*! exports provided: UnderfilledPicklistsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklistsService", function() { return UnderfilledPicklistsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");





let UnderfilledPicklistsService = class UnderfilledPicklistsService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get() {
        var url = this.ocapUrlBuilderService.buildUrl('/api/picklists/underfilled');
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    getForOrder(orderId) {
        var encodedOrderId = encodeURIComponent(orderId);
        var url = this.ocapUrlBuilderService.buildUrl(`/api/picklists/underfilled/order?orderId=${encodedOrderId}`);
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
UnderfilledPicklistsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_4__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpHeadersService"] }
];
UnderfilledPicklistsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UnderfilledPicklistsService);



/***/ }),

/***/ "./src/app/api-xr2/api-xr2.module.ts":
/*!*******************************************!*\
  !*** ./src/app/api-xr2/api-xr2.module.ts ***!
  \*******************************************/
/*! exports provided: ApiXr2Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiXr2Module", function() { return ApiXr2Module; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");



let ApiXr2Module = class ApiXr2Module {
};
ApiXr2Module = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ]
    })
], ApiXr2Module);



/***/ }),

/***/ "./src/app/api-xr2/data-contracts/global-dispense-sync-request.ts":
/*!************************************************************************!*\
  !*** ./src/app/api-xr2/data-contracts/global-dispense-sync-request.ts ***!
  \************************************************************************/
/*! exports provided: GlobalDispenseSyncRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalDispenseSyncRequest", function() { return GlobalDispenseSyncRequest; });
class GlobalDispenseSyncRequest {
    constructor() {
        this.PickListLineDetails = new Array();
    }
}


/***/ }),

/***/ "./src/app/api-xr2/data-contracts/pick-list-line-detail.ts":
/*!*****************************************************************!*\
  !*** ./src/app/api-xr2/data-contracts/pick-list-line-detail.ts ***!
  \*****************************************************************/
/*! exports provided: PickListLineDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickListLineDetail", function() { return PickListLineDetail; });
class PickListLineDetail {
}


/***/ }),

/***/ "./src/app/api-xr2/data-contracts/reroute-pick-list-line.ts":
/*!******************************************************************!*\
  !*** ./src/app/api-xr2/data-contracts/reroute-pick-list-line.ts ***!
  \******************************************************************/
/*! exports provided: ReroutePickListLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReroutePickListLine", function() { return ReroutePickListLine; });
class ReroutePickListLine {
    constructor() {
        this.PickListLineIds = new Array();
    }
}


/***/ }),

/***/ "./src/app/api-xr2/data-contracts/robot-print-request.ts":
/*!***************************************************************!*\
  !*** ./src/app/api-xr2/data-contracts/robot-print-request.ts ***!
  \***************************************************************/
/*! exports provided: RobotPrintRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RobotPrintRequest", function() { return RobotPrintRequest; });
class RobotPrintRequest {
    constructor() {
        this.PickListLineDetails = new Array();
    }
}


/***/ }),

/***/ "./src/app/api-xr2/services/picklists-queue.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/api-xr2/services/picklists-queue.service.ts ***!
  \*************************************************************/
/*! exports provided: PicklistsQueueService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistsQueueService", function() { return PicklistsQueueService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");





let PicklistsQueueService = class PicklistsQueueService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get() {
        const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues');
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    sendToRobot(deviceId, globalDispenseSyncRequest) {
        const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/SendToRobot');
        return this.httpClient.post(url, globalDispenseSyncRequest, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    printLabels(deviceId, robotPrintRequest) {
        const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/PrintLabels');
        return this.httpClient.post(url, robotPrintRequest, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
    reroute(reroutePickListLine) {
        const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/Reroute');
        return this.httpClient.post(url, reroutePickListLine, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
PicklistsQueueService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpHeadersService"] }
];
PicklistsQueueService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], PicklistsQueueService);



/***/ }),

/***/ "./src/app/api-xr2/services/xr2-exceptiondetails.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/api-xr2/services/xr2-exceptiondetails.service.ts ***!
  \******************************************************************/
/*! exports provided: Xr2ExceptionDetailsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xr2ExceptionDetailsService", function() { return Xr2ExceptionDetailsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");





let Xr2ExceptionDetailsService = class Xr2ExceptionDetailsService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get(item) {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/restocktrayviews/exceptiondetails`);
        const params = { trayID: item.TrayID, deviceID: item.DeviceID, completedDateTime: item.CompletedDateTime };
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders(), params
        });
    }
};
Xr2ExceptionDetailsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpHeadersService"] }
];
Xr2ExceptionDetailsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], Xr2ExceptionDetailsService);



/***/ }),

/***/ "./src/app/api-xr2/services/xr2-exceptions.service.ts":
/*!************************************************************!*\
  !*** ./src/app/api-xr2/services/xr2-exceptions.service.ts ***!
  \************************************************************/
/*! exports provided: Xr2ExceptionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xr2ExceptionsService", function() { return Xr2ExceptionsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");





let Xr2ExceptionsService = class Xr2ExceptionsService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    get() {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/restocktrayviews/exceptions`);
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders()
        });
    }
};
Xr2ExceptionsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _shared_services_ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_2__["OcapUrlBuilderService"] },
    { type: _shared_services_ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_3__["OcapHttpHeadersService"] }
];
Xr2ExceptionsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], Xr2ExceptionsService);



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_underfilled_picklists_page_underfilled_picklists_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/underfilled-picklists-page/underfilled-picklists-page.component */ "./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.ts");
/* harmony import */ var _core_underfilled_picklist_lines_page_underfilled_picklist_lines_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component */ "./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.ts");
/* harmony import */ var _core_priority_code_pick_routes_page_priority_code_pick_routes_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/priority-code-pick-routes-page/priority-code-pick-routes-page.component */ "./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.ts");
/* harmony import */ var _xr2_picklists_queue_page_picklists_queue_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./xr2/picklists-queue-page/picklists-queue-page.component */ "./src/app/xr2/picklists-queue-page/picklists-queue-page.component.ts");
/* harmony import */ var _core_priority_code_route_assignments_page_priority_code_route_assignments_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/priority-code-route-assignments-page/priority-code-route-assignments-page.component */ "./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.ts");
/* harmony import */ var _core_guidedinvmgmt_devicelist_page_guidedinvmgmt_devicelist_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component */ "./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.ts");
/* harmony import */ var _core_edit_pick_route_page_edit_pick_route_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/edit-pick-route-page/edit-pick-route-page.component */ "./src/app/core/edit-pick-route-page/edit-pick-route-page.component.ts");
/* harmony import */ var _core_guidedinvmgmt_cyclecount_page_guidedinvmgmt_cyclecount_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component */ "./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.ts");
/* harmony import */ var _core_hardware_lease_page_hardware_lease_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/hardware-lease-page/hardware-lease-page.component */ "./src/app/core/hardware-lease-page/hardware-lease-page.component.ts");
/* harmony import */ var _core_item_management_item_management_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/item-management/item-management.component */ "./src/app/core/item-management/item-management.component.ts");
/* harmony import */ var _xr2_Xr2_Exceptions_page_xr2_exceptions_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./xr2/Xr2-Exceptions-page/xr2-exceptions-page.component */ "./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.ts");
/* harmony import */ var _core_guidedinvmgmt_manualcyclecount_page_guidedinvmgmt_manualcyclecount_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component */ "./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.ts");
/* harmony import */ var _xr2_xr2_exception_details_page_xr2_exceptions_details_page_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./xr2/xr2-exception-details-page/xr2-exceptions-details-page.component */ "./src/app/xr2/xr2-exception-details-page/xr2-exceptions-details-page.component.ts");







// tslint:disable-next-line: max-line-length



/*import { CpmSignalRResolverService } from './xr2/services/cpm-signal-rresolver.service';*/






const routes = [
    { path: 'picklists/underfilled', component: _core_underfilled_picklists_page_underfilled_picklists_page_component__WEBPACK_IMPORTED_MODULE_3__["UnderfilledPicklistsPageComponent"] },
    { path: 'picklists/underfilled/picklistLines', component: _core_underfilled_picklist_lines_page_underfilled_picklist_lines_page_component__WEBPACK_IMPORTED_MODULE_4__["UnderfilledPicklistLinesPageComponent"] },
    { path: 'picklists/queue', component: _xr2_picklists_queue_page_picklists_queue_page_component__WEBPACK_IMPORTED_MODULE_6__["PicklistsQueuePageComponent"] /*,
        resolve: {
          cpmSignalR: CpmSignalRResolverService
        }*/
    },
    { path: 'priorityCodePickRoutes', component: _core_priority_code_pick_routes_page_priority_code_pick_routes_page_component__WEBPACK_IMPORTED_MODULE_5__["PriorityCodePickRoutesPageComponent"] },
    { path: 'priorityCode/RouteAssignments', component: _core_priority_code_route_assignments_page_priority_code_route_assignments_page_component__WEBPACK_IMPORTED_MODULE_7__["PriorityCodeRouteAssignmentsPageComponent"] },
    { path: 'guidedinvmgmt/devicelist', component: _core_guidedinvmgmt_devicelist_page_guidedinvmgmt_devicelist_page_component__WEBPACK_IMPORTED_MODULE_8__["GuidedInvMgmtDevicelistPageComponent"] },
    { path: 'pickRoutes/:pickRouteId', component: _core_edit_pick_route_page_edit_pick_route_page_component__WEBPACK_IMPORTED_MODULE_9__["EditPickRoutePageComponent"] },
    { path: 'guidedinvmgmt/cyclecount', component: _core_guidedinvmgmt_cyclecount_page_guidedinvmgmt_cyclecount_page_component__WEBPACK_IMPORTED_MODULE_10__["GuidedInvMgmtCycleCountPageComponent"] },
    { path: 'hardwareLease/requestLease', component: _core_hardware_lease_page_hardware_lease_page_component__WEBPACK_IMPORTED_MODULE_11__["HardwareLeasePageComponent"] },
    { path: 'itemmanagement', component: _core_item_management_item_management_component__WEBPACK_IMPORTED_MODULE_12__["ItemManagementComponent"] },
    { path: 'stocking/exceptions', component: _xr2_Xr2_Exceptions_page_xr2_exceptions_page_component__WEBPACK_IMPORTED_MODULE_13__["Xr2ExceptionsPageComponent"] },
    { path: 'guidedinvmgmt/manualcyclecount', component: _core_guidedinvmgmt_manualcyclecount_page_guidedinvmgmt_manualcyclecount_page_component__WEBPACK_IMPORTED_MODULE_14__["GuidedinvmgmtManualcyclecountPageComponent"] },
    { path: 'stocking/exceptiondetails', component: _xr2_xr2_exception_details_page_xr2_exceptions_details_page_component__WEBPACK_IMPORTED_MODULE_15__["Xr2ExceptionDetailsPageComponent"] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { useHash: true })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _shared_constants_ocap_configuration_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/constants/ocap-configuration-constants */ "./src/app/shared/constants/ocap-configuration-constants.ts");
/* harmony import */ var _shared_services_local_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/services/local-storage.service */ "./src/app/shared/services/local-storage.service.ts");
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/services/window-service */ "./src/app/shared/services/window-service.ts");
/* harmony import */ var oal_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! oal-core */ "../../node_modules/oal-core/fesm2015/oal-core.js");
/* harmony import */ var _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/services/event-connection.service */ "./src/app/shared/services/event-connection.service.ts");










let AppComponent = class AppComponent {
    constructor(router, translate, windowService, localStorageService, configurationService, httpClient, eventConnectionService) {
        this.router = router;
        this.title = 'cpm-app';
        this.loadingData = {
            supportingText: '',
            size: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_2__["OcAnimationSize"].large
        };
        this.loading = true;
        var ocap = {};
        if (windowService.nativeWindow) {
            var win = windowService.nativeWindow;
            if (win.location) {
                var url = new URL(win.location.href);
                var searchParams = new URLSearchParams(url.search.split('?')[1]);
                searchParams.forEach((v, k) => {
                    ocap[k] = v == "True" ? 'true' : v == "False" ? 'false' : v || '';
                });
            }
            localStorageService.setItemObject(_shared_constants_ocap_configuration_constants__WEBPACK_IMPORTED_MODULE_5__["OcapConfigurationConstants"].storageKey, ocap);
            configurationService.init(httpClient);
            eventConnectionService.startUp();
        }
        translate.setDefaultLang(ocap.userLocale || 'en-US');
    }
    ngAfterViewInit() {
        this.router.events.subscribe(e => {
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationStart"]) {
                this.loading = true;
                return;
            }
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"] || e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationCancel"]) {
                this.loading = false;
                return;
            }
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] },
    { type: _shared_services_window_service__WEBPACK_IMPORTED_MODULE_7__["WindowService"] },
    { type: _shared_services_local_storage_service__WEBPACK_IMPORTED_MODULE_6__["LocalStorageService"] },
    { type: oal_core__WEBPACK_IMPORTED_MODULE_8__["ConfigurationService"] },
    { type: oal_core__WEBPACK_IMPORTED_MODULE_8__["OcapHttpClientService"] },
    { type: _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_9__["EventConnectionService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule, HttpLoaderFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _api_core_api_core_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api-core/api-core.module */ "./src/app/api-core/api-core.module.ts");
/* harmony import */ var _api_xr2_api_xr2_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./api-xr2/api-xr2.module */ "./src/app/api-xr2/api-xr2.module.ts");
/* harmony import */ var _xr2_xr2_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./xr2/xr2.module */ "./src/app/xr2/xr2.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/http-loader */ "../../node_modules/@ngx-translate/http-loader/fesm2015/ngx-translate-http-loader.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var oal_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! oal-core */ "../../node_modules/oal-core/fesm2015/oal-core.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");

















let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"].withServerTransition({ appId: 'serverApp' }),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _core_core_module__WEBPACK_IMPORTED_MODULE_6__["CoreModule"],
            _xr2_xr2_module__WEBPACK_IMPORTED_MODULE_9__["Xr2Module"],
            _api_xr2_api_xr2_module__WEBPACK_IMPORTED_MODULE_8__["ApiXr2Module"],
            _api_core_api_core_module__WEBPACK_IMPORTED_MODULE_7__["ApiCoreModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateModule"].forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateLoader"],
                    useFactory: HttpLoaderFactory,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"]]
                }
            }),
            oal_core__WEBPACK_IMPORTED_MODULE_13__["OalCoreModule"].forRoot({
                environment: _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"],
                httpClientService: oal_core__WEBPACK_IMPORTED_MODULE_13__["OcapHttpClientService"],
                configEndpointKey: 'configEndpoint'
            }),
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["ProgressAnimationModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["LayoutModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["ProgressbarModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["FooterModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_15__["SharedModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_16__["RouterModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["PopupWindowModule"],
        ],
        providers: [
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["ProgressbarService"],
            {
                provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HTTP_INTERCEPTORS"],
                useClass: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["ProgressbarInterceptor"],
                multi: true
            },
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["PopupDialogService"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_14__["PopupWindowService"],
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);

function HttpLoaderFactory(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_11__["TranslateHttpLoader"](http, './assets/i18n/', '.json');
}


/***/ }),

/***/ "./src/app/core/constants/dispense-priority-codes.ts":
/*!***********************************************************!*\
  !*** ./src/app/core/constants/dispense-priority-codes.ts ***!
  \***********************************************************/
/*! exports provided: DispensePriorityCodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DispensePriorityCodes", function() { return DispensePriorityCodes; });
class DispensePriorityCodes {
}
DispensePriorityCodes.Area = 'AREA';
DispensePriorityCodes.Cabinet = 'CABINET';
DispensePriorityCodes.Patient = 'PATIENT';
DispensePriorityCodes.RemoteOrder = 'REMOTE ORDER';
DispensePriorityCodes.Normal = 'NORMAL';
DispensePriorityCodes.StockOut = 'AUTOMATIC STOCK-OUT';


/***/ }),

/***/ "./src/app/core/constants/restock-types.ts":
/*!*************************************************!*\
  !*** ./src/app/core/constants/restock-types.ts ***!
  \*************************************************/
/*! exports provided: RestockTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestockTypes", function() { return RestockTypes; });
class RestockTypes {
}
RestockTypes.SelectiveRestock = 'S';
RestockTypes.DispenseToDestination = 'S';
RestockTypes.PatientMedOrder = 'P';
RestockTypes.NormalRestock = 'N';
RestockTypes.StockOut = 'O';
RestockTypes.CriticalLowRestock = 'C';


/***/ }),

/***/ "./src/app/core/constants/wpf-action-paths.ts":
/*!****************************************************!*\
  !*** ./src/app/core/constants/wpf-action-paths.ts ***!
  \****************************************************/
/*! exports provided: WpfActionPaths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WpfActionPaths", function() { return WpfActionPaths; });
class WpfActionPaths {
}
WpfActionPaths.ManualCycleCountPath = 'ManualCycleCountPath';


/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _underfilled_picklists_page_underfilled_picklists_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./underfilled-picklists-page/underfilled-picklists-page.component */ "./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.ts");
/* harmony import */ var _underfilled_picklists_underfilled_picklists_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./underfilled-picklists/underfilled-picklists.component */ "./src/app/core/underfilled-picklists/underfilled-picklists.component.ts");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _underfilled_picklist_lines_page_underfilled_picklist_lines_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./underfilled-picklist-lines-page/underfilled-picklist-lines-page.component */ "./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.ts");
/* harmony import */ var _underfilled_picklist_lines_underfilled_picklist_lines_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./underfilled-picklist-lines/underfilled-picklist-lines.component */ "./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _priority_code_pick_routes_page_priority_code_pick_routes_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./priority-code-pick-routes-page/priority-code-pick-routes-page.component */ "./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.ts");
/* harmony import */ var _priority_code_pick_routes_priority_code_pick_routes_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./priority-code-pick-routes/priority-code-pick-routes.component */ "./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.ts");
/* harmony import */ var _priority_code_route_assignments_page_priority_code_route_assignments_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./priority-code-route-assignments-page/priority-code-route-assignments-page.component */ "./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.ts");
/* harmony import */ var _pick_route_select_pick_route_select_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pick-route-select/pick-route-select.component */ "./src/app/core/pick-route-select/pick-route-select.component.ts");
/* harmony import */ var _device_sequence_order_device_sequence_order_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./device-sequence-order/device-sequence-order.component */ "./src/app/core/device-sequence-order/device-sequence-order.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _guidedinvmgmt_devicelist_page_guidedinvmgmt_devicelist_page_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component */ "./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.ts");
/* harmony import */ var _guidedinvmgmt_cyclecount_page_guidedinvmgmt_cyclecount_page_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component */ "./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.ts");
/* harmony import */ var _edit_pick_route_page_edit_pick_route_page_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./edit-pick-route-page/edit-pick-route-page.component */ "./src/app/core/edit-pick-route-page/edit-pick-route-page.component.ts");
/* harmony import */ var _edit_device_sequence_edit_device_sequence_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./edit-device-sequence/edit-device-sequence.component */ "./src/app/core/edit-device-sequence/edit-device-sequence.component.ts");
/* harmony import */ var _hardware_lease_page_hardware_lease_page_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./hardware-lease-page/hardware-lease-page.component */ "./src/app/core/hardware-lease-page/hardware-lease-page.component.ts");
/* harmony import */ var _item_management_item_management_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./item-management/item-management.component */ "./src/app/core/item-management/item-management.component.ts");
/* harmony import */ var _guidedinvmgmt_manualcyclecount_page_guidedinvmgmt_manualcyclecount_page_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component */ "./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.ts");
























let CoreModule = class CoreModule {
};
CoreModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _underfilled_picklists_page_underfilled_picklists_page_component__WEBPACK_IMPORTED_MODULE_3__["UnderfilledPicklistsPageComponent"],
            _underfilled_picklists_underfilled_picklists_component__WEBPACK_IMPORTED_MODULE_4__["UnderfilledPicklistsComponent"],
            _underfilled_picklist_lines_page_underfilled_picklist_lines_page_component__WEBPACK_IMPORTED_MODULE_7__["UnderfilledPicklistLinesPageComponent"],
            _underfilled_picklist_lines_underfilled_picklist_lines_component__WEBPACK_IMPORTED_MODULE_8__["UnderfilledPicklistLinesComponent"],
            _priority_code_pick_routes_page_priority_code_pick_routes_page_component__WEBPACK_IMPORTED_MODULE_11__["PriorityCodePickRoutesPageComponent"],
            _priority_code_pick_routes_priority_code_pick_routes_component__WEBPACK_IMPORTED_MODULE_12__["PriorityCodePickRoutesComponent"],
            _priority_code_route_assignments_page_priority_code_route_assignments_page_component__WEBPACK_IMPORTED_MODULE_13__["PriorityCodeRouteAssignmentsPageComponent"],
            _device_sequence_order_device_sequence_order_component__WEBPACK_IMPORTED_MODULE_15__["DeviceSequenceOrderComponent"],
            _priority_code_pick_routes_priority_code_pick_routes_component__WEBPACK_IMPORTED_MODULE_12__["PriorityCodePickRoutesComponent"],
            _pick_route_select_pick_route_select_component__WEBPACK_IMPORTED_MODULE_14__["PickRouteSelectComponent"],
            _guidedinvmgmt_devicelist_page_guidedinvmgmt_devicelist_page_component__WEBPACK_IMPORTED_MODULE_17__["GuidedInvMgmtDevicelistPageComponent"],
            _edit_pick_route_page_edit_pick_route_page_component__WEBPACK_IMPORTED_MODULE_19__["EditPickRoutePageComponent"],
            _edit_device_sequence_edit_device_sequence_component__WEBPACK_IMPORTED_MODULE_20__["EditDeviceSequenceComponent"],
            _guidedinvmgmt_cyclecount_page_guidedinvmgmt_cyclecount_page_component__WEBPACK_IMPORTED_MODULE_18__["GuidedInvMgmtCycleCountPageComponent"],
            _hardware_lease_page_hardware_lease_page_component__WEBPACK_IMPORTED_MODULE_21__["HardwareLeasePageComponent"],
            _item_management_item_management_component__WEBPACK_IMPORTED_MODULE_22__["ItemManagementComponent"],
            _guidedinvmgmt_manualcyclecount_page_guidedinvmgmt_manualcyclecount_page_component__WEBPACK_IMPORTED_MODULE_23__["GuidedinvmgmtManualcyclecountPageComponent"],
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["GridModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["ButtonActionModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["LayoutModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["FooterModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["InputsModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["SearchModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["SvgIconModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormsModule"],
        ],
    })
], CoreModule);



/***/ }),

/***/ "./src/app/core/device-sequence-order/device-sequence-order.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/core/device-sequence-order/device-sequence-order.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9kZXZpY2Utc2VxdWVuY2Utb3JkZXIvZGV2aWNlLXNlcXVlbmNlLW9yZGVyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/core/device-sequence-order/device-sequence-order.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/core/device-sequence-order/device-sequence-order.component.ts ***!
  \*******************************************************************************/
/*! exports provided: DeviceSequenceOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceSequenceOrderComponent", function() { return DeviceSequenceOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let DeviceSequenceOrderComponent = class DeviceSequenceOrderComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DeviceSequenceOrderComponent.prototype, "colHeader", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DeviceSequenceOrderComponent.prototype, "Devices", void 0);
DeviceSequenceOrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-device-sequence-order',
        template: __webpack_require__(/*! raw-loader!./device-sequence-order.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/device-sequence-order/device-sequence-order.component.html"),
        styles: [__webpack_require__(/*! ./device-sequence-order.component.scss */ "./src/app/core/device-sequence-order/device-sequence-order.component.scss")]
    })
], DeviceSequenceOrderComponent);



/***/ }),

/***/ "./src/app/core/edit-device-sequence/edit-device-sequence.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/core/edit-device-sequence/edit-device-sequence.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9lZGl0LWRldmljZS1zZXF1ZW5jZS9lZGl0LWRldmljZS1zZXF1ZW5jZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/core/edit-device-sequence/edit-device-sequence.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/core/edit-device-sequence/edit-device-sequence.component.ts ***!
  \*****************************************************************************/
/*! exports provided: EditDeviceSequenceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditDeviceSequenceComponent", function() { return EditDeviceSequenceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let EditDeviceSequenceComponent = class EditDeviceSequenceComponent {
    constructor() {
        this.deviceSequenceChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
    }
    onSelectionChanged(gridSelectionChanged) {
        this.enabledDevices = gridSelectionChanged.selectedValues;
        this.disabledDevices = gridSelectionChanged.unselectedValues;
        this.deviceSequenceChanged.emit(this.enabledDevices);
    }
    onOrderChanged(gridOrderChanged) {
        this.enabledDevices = gridOrderChanged.orderedValues;
        this.deviceSequenceChanged.emit(this.enabledDevices);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], EditDeviceSequenceComponent.prototype, "deviceSequenceChanged", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditDeviceSequenceComponent.prototype, "enabledDevices", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditDeviceSequenceComponent.prototype, "disabledDevices", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditDeviceSequenceComponent.prototype, "disabled", void 0);
EditDeviceSequenceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-edit-device-sequence',
        template: __webpack_require__(/*! raw-loader!./edit-device-sequence.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/edit-device-sequence/edit-device-sequence.component.html"),
        styles: [__webpack_require__(/*! ./edit-device-sequence.component.scss */ "./src/app/core/edit-device-sequence/edit-device-sequence.component.scss")]
    })
], EditDeviceSequenceComponent);



/***/ }),

/***/ "./src/app/core/edit-pick-route-page/edit-pick-route-page.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/core/edit-pick-route-page/edit-pick-route-page.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\n:host {\n  height: 100%;\n}\n\n.buttonSpacer {\n  margin: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2VkaXQtcGljay1yb3V0ZS1wYWdlL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcY29yZVxcZWRpdC1waWNrLXJvdXRlLXBhZ2VcXGVkaXQtcGljay1yb3V0ZS1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvZWRpdC1waWNrLXJvdXRlLXBhZ2UvZWRpdC1waWNrLXJvdXRlLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9lZGl0LXBpY2stcm91dGUtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QkE7RUFDRSxhQUFBO0FDNUJGOztBRDhCQTtFQUNFLE9BQUE7QUMzQkY7O0FENkJBO0VBQ0Usc0JBQUE7QUMxQkY7O0FDVEE7RUFDSSxZQUFBO0FEWUo7O0FDVEE7RUFDRSxZQUFBO0FEWUYiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvZWRpdC1waWNrLXJvdXRlLXBhZ2UvZWRpdC1waWNrLXJvdXRlLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYm9yZGVyLXJhZGl1czogNHB4O1xyXG4kYm9yZGVyLWNvbG9yOiAjYTBhMmE4O1xyXG4kc2xhdGUtZ3JleTogIzVFNkE3MTtcclxuJGJyYW5kLXByaW1hcnk6ICM2OUJFMjg7XHJcbiRicmFuZC1saWdodGJsdWU6ICM5N0MwRTY7XHJcbiRicmFuZC1tZWRpdW1ibHVlOiAjNjY5OUNDO1xyXG4kYnJhbmQtc2Vjb25kYXJ5OiAjNjljO1xyXG4kYnJhbmQtaW5mbzogIzAwNjY5OTtcclxuJGJyYW5kLXdhcm5pbmcgOiAjZjBhZDRlO1xyXG4kYnJhbmQtZGFuZ2VyIDogI0M4MDgxOTtcclxuJGxpZ2h0LWdyZXk6ICNkZGQ7XHJcbiRkYXJrLWdyZXk6ICM5OTk7XHJcbiRhY3Rpb24tYmx1ZTogIzY2OTljYztcclxuJGJhZGdlLWluZm86ICNGM0Y5RkY7XHJcbiRzY3JvbGwtYnV0dG9uLWNvbG9yOiAjYTBhMmE4O1xyXG4kc2Nyb2xsLWJhci1jb2xvcjogI0VERURFRTtcclxuXHJcbiR0ZXh0LWNvbG9yOiAjMzMzO1xyXG4kcGxhY2Vob2xkZXItdGV4dC1jb2xvcjogIzk5OTtcclxuJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsXCJIZWx2ZXRpY2FcIixcIkFyaWFsXCIsXCJzYW5zLXNlcmlmXCIgIWRlZmF1bHQ7XHJcbiRmb250LXNpemUteHhsYXJnZTogMjZweDtcclxuJGZvbnQtc2l6ZS14bGFyZ2U6IDI0cHg7XHJcbiRmb250LXNpemUtbGFyZ2U6IDIycHg7XHJcbiRmb250LXNpemUtbWVkaXVtOiAyMHB4O1xyXG4kZm9udC1zaXplLWJhc2U6IDE4cHg7XHJcbiRmb250LXNpemUtc21hbGw6IDE2cHg7XHJcbiRmb250LXNpemUteHNtYWxsOiAxNHB4O1xyXG4kZm9udC1zaXplLXh4c21hbGw6IDEycHg7XHJcbiRlcnJvci1tZXNzYWdlOiAjQzcwNzE5O1xyXG4uZmxleCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG4uZmxleC0xIHtcclxuICBmbGV4OiAxO1xyXG59XHJcbi5jb2x1bW4ge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuJGJvbGQ6IDYwMDtcclxuJHNlbWktYm9sZDogNTAwO1xyXG4kcmVndWxhcjogNDAwO1xyXG5cclxuJGJ1dHRvbi1mb250LXNpemU6IDIwcHg7XHJcblxyXG4vLyB6LWluZGV4XHJcbiRzZWFyY2hkcm9wZG93bi16aW5kZXg6IDk5ODtcclxuJGhlYWRlci1pbmRleDogOTk5ICFkZWZhdWx0OyAvLyBGb3IgdGhlIGhlYWRlclxyXG4kcG9wdXB3aW5kb3ctemluZGV4OiAxMDAwICFkZWZhdWx0OyAvLyBGb3IgdGhlIHBvcHVwd2luZG93XHJcbiRjYWxlbmRhci16aW5kZXg6IDEwMDEgIWRlZmF1bHQ7XHJcbiRwb3B1cGRpYWxvZy16aW5kZXg6IDEwMDIgIWRlZmF1bHQ7IC8vIEZvciB0aGUgcG9wdXB3aW5kb3dcclxuJHRvYXN0LXppbmRleDogMTAwMyAhZGVmYXVsdDsgLy8gRm9yIHRoZSB0b2FzdCBtZXNzYWdlXHJcbiRob3Zlci16aW5kZXg6IDEwMDQgIWRlZmF1bHQ7IC8vIEZvciB0aGUgaG92ZXJcclxuJGJhZGdlLXppbmRleDogMTAwNSAhZGVmYXVsdDsgLy8gRm9yIHRoZSB0b2FzdCBtZXNzYWdlXHJcbiRwcm9ncmVzc2Jhci16aW5kZXg6IDEwMDUgIWRlZmF1bHQ7XHJcbiRkaXNhYmxlZC1pbnB1dC1jb2xvcjogI2YyZjJmMjtcclxuJHZhbGlkYXRpb24tZXJyb3ItYm9yZGVyLWNvbG9yOiByZWQ7XHJcbiRzaWRlcGFuZWwtYnV0dG9uLXppbmRleDogOTk5ICFkZWZhdWx0O1xyXG4iLCIuZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5mbGV4LTEge1xuICBmbGV4OiAxO1xufVxuXG4uY29sdW1uIHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuOmhvc3Qge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5idXR0b25TcGFjZXIge1xuICBtYXJnaW46IDI1cHg7XG59IiwiQGltcG9ydCBcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab21uaWNlbGwvd2ViY29yZWNvbXBvbmVudHMvbGliL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG46aG9zdHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLmJ1dHRvblNwYWNlciB7XHJcbiAgbWFyZ2luOiAyNXB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/core/edit-pick-route-page/edit-pick-route-page.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/core/edit-pick-route-page/edit-pick-route-page.component.ts ***!
  \*****************************************************************************/
/*! exports provided: EditPickRoutePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPickRoutePageComponent", function() { return EditPickRoutePageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _api_core_services_devices_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api-core/services/devices.service */ "./src/app/api-core/services/devices.service.ts");
/* harmony import */ var _api_core_services_pick_routes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api-core/services/pick-routes.service */ "./src/app/api-core/services/pick-routes.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _shared_components_text_result_popup_text_result_popup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/components/text-result-popup/text-result-popup.component */ "./src/app/shared/components/text-result-popup/text-result-popup.component.ts");
/* harmony import */ var _shared_components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/components/confirm-popup/confirm-popup.component */ "./src/app/shared/components/confirm-popup/confirm-popup.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _api_core_services_ocs_status_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../api-core/services/ocs-status.service */ "./src/app/api-core/services/ocs-status.service.ts");
/* harmony import */ var _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../api-core/services/core-event-connection.service */ "./src/app/api-core/services/core-event-connection.service.ts");














let EditPickRoutePageComponent = class EditPickRoutePageComponent {
    constructor(route, pickRoutesService, devicesService, location, popupWindowService, dialogService, translateService, coreEventConnectionService, ocsStatusService) {
        this.route = route;
        this.pickRoutesService = pickRoutesService;
        this.devicesService = devicesService;
        this.location = location;
        this.popupWindowService = popupWindowService;
        this.dialogService = dialogService;
        this.translateService = translateService;
        this.coreEventConnectionService = coreEventConnectionService;
        this.ocsStatusService = ocsStatusService;
        this.requestStatus = 'none';
        this.ocsIsHealthy = false;
    }
    ngOnInit() {
        this.routeNameChanged = false;
        const pickRouteId = this.route.snapshot.paramMap.get('pickRouteId');
        this.pickRoute$ = this.pickRoutesService.get(pickRouteId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["shareReplay"])(1));
        const allDevices$ = this.devicesService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["shareReplay"])(1));
        this.duplicateErrorTitle$ = this.translateService.get('ERROR_DUPLICATE_NAME_TITLE');
        this.duplicateErrorMessage$ = this.translateService.get('ERROR_DUPLICATE_NAME_MESSAGE');
        this.genericErrorTitle$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_TITLE');
        this.genericErrorMessage$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_MESSAGE');
        this.pickRoute$.subscribe(x => this.canDelete = x.AssignedPriorities.length == 0);
        this.enabledDevices$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(this.pickRoute$, allDevices$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(results => {
            const pickRouteDetail = results[0];
            const allDevices = results[1];
            const enabledDevices = allDevices.map(x => {
                const pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId === x.Id);
                const isSelected = pickRouteDevice !== undefined;
                if (!isSelected) {
                    return null;
                }
                const sequenceOrder = pickRouteDevice.SequenceOrder;
                return {
                    DeviceId: x.Id,
                    DeviceDescription: x.Description,
                    SequenceOrder: sequenceOrder,
                };
            });
            this.routeGuid = pickRouteDetail.PickRouteGuid;
            this.newRouteName = pickRouteDetail.Description;
            this.isDefaultRoute = pickRouteDetail.Description === 'Default';
            return enabledDevices.filter(x => x != null).sort((a, b) => a.SequenceOrder - b.SequenceOrder);
        }));
        this.disabledDevices$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(this.pickRoute$, allDevices$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(results => {
            const pickRouteDetail = results[0];
            const allDevices = results[1];
            const disabledDevices = allDevices.map(x => {
                const pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId === x.Id);
                const isSelected = pickRouteDevice !== undefined;
                if (isSelected) {
                    return null;
                }
                const sequenceOrder = 999;
                return {
                    DeviceId: x.Id,
                    DeviceDescription: x.Description,
                    SequenceOrder: sequenceOrder,
                };
            });
            this.routeGuid = pickRouteDetail.PickRouteGuid;
            this.newRouteName = pickRouteDetail.Description;
            this.isDefaultRoute = pickRouteDetail.Description === 'Default';
            return disabledDevices.filter(x => x != null);
        }));
        this.originalDeviceSequence = [];
        this.enabledDevices$.forEach(enabledDevice => {
            enabledDevice.forEach(device => {
                this.originalDeviceSequence.push(device);
            });
        });
        this.connectToEvents();
    }
    navigateBack() {
        this.location.back();
    }
    saveAs() {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupWindowProperties"]();
        const data = {
            headerResourceKey: 'SAVE_NEW_ROUTE',
            placeholderTextResouceKey: 'NEW_ROUTE_NAME',
            initialValue: undefined,
            resultValue: null,
            beforeTextboxResourceKey: 'ROUTE_SAVEAS_BEFORE',
            afterTextboxResourceKey: 'ROUTE_SAVEAS_AFTER'
        };
        properties.data = data;
        const component = this.popupWindowService.show(_shared_components_text_result_popup_text_result_popup_component__WEBPACK_IMPORTED_MODULE_9__["TextResultPopupComponent"], properties);
        component.dismiss.subscribe(selectedConfirm => {
            if (selectedConfirm) {
                this.requestStatus = 'saveAs';
                this.pickRoutesService.saveAs(data.resultValue, this.newDeviceSequence)
                    .subscribe(result => this.navigateBack(), error => this.onSaveAsFailed(error));
            }
        });
    }
    save() {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupWindowProperties"]();
        const data = {
            headerResourceKey: 'SAVE_ROUTE_CHANGES',
            confirmTextboxResourceKey: 'ROUTE_SAVE_BEFORE'
        };
        properties.data = data;
        if (!this.newDeviceSequence) {
            this.newDeviceSequence = this.originalDeviceSequence;
        }
        const component = this.popupWindowService.show(_shared_components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmPopupComponent"], properties);
        component.dismiss.subscribe(selectedConfirm => {
            if (selectedConfirm) {
                this.requestStatus = 'save';
                this.pickRoutesService.save(this.routeGuid, this.newRouteName, this.newDeviceSequence)
                    .subscribe(result => this.navigateBack(), error => this.onSaveFailed(error));
            }
        });
    }
    delete() {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupWindowProperties"]();
        const data = {
            headerResourceKey: 'ROUTE_DELETE',
            confirmTextboxResourceKey: 'ROUTE_DELETE_AFTER'
        };
        properties.data = data;
        const component = this.popupWindowService.show(_shared_components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmPopupComponent"], properties);
        component.dismiss.subscribe(selectedConfirm => {
            if (selectedConfirm) {
                this.pickRoutesService.delete(this.routeGuid)
                    .subscribe(result => this.navigateBack(), error => this.onSaveFailed(error));
            }
        });
    }
    onDeviceSequenceChanged(newDeviceSequence) {
        for (let i = 0; i < newDeviceSequence.length; i++) {
            const device = newDeviceSequence[i];
            device.SequenceOrder = i + 1;
        }
        this.newDeviceSequence = newDeviceSequence;
    }
    onRouteNameChange(newName) {
        this.newRouteName = newName;
        this.routeNameChanged = true;
    }
    onSaveAsFailed(error) {
        this.requestStatus = 'none';
        if (error.status === 400) {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(this.duplicateErrorTitle$, this.duplicateErrorMessage$).subscribe(r => {
                this.displayError('Duplicate-Description-Error', r[0], r[1]);
            });
        }
        else {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(this.genericErrorTitle$, this.genericErrorMessage$).subscribe(r => {
                this.displayError('Generic-Error', r[0], r[1]);
            });
        }
    }
    onSaveFailed(error) {
        this.requestStatus = 'none';
        if (error.status === 400) {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(this.duplicateErrorTitle$, this.duplicateErrorMessage$).subscribe(r => {
                this.displayError('Duplicate-Description-Error', r[0], r[1]);
            });
        }
        else {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(this.genericErrorTitle$, this.genericErrorMessage$).subscribe(r => {
                this.displayError('Generic-Error', r[0], r[1]);
            });
        }
    }
    displayError(uniqueId, title, message) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupDialogProperties"](uniqueId);
        properties.titleElementText = title;
        properties.messageElementText = message;
        properties.showPrimaryButton = true;
        properties.primaryButtonText = 'Ok';
        properties.showSecondaryButton = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupDialogType"].Error;
        properties.timeoutLength = 0;
        this.dialogService.showOnce(properties);
    }
    connectToEvents() {
        this.configureEventHandlers();
        this.coreEventConnectionService.startedSubject.subscribe(() => {
            this.ocsStatusService.requestStatus().subscribe();
        });
    }
    configureEventHandlers() {
        this.coreEventConnectionService.ocsIsHealthySubject
            .subscribe(message => this.setOcsStatus(message));
    }
    setOcsStatus(isHealthy) {
        this.ocsIsHealthy = isHealthy;
    }
};
EditPickRoutePageComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
    { type: _api_core_services_pick_routes_service__WEBPACK_IMPORTED_MODULE_5__["PickRoutesService"] },
    { type: _api_core_services_devices_service__WEBPACK_IMPORTED_MODULE_4__["DevicesService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupWindowService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupDialogService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateService"] },
    { type: _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_13__["CoreEventConnectionService"] },
    { type: _api_core_services_ocs_status_service__WEBPACK_IMPORTED_MODULE_12__["OcsStatusService"] }
];
EditPickRoutePageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-edit-pick-route-page',
        template: __webpack_require__(/*! raw-loader!./edit-pick-route-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/edit-pick-route-page/edit-pick-route-page.component.html"),
        styles: [__webpack_require__(/*! ./edit-pick-route-page.component.scss */ "./src/app/core/edit-pick-route-page/edit-pick-route-page.component.scss")]
    })
], EditPickRoutePageComponent);



/***/ }),

/***/ "./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\n:host {\n  height: 100%;\n}\n\n.BrandName {\n  font-size: 37px;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  position: relative;\n  color: #333;\n  margin-top: 40px;\n  margin-left: 16px;\n}\n\n.BrandName ::ng-deep img:first-child {\n  width: 50px !important;\n  margin-bottom: 20px !important;\n}\n\n.GenericName {\n  font-size: 38px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  position: relative;\n  font-weight: normal;\n  color: #333;\n  margin-top: 6px;\n  margin-bottom: 8px !important;\n  margin-left: 16px;\n}\n\n.ItemId {\n  font-size: 38px;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n  bottom: 16px;\n  left: 16px;\n}\n\n.location {\n  font-size: 28px;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n  bottom: 16px;\n  left: 16px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.locationdescription {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.locationdescription ::ng-deep div:last-child {\n  margin-top: -25px !important;\n}\n\n.locationdescription ::ng-deep img:first-child {\n  width: 50px !important;\n}\n\n.devicelocationaccess {\n  margin-top: 5px;\n  margin-left: auto;\n  margin-right: 15px;\n}\n\n.DeviceLocation {\n  font-size: 22px;\n  height: 50px;\n  box-sizing: border-box;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  margin-left: 20px;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.panelContainer1 {\n  display: flex;\n  flex-direction: row;\n  overflow: hidden;\n}\n\n.panelContainer {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  overflow: hidden;\n}\n\n.displayGuidedCycleCount {\n  border-bottom: solid #c8c8c8 1px;\n  height: 180px;\n  overflow: hidden;\n}\n\n.itemIdBox {\n  height: 75px;\n  width: 478px;\n  border-left: solid white 24px;\n  border-right: solid #c8c8c8 1px;\n  margin-top: 0px;\n  margin-bottom: 0px;\n}\n\n.locationOfCycleCount {\n  height: 50px;\n  width: 327px;\n  margin-left: 330px;\n  border-left: solid white 24px;\n  border-right: solid #c8c8c8 1px;\n}\n\n.leftCycleCountPanel {\n  flex: 1;\n  border-top: solid #c8c8c8 1px;\n  border-left: solid #c8c8c8 24px;\n  border-right: solid #c8c8c8 28px;\n  height: 100%;\n  width: 360px;\n  left: 24px;\n  box-sizing: border-box;\n  background-color: #c8c8c8;\n}\n\n.leftPanelRow {\n  width: 300px;\n  height: 100px;\n  color: #333;\n  font-size: 18px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  margin-left: 16px;\n  margin-top: 16px;\n  margin-bottom: 16px;\n}\n\n.rightCycleCountPanel {\n  border-top: solid #c8c8c8 1px;\n  height: 100%;\n  width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-weight: 500;\n}\n\n.itemIdHeader {\n  font-size: 14px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-weight: normal;\n  color: #333;\n  left: 16px;\n  top: 16px;\n  bottom: 10px;\n}\n\n.dateTime {\n  font-size: 14px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #ffffff;\n  font-weight: normal;\n  position: relative;\n  vertical-align: center;\n  margin-top: 20px;\n  margin-right: 280px;\n}\n\n.printlable {\n  margin-top: 12px;\n  margin-right: 80px;\n}\n\n.textContent {\n  font-weight: bold;\n  font-size: 38px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  height: 100%;\n  width: 100%;\n  color: #333;\n  box-sizing: content-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.totalItemCount {\n  font-size: 20px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #ffffff;\n  font-weight: normal;\n  vertical-align: Center;\n  position: relative;\n  margin-top: 16px;\n  right: 16px;\n}\n\n.whiteline {\n  height: 1px;\n  background-color: #ffffff;\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-left: 16px;\n}\n\n.demo {\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-bottom: 100px !important;\n  width: 400px !important;\n}\n\n.demo ::ng-deep div:first-child {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n  font-size: 20px !important;\n  line-height: 16px !important;\n}\n\n.demo ::ng-deep div:nth-child(2) {\n  height: 100px;\n}\n\n.demo ::ng-deep input:first-child {\n  margin-top: 12px !important;\n  font-size: 38px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n}\n\n.demo ::ng-deep div:last-child {\n  margin-top: 8px !important;\n  font-size: 18px !important;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-weight: normal;\n  color: #333;\n  margin-bottom: 4px;\n}\n\n.demo ::ng-deep span {\n  min-width: 80px !important;\n}\n\n.expiration {\n  margin-top: 22px !important;\n}\n\n.expiration ::ng-deep div.first-Child {\n  margin-right: 24px !important;\n  width: 200px !important;\n}\n\n.expiration ::ng-deep form {\n  height: 65px !important;\n  width: 290px;\n  background-color: #ffffff;\n}\n\n.expiration ::ng-deep input:nth-child(1) {\n  font-size: 30px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  margin-left: 0px !important;\n  margin-right: 2px !important;\n  margin-top: 3px !important;\n  height: 50px !important;\n  padding-right: none !important;\n  position: relative;\n  flex: 0px !important;\n  min-width: 45px !important;\n  width: 120px !important;\n  display: initial !important;\n  text-align: left !important;\n  bottom: 4px !important;\n  flex: 0 !important;\n  flex-wrap: 0 !important;\n  flex-shrink: 0 !important;\n  flex-basis: 0 !important;\n  flex-flow: 0 !important;\n}\n\n.expiration ::ng-deep input:nth-child(3) {\n  font-size: 30px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  margin-left: 3px !important;\n  margin-right: 3px !important;\n  padding-right: none !important;\n  position: relative;\n  flex: 0px !important;\n  min-width: 45px !important;\n  width: 120px !important;\n  display: initial !important;\n  text-align: center !important;\n  bottom: 3px !important;\n  flex: 0 !important;\n  flex-wrap: 0 !important;\n  flex-shrink: 0 !important;\n  flex-basis: 0 !important;\n  flex-flow: 0 !important;\n}\n\n.expiration ::ng-deep input:nth-child(5) {\n  font-size: 30px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  margin-left: 4px !important;\n  margin-right: 0px !important;\n  margin-bottom: 0px !important;\n  padding-right: none !important;\n  position: relative;\n  flex: 0px !important;\n  bottom: 6px !important;\n  min-width: 85px !important;\n  display: initial !important;\n  text-align: left !important;\n  bottom: 4px !important;\n  flex: 0 !important;\n  flex-wrap: 0 !important;\n  flex-shrink: 0 !important;\n  flex-basis: 0 !important;\n  flex-flow: 0 !important;\n}\n\n.expiration ::ng-deep span {\n  font-weight: bold;\n  margin: 0px !important;\n  font-size: 30px !important;\n  flex: none !important;\n  display: inline !important;\n}\n\n.expiration ::ng-deep svg {\n  position: initial !important;\n  right: 6px !important;\n  left: 8px !important;\n  margin-top: 5px !important;\n}\n\n.buttonadjust {\n  margin-left: 24px !important;\n}\n\n.expirationwhiteline {\n  height: 1px;\n  background-color: #FFFFFF;\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-left: 16px;\n  margin-top: 25px;\n}\n\n.expwhiteline {\n  height: 1px;\n  background-color: #ffffff;\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-left: 16px;\n  margin-top: 135px;\n  position: relative !important;\n}\n\n.barcode {\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2d1aWRlZGludm1nbXQtY3ljbGVjb3VudC1wYWdlL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcY29yZVxcZ3VpZGVkaW52bWdtdC1jeWNsZWNvdW50LXBhZ2VcXGd1aWRlZGludm1nbXQtY3ljbGVjb3VudC1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvZ3VpZGVkaW52bWdtdC1jeWNsZWNvdW50LXBhZ2UvZ3VpZGVkaW52bWdtdC1jeWNsZWNvdW50LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9ndWlkZWRpbnZtZ210LWN5Y2xlY291bnQtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QkE7RUFDRSxhQUFBO0FDNUJGOztBRDhCQTtFQUNFLE9BQUE7QUMzQkY7O0FENkJBO0VBQ0Usc0JBQUE7QUMxQkY7O0FDVEE7RUFDSSxZQUFBO0FEWUo7O0FDVEU7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSw2RUZXcUI7RUVWckIsa0JBQUE7RUFDQSxXRk9TO0VFTlQsZ0JBQUE7RUFDQSxpQkFBQTtBRFlKOztBQ1RRO0VBQ0Usc0JBQUE7RUFDQSw4QkFBQTtBRFdWOztBQ0xFO0VBQ0UsZUFBQTtFQUNBLDZFRk5xQjtFRU9yQixrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0ZYUztFRVlULGVBQUE7RUFDQSw2QkFBQTtFQUNBLGlCQUFBO0FEUUo7O0FDTEU7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSw2RUZsQnFCO0VFbUJyQixXRnJCUztFRXNCVCxZQUFBO0VBQ0EsVUFBQTtBRFFKOztBQ0xFO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsNkVGM0JxQjtFRTRCckIsV0Y5QlM7RUUrQlQsWUFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFdBQUE7QURRSjs7QUNORTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FEU0o7O0FDTlE7RUFDRSw0QkFBQTtBRFFWOztBQ0ZRO0VBQ0Usc0JBQUE7QURJVjs7QUNDRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FERUo7O0FDQ0U7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7QURFSjs7QUNBRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FER0o7O0FDQUU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0VBQ0EsZ0JBQUE7QURHSjs7QUNBRTtFQUNFLGdDQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FER0o7O0FDQUU7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLDZCQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QURHSjs7QUNBRTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtFQUNBLCtCQUFBO0FER0o7O0FDQUU7RUFDRSxPQUFBO0VBQ0EsNkJBQUE7RUFDQSwrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtBREdKOztBQ0FFO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxXRjlIUztFRStIVCxlQUFBO0VBQ0EsNkVGOUhxQjtFRStIckIsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCRjlHRztFRStHSCxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QURHSjs7QUNBRTtFQUNFLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsNkVGL0lxQjtFRWdKckIsZ0JBQUE7QURHSjs7QUNBQTtFQUNFLGVBQUE7RUFDQSw2RUZySnVCO0VFc0p2QixtQkFBQTtFQUNBLFdGekpXO0VFMEpYLFVBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtBREdGOztBQ0FBO0VBQ0UsZUFBQTtFQUNBLDZFRi9KdUI7RUVnS3ZCLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FER0Y7O0FDQUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FER0Y7O0FDQUE7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSw2RUZoTHVCO0VFaUx2QixZQUFBO0VBQ0EsV0FBQTtFQUNBLFdGckxXO0VFc0xYLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QURHRjs7QUNEQTtFQUNFLGVBQUE7RUFDQSw2RUYzTHVCO0VFNEx2QixjQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FESUY7O0FDREE7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxpQ0FBQTtFQUNBLCtDQUFBO0VBQ0EsaUJBQUE7QURJRjs7QUNGQTtFQUNFLGlDQUFBO0VBQ0EsK0NBQUE7RUFDQSwrQkFBQTtFQUNBLHVCQUFBO0FES0Y7O0FDRk07RUFDRSw2RUZuTmlCO0VFb05qQixXRnROSztFRXVOTCwwQkFBQTtFQUNBLDRCQUFBO0FESVI7O0FDQ0k7RUFDRSxhQUFBO0FEQ047O0FDSU07RUFDRSwyQkFBQTtFQUNBLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSw2RUZyT2lCO0VFc09qQixXRnhPSztBQ3NPYjs7QUNRTTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFDQSw2RUYvT21CO0VFZ1BuQixtQkFBQTtFQUNBLFdGblBPO0VFb1BQLGtCQUFBO0FETk47O0FDV0k7RUFDRSwwQkFBQTtBRFROOztBQ2FBO0VBQ0UsMkJBQUE7QURWRjs7QUNhUTtFQUNFLDZCQUFBO0VBQ0EsdUJBQUE7QURYVjs7QUNnQk07RUFDSSx1QkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtBRGRWOztBQ2tCSztFQUNFLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSw2RUZqUmtCO0VFa1JsQiwyQkFBQTtFQUNBLDRCQUFBO0VBQ0EsMEJBQUE7RUFDQSx1QkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLDBCQUFBO0VBQ0EsdUJBQUE7RUFDQSwyQkFBQTtFQUNBLDJCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSx3QkFBQTtFQUNBLHVCQUFBO0FEaEJQOztBQ29CTTtFQUNFLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSw2RUZ6U2lCO0VFMFNqQiwyQkFBQTtFQUNBLDRCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsMEJBQUE7RUFDQSx1QkFBQTtFQUNBLDJCQUFBO0VBQ0EsNkJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0VBQ0EsdUJBQUE7QURsQlI7O0FDc0JNO0VBQ0MsMEJBQUE7RUFDQSxpQkFBQTtFQUNBLDZFRi9Ua0I7RUVnVWxCLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsMEJBQUE7RUFDQSwyQkFBQTtFQUNBLDJCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSx3QkFBQTtFQUNBLHVCQUFBO0FEcEJQOztBQ3lCSztFQUNFLGlCQUFBO0VBRUEsc0JBQUE7RUFDQSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsMEJBQUE7QUR4QlA7O0FDNkJJO0VBQ0csNEJBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsMEJBQUE7QUQzQlA7O0FDK0JBO0VBQ0UsNEJBQUE7QUQ1QkY7O0FDOEJBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUNBQUE7RUFDQSwrQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUQzQkY7O0FDNkJBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUNBQUE7RUFDQSwrQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSw2QkFBQTtBRDFCRjs7QUM0QkE7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUR6QkYiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvZ3VpZGVkaW52bWdtdC1jeWNsZWNvdW50LXBhZ2UvZ3VpZGVkaW52bWdtdC1jeWNsZWNvdW50LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYm9yZGVyLXJhZGl1czogNHB4O1xyXG4kYm9yZGVyLWNvbG9yOiAjYTBhMmE4O1xyXG4kc2xhdGUtZ3JleTogIzVFNkE3MTtcclxuJGJyYW5kLXByaW1hcnk6ICM2OUJFMjg7XHJcbiRicmFuZC1saWdodGJsdWU6ICM5N0MwRTY7XHJcbiRicmFuZC1tZWRpdW1ibHVlOiAjNjY5OUNDO1xyXG4kYnJhbmQtc2Vjb25kYXJ5OiAjNjljO1xyXG4kYnJhbmQtaW5mbzogIzAwNjY5OTtcclxuJGJyYW5kLXdhcm5pbmcgOiAjZjBhZDRlO1xyXG4kYnJhbmQtZGFuZ2VyIDogI0M4MDgxOTtcclxuJGxpZ2h0LWdyZXk6ICNkZGQ7XHJcbiRkYXJrLWdyZXk6ICM5OTk7XHJcbiRhY3Rpb24tYmx1ZTogIzY2OTljYztcclxuJGJhZGdlLWluZm86ICNGM0Y5RkY7XHJcbiRzY3JvbGwtYnV0dG9uLWNvbG9yOiAjYTBhMmE4O1xyXG4kc2Nyb2xsLWJhci1jb2xvcjogI0VERURFRTtcclxuXHJcbiR0ZXh0LWNvbG9yOiAjMzMzO1xyXG4kcGxhY2Vob2xkZXItdGV4dC1jb2xvcjogIzk5OTtcclxuJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsXCJIZWx2ZXRpY2FcIixcIkFyaWFsXCIsXCJzYW5zLXNlcmlmXCIgIWRlZmF1bHQ7XHJcbiRmb250LXNpemUteHhsYXJnZTogMjZweDtcclxuJGZvbnQtc2l6ZS14bGFyZ2U6IDI0cHg7XHJcbiRmb250LXNpemUtbGFyZ2U6IDIycHg7XHJcbiRmb250LXNpemUtbWVkaXVtOiAyMHB4O1xyXG4kZm9udC1zaXplLWJhc2U6IDE4cHg7XHJcbiRmb250LXNpemUtc21hbGw6IDE2cHg7XHJcbiRmb250LXNpemUteHNtYWxsOiAxNHB4O1xyXG4kZm9udC1zaXplLXh4c21hbGw6IDEycHg7XHJcbiRlcnJvci1tZXNzYWdlOiAjQzcwNzE5O1xyXG4uZmxleCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG4uZmxleC0xIHtcclxuICBmbGV4OiAxO1xyXG59XHJcbi5jb2x1bW4ge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuJGJvbGQ6IDYwMDtcclxuJHNlbWktYm9sZDogNTAwO1xyXG4kcmVndWxhcjogNDAwO1xyXG5cclxuJGJ1dHRvbi1mb250LXNpemU6IDIwcHg7XHJcblxyXG4vLyB6LWluZGV4XHJcbiRzZWFyY2hkcm9wZG93bi16aW5kZXg6IDk5ODtcclxuJGhlYWRlci1pbmRleDogOTk5ICFkZWZhdWx0OyAvLyBGb3IgdGhlIGhlYWRlclxyXG4kcG9wdXB3aW5kb3ctemluZGV4OiAxMDAwICFkZWZhdWx0OyAvLyBGb3IgdGhlIHBvcHVwd2luZG93XHJcbiRjYWxlbmRhci16aW5kZXg6IDEwMDEgIWRlZmF1bHQ7XHJcbiRwb3B1cGRpYWxvZy16aW5kZXg6IDEwMDIgIWRlZmF1bHQ7IC8vIEZvciB0aGUgcG9wdXB3aW5kb3dcclxuJHRvYXN0LXppbmRleDogMTAwMyAhZGVmYXVsdDsgLy8gRm9yIHRoZSB0b2FzdCBtZXNzYWdlXHJcbiRob3Zlci16aW5kZXg6IDEwMDQgIWRlZmF1bHQ7IC8vIEZvciB0aGUgaG92ZXJcclxuJGJhZGdlLXppbmRleDogMTAwNSAhZGVmYXVsdDsgLy8gRm9yIHRoZSB0b2FzdCBtZXNzYWdlXHJcbiRwcm9ncmVzc2Jhci16aW5kZXg6IDEwMDUgIWRlZmF1bHQ7XHJcbiRkaXNhYmxlZC1pbnB1dC1jb2xvcjogI2YyZjJmMjtcclxuJHZhbGlkYXRpb24tZXJyb3ItYm9yZGVyLWNvbG9yOiByZWQ7XHJcbiRzaWRlcGFuZWwtYnV0dG9uLXppbmRleDogOTk5ICFkZWZhdWx0O1xyXG4iLCIuZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5mbGV4LTEge1xuICBmbGV4OiAxO1xufVxuXG4uY29sdW1uIHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuOmhvc3Qge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5CcmFuZE5hbWUge1xuICBmb250LXNpemU6IDM3cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbi10b3A6IDQwcHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuLkJyYW5kTmFtZSA6Om5nLWRlZXAgaW1nOmZpcnN0LWNoaWxkIHtcbiAgd2lkdGg6IDUwcHggIWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4uR2VuZXJpY05hbWUge1xuICBmb250LXNpemU6IDM4cHg7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luLXRvcDogNnB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHggIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XG59XG5cbi5JdGVtSWQge1xuICBmb250LXNpemU6IDM4cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGNvbG9yOiAjMzMzO1xuICBib3R0b206IDE2cHg7XG4gIGxlZnQ6IDE2cHg7XG59XG5cbi5sb2NhdGlvbiB7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgY29sb3I6ICMzMzM7XG4gIGJvdHRvbTogMTZweDtcbiAgbGVmdDogMTZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmxvY2F0aW9uZGVzY3JpcHRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5sb2NhdGlvbmRlc2NyaXB0aW9uIDo6bmctZGVlcCBkaXY6bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IC0yNXB4ICFpbXBvcnRhbnQ7XG59XG4ubG9jYXRpb25kZXNjcmlwdGlvbiA6Om5nLWRlZXAgaW1nOmZpcnN0LWNoaWxkIHtcbiAgd2lkdGg6IDUwcHggIWltcG9ydGFudDtcbn1cblxuLmRldmljZWxvY2F0aW9uYWNjZXNzIHtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xufVxuXG4uRGV2aWNlTG9jYXRpb24ge1xuICBmb250LXNpemU6IDIycHg7XG4gIGhlaWdodDogNTBweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4ucGFuZWxDb250YWluZXIxIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnBhbmVsQ29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleDogMTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmRpc3BsYXlHdWlkZWRDeWNsZUNvdW50IHtcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgI2M4YzhjOCAxcHg7XG4gIGhlaWdodDogMTgwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5pdGVtSWRCb3gge1xuICBoZWlnaHQ6IDc1cHg7XG4gIHdpZHRoOiA0NzhweDtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIHdoaXRlIDI0cHg7XG4gIGJvcmRlci1yaWdodDogc29saWQgI2M4YzhjOCAxcHg7XG4gIG1hcmdpbi10b3A6IDBweDtcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xufVxuXG4ubG9jYXRpb25PZkN5Y2xlQ291bnQge1xuICBoZWlnaHQ6IDUwcHg7XG4gIHdpZHRoOiAzMjdweDtcbiAgbWFyZ2luLWxlZnQ6IDMzMHB4O1xuICBib3JkZXItbGVmdDogc29saWQgd2hpdGUgMjRweDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAjYzhjOGM4IDFweDtcbn1cblxuLmxlZnRDeWNsZUNvdW50UGFuZWwge1xuICBmbGV4OiAxO1xuICBib3JkZXItdG9wOiBzb2xpZCAjYzhjOGM4IDFweDtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkICNjOGM4YzggMjRweDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAjYzhjOGM4IDI4cHg7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDM2MHB4O1xuICBsZWZ0OiAyNHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzhjOGM4O1xufVxuXG4ubGVmdFBhbmVsUm93IHtcbiAgd2lkdGg6IDMwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBjb2xvcjogIzMzMztcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tbGVmdDogMTZweDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cblxuLnJpZ2h0Q3ljbGVDb3VudFBhbmVsIHtcbiAgYm9yZGVyLXRvcDogc29saWQgI2M4YzhjOCAxcHg7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5pdGVtSWRIZWFkZXIge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICMzMzM7XG4gIGxlZnQ6IDE2cHg7XG4gIHRvcDogMTZweDtcbiAgYm90dG9tOiAxMHB4O1xufVxuXG4uZGF0ZVRpbWUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAyODBweDtcbn1cblxuLnByaW50bGFibGUge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICBtYXJnaW4tcmlnaHQ6IDgwcHg7XG59XG5cbi50ZXh0Q29udGVudCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDM4cHg7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnRvdGFsSXRlbUNvdW50IHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB2ZXJ0aWNhbC1hbGlnbjogQ2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG4gIHJpZ2h0OiAxNnB4O1xufVxuXG4ud2hpdGVsaW5lIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4uZGVtbyB7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1ib3R0b206IDEwMHB4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiA0MDBweCAhaW1wb3J0YW50O1xufVxuLmRlbW8gOjpuZy1kZWVwIGRpdjpmaXJzdC1jaGlsZCB7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgY29sb3I6ICMzMzM7XG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogMTZweCAhaW1wb3J0YW50O1xufVxuLmRlbW8gOjpuZy1kZWVwIGRpdjpudGgtY2hpbGQoMikge1xuICBoZWlnaHQ6IDEwMHB4O1xufVxuLmRlbW8gOjpuZy1kZWVwIGlucHV0OmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMTJweCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDM4cHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgY29sb3I6ICMzMzM7XG59XG4uZGVtbyA6Om5nLWRlZXAgZGl2Omxhc3QtY2hpbGQge1xuICBtYXJnaW4tdG9wOiA4cHggIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cbi5kZW1vIDo6bmctZGVlcCBzcGFuIHtcbiAgbWluLXdpZHRoOiA4MHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5leHBpcmF0aW9uIHtcbiAgbWFyZ2luLXRvcDogMjJweCAhaW1wb3J0YW50O1xufVxuLmV4cGlyYXRpb24gOjpuZy1kZWVwIGRpdi5maXJzdC1DaGlsZCB7XG4gIG1hcmdpbi1yaWdodDogMjRweCAhaW1wb3J0YW50O1xuICB3aWR0aDogMjAwcHggIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBmb3JtIHtcbiAgaGVpZ2h0OiA2NXB4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAyOTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBpbnB1dDpudGgtY2hpbGQoMSkge1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgbWFyZ2luLWxlZnQ6IDBweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDJweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAzcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctcmlnaHQ6IG5vbmUgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4OiAwcHggIWltcG9ydGFudDtcbiAgbWluLXdpZHRoOiA0NXB4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAxMjBweCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBpbml0aWFsICFpbXBvcnRhbnQ7XG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcbiAgYm90dG9tOiA0cHggIWltcG9ydGFudDtcbiAgZmxleDogMCAhaW1wb3J0YW50O1xuICBmbGV4LXdyYXA6IDAgIWltcG9ydGFudDtcbiAgZmxleC1zaHJpbms6IDAgIWltcG9ydGFudDtcbiAgZmxleC1iYXNpczogMCAhaW1wb3J0YW50O1xuICBmbGV4LWZsb3c6IDAgIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBpbnB1dDpudGgtY2hpbGQoMykge1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgbWFyZ2luLWxlZnQ6IDNweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDNweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxleDogMHB4ICFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogNDVweCAhaW1wb3J0YW50O1xuICB3aWR0aDogMTIwcHggIWltcG9ydGFudDtcbiAgZGlzcGxheTogaW5pdGlhbCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgYm90dG9tOiAzcHggIWltcG9ydGFudDtcbiAgZmxleDogMCAhaW1wb3J0YW50O1xuICBmbGV4LXdyYXA6IDAgIWltcG9ydGFudDtcbiAgZmxleC1zaHJpbms6IDAgIWltcG9ydGFudDtcbiAgZmxleC1iYXNpczogMCAhaW1wb3J0YW50O1xuICBmbGV4LWZsb3c6IDAgIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBpbnB1dDpudGgtY2hpbGQoNSkge1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgbWFyZ2luLWxlZnQ6IDRweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1yaWdodDogbm9uZSAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZsZXg6IDBweCAhaW1wb3J0YW50O1xuICBib3R0b206IDZweCAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IDg1cHggIWltcG9ydGFudDtcbiAgZGlzcGxheTogaW5pdGlhbCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XG4gIGJvdHRvbTogNHB4ICFpbXBvcnRhbnQ7XG4gIGZsZXg6IDAgIWltcG9ydGFudDtcbiAgZmxleC13cmFwOiAwICFpbXBvcnRhbnQ7XG4gIGZsZXgtc2hyaW5rOiAwICFpbXBvcnRhbnQ7XG4gIGZsZXgtYmFzaXM6IDAgIWltcG9ydGFudDtcbiAgZmxleC1mbG93OiAwICFpbXBvcnRhbnQ7XG59XG4uZXhwaXJhdGlvbiA6Om5nLWRlZXAgc3BhbiB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZmxleDogbm9uZSAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBzdmcge1xuICBwb3NpdGlvbjogaW5pdGlhbCAhaW1wb3J0YW50O1xuICByaWdodDogNnB4ICFpbXBvcnRhbnQ7XG4gIGxlZnQ6IDhweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiA1cHggIWltcG9ydGFudDtcbn1cblxuLmJ1dHRvbmFkanVzdCB7XG4gIG1hcmdpbi1sZWZ0OiAyNHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5leHBpcmF0aW9ud2hpdGVsaW5lIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICBtYXJnaW4tdG9wOiAyNXB4O1xufVxuXG4uZXhwd2hpdGVsaW5lIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICBtYXJnaW4tdG9wOiAxMzVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG59XG5cbi5iYXJjb2RlIHtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiAycHg7XG59IiwiQGltcG9ydCBcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab21uaWNlbGwvd2ViY29yZWNvbXBvbmVudHMvbGliL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG46aG9zdHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG4gIFxyXG4gIC5CcmFuZE5hbWV7XHJcbiAgICBmb250LXNpemU6IDM3cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbG9yOiR0ZXh0LWNvbG9yO1xyXG4gICAgbWFyZ2luLXRvcDogNDBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gICAgOjpuZy1kZWVwe1xyXG4gICAgICBpbWd7XHJcbiAgICAgICAgJjpmaXJzdC1jaGlsZHtcclxuICAgICAgICAgIHdpZHRoOiA1MHB4IWltcG9ydGFudDtcclxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHghaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLkdlbmVyaWNOYW1le1xyXG4gICAgZm9udC1zaXplOiAzOHB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gICAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgY29sb3I6JHRleHQtY29sb3I7XHJcbiAgICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHghaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE2cHg7XHJcbiB9XHJcblxyXG4gIC5JdGVtSWR7XHJcbiAgICBmb250LXNpemU6IDM4cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgIGNvbG9yOiR0ZXh0LWNvbG9yO1xyXG4gICAgYm90dG9tOiAxNnB4O1xyXG4gICAgbGVmdDogMTZweDtcclxuICB9XHJcblxyXG4gIC5sb2NhdGlvbntcclxuICAgIGZvbnQtc2l6ZTogMjhweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gICAgY29sb3I6JHRleHQtY29sb3I7XHJcbiAgICBib3R0b206IDE2cHg7XHJcbiAgICBsZWZ0OiAxNnB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgLmxvY2F0aW9uZGVzY3JpcHRpb257XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgOjpuZy1kZWVwe1xyXG4gICAgICBkaXZ7XHJcbiAgICAgICAgJjpsYXN0LWNoaWxke1xyXG4gICAgICAgICAgbWFyZ2luLXRvcDogLTI1cHghaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgOjpuZy1kZWVwe1xyXG4gICAgICBpbWd7XHJcbiAgICAgICAgJjpmaXJzdC1jaGlsZHtcclxuICAgICAgICAgIHdpZHRoOiA1MHB4IWltcG9ydGFudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLmRldmljZWxvY2F0aW9uYWNjZXNze1xyXG4gICAgbWFyZ2luLXRvcDo1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICB9XHJcblxyXG4gIC5EZXZpY2VMb2NhdGlvbntcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7ICBcclxuICAgIG1hcmdpbi10b3A6IDhweDtcclxuICAgIG1hcmdpbi1ib3R0b206OHB4OyAgXHJcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgfVxyXG4gIC5wYW5lbENvbnRhaW5lcjEge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIH1cclxuXHJcbiAgLnBhbmVsQ29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgZmxleDogMTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG5cclxuICAuZGlzcGxheUd1aWRlZEN5Y2xlQ291bnQgeyBcclxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkICAjYzhjOGM4IDFweDsgICAgXHJcbiAgICBoZWlnaHQ6IDE4MHB4OyAgXHJcbiAgICBvdmVyZmxvdzogaGlkZGVuOyAgXHJcbiAgfVxyXG5cclxuICAuaXRlbUlkQm94eyAgICAgXHJcbiAgICBoZWlnaHQ6IDc1cHg7XHJcbiAgICB3aWR0aDogNDc4cHg7ICBcclxuICAgIGJvcmRlci1sZWZ0OiBzb2xpZCB3aGl0ZSAyNHB4O1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAgI2M4YzhjOCAxcHg7IFxyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG4gIH1cclxuXHJcbiAgLmxvY2F0aW9uT2ZDeWNsZUNvdW50IHtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIHdpZHRoOiAzMjdweDsgXHJcbiAgICBtYXJnaW4tbGVmdDogMzMwcHg7IFxyXG4gICAgYm9yZGVyLWxlZnQ6IHNvbGlkIHdoaXRlIDI0cHg7XHJcbiAgICBib3JkZXItcmlnaHQ6IHNvbGlkICAjYzhjOGM4IDFweDsgXHJcbiAgfVxyXG5cclxuICAubGVmdEN5Y2xlQ291bnRQYW5lbCB7ICAgXHJcbiAgICBmbGV4OiAxO1xyXG4gICAgYm9yZGVyLXRvcDogc29saWQgICNjOGM4YzggMXB4OyAgICBcclxuICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAgI2M4YzhjOCAyNHB4O1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAgI2M4YzhjOCAyOHB4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDM2MHB4O1xyXG4gICAgbGVmdDogMjRweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzhjOGM4O1xyXG4gIH1cclxuXHJcbiAgLmxlZnRQYW5lbFJvd3tcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICBjb2xvcjokdGV4dC1jb2xvcjtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAgIFxyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiAkYm9sZDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgfVxyXG5cclxuICAucmlnaHRDeWNsZUNvdW50UGFuZWwgeyAgIFxyXG4gICAgYm9yZGVyLXRvcDogc29saWQgICNjOGM4YzggIDFweDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgIFxyXG4gICAgZGlzcGxheTogZmxleDsgXHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gIH1cclxuXHJcbi5pdGVtSWRIZWFkZXJ7XHJcbiAgZm9udC1zaXplOiAxNHB4OyBcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBjb2xvcjokdGV4dC1jb2xvcjtcclxuICBsZWZ0OiAxNnB4O1xyXG4gIHRvcDogMTZweDtcclxuICBib3R0b206IDEwcHg7XHJcbn1cclxuICBcclxuLmRhdGVUaW1le1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgY29sb3I6I2ZmZmZmZjtcclxuICBmb250LXdlaWdodDogbm9ybWFsOztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMjgwcHg7XHJcbn1cclxuXHJcbi5wcmludGxhYmxle1xyXG4gIG1hcmdpbi10b3A6IDEycHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xyXG59XHJcblxyXG4udGV4dENvbnRlbnR7ICAgIFxyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtc2l6ZSA6IDM4cHg7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBjb2xvcjokdGV4dC1jb2xvcjtcclxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLnRvdGFsSXRlbUNvdW50e1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICB2ZXJ0aWNhbC1hbGlnbjogQ2VudGVyO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gIHJpZ2h0OiAxNnB4O1xyXG59XHJcblxyXG4ud2hpdGVsaW5le1xyXG4gIGhlaWdodDogMXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlciFpbXBvcnRhbnQ7XHJcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyIWltcG9ydGFudDtcclxuICBtYXJnaW4tbGVmdDogMTZweDtcclxufVxyXG4uZGVtb3tcclxuICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyIWltcG9ydGFudDtcclxuICBnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsOiBjZW50ZXIhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwMHB4IWltcG9ydGFudDtcclxuICB3aWR0aDogNDAwcHghaW1wb3J0YW50O1xyXG4gIDo6bmctZGVlcHtcclxuICAgIGRpdntcclxuICAgICAgJjpmaXJzdC1jaGlsZHtcclxuICAgICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICAgICAgY29sb3I6JHRleHQtY29sb3I7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4IWltcG9ydGFudDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMTZweCFpbXBvcnRhbnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgOjpuZy1kZWVwe1xyXG4gICAgZGl2Om50aC1jaGlsZCgyKXtcclxuICAgICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIH1cclxuICB9XHJcbiAgOjpuZy1kZWVwe1xyXG4gICAgaW5wdXR7XHJcbiAgICAgICY6Zmlyc3QtY2hpbGR7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMTJweCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAzOHB4IWltcG9ydGFudDtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICAgICAgY29sb3I6JHRleHQtY29sb3I7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgOjpuZy1kZWVwe1xyXG4gICAgZGl2e1xyXG4gICAgICAmOmxhc3QtY2hpbGR7XHJcbiAgICAgIG1hcmdpbi10b3A6IDhweCFpbXBvcnRhbnQ7XHJcbiAgICAgIGZvbnQtc2l6ZTogMThweCFpbXBvcnRhbnQ7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgICAgY29sb3I6JHRleHQtY29sb3I7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gXHJcbiAgOjpuZy1kZWVwe1xyXG4gICAgc3BhbntcclxuICAgICAgbWluLXdpZHRoOiA4MHB4IWltcG9ydGFudDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLmV4cGlyYXRpb257XHJcbiAgbWFyZ2luLXRvcDogMjJweCFpbXBvcnRhbnQ7XHJcbiAgICA6Om5nLWRlZXB7XHJcbiAgICAgIGRpdntcclxuICAgICAgICAmLmZpcnN0LUNoaWxke1xyXG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyNHB4IWltcG9ydGFudDtcclxuICAgICAgICAgIHdpZHRoOiAyMDBweCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICA6Om5nLWRlZXB7XHJcbiAgICAgIGZvcm17XHJcbiAgICAgICAgICBoZWlnaHQ6IDY1cHghaW1wb3J0YW50O1xyXG4gICAgICAgICAgd2lkdGg6IDI5MHB4O1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIDo6bmctZGVlcHtcclxuICAgICBpbnB1dDpudGgtY2hpbGQoMSl7XHJcbiAgICAgICBmb250LXNpemU6IDMwcHghaW1wb3J0YW50O1xyXG4gICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICAgICBtYXJnaW4tbGVmdDogMHB4IWltcG9ydGFudDtcclxuICAgICAgIG1hcmdpbi1yaWdodDogMnB4IWltcG9ydGFudDtcclxuICAgICAgIG1hcmdpbi10b3A6IDNweCFpbXBvcnRhbnQ7XHJcbiAgICAgICBoZWlnaHQ6IDUwcHghaW1wb3J0YW50O1xyXG4gICAgICAgcGFkZGluZy1yaWdodDogbm9uZSFpbXBvcnRhbnQ7XHJcbiAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICBmbGV4OiAwcHghaW1wb3J0YW50O1xyXG4gICAgICAgbWluLXdpZHRoOjQ1cHghaW1wb3J0YW50O1xyXG4gICAgICAgd2lkdGg6IDEyMHB4IWltcG9ydGFudDtcclxuICAgICAgIGRpc3BsYXk6IGluaXRpYWwhaW1wb3J0YW50O1xyXG4gICAgICAgdGV4dC1hbGlnbjogbGVmdCFpbXBvcnRhbnQ7XHJcbiAgICAgICBib3R0b206IDRweCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmbGV4OiAwIWltcG9ydGFudDtcclxuICAgICAgIGZsZXgtd3JhcDogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmbGV4LXNocmluazogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmbGV4LWJhc2lzOiAwIWltcG9ydGFudDtcclxuICAgICAgIGZsZXgtZmxvdzowIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgOjpuZy1kZWVwe1xyXG4gICAgICBpbnB1dDpudGgtY2hpbGQoMyl7XHJcbiAgICAgICAgZm9udC1zaXplOiAzMHB4IWltcG9ydGFudDtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDNweCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHghaW1wb3J0YW50O1xyXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IG5vbmUhaW1wb3J0YW50O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBmbGV4OiAwcHghaW1wb3J0YW50O1xyXG4gICAgICAgIG1pbi13aWR0aDo0NXB4IWltcG9ydGFudDtcclxuICAgICAgICB3aWR0aDogMTIwcHghaW1wb3J0YW50O1xyXG4gICAgICAgIGRpc3BsYXk6IGluaXRpYWwhaW1wb3J0YW50O1xyXG4gICAgICAgIHRleHQtYWxpZ246Y2VudGVyIWltcG9ydGFudDtcclxuICAgICAgICBib3R0b206IDNweCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgZmxleDogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgZmxleC13cmFwOiAwIWltcG9ydGFudDtcclxuICAgICAgICBmbGV4LXNocmluazogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgZmxleC1iYXNpczogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgZmxleC1mbG93OjAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICA6Om5nLWRlZXB7XHJcbiAgICAgIGlucHV0Om50aC1jaGlsZCg1KXtcclxuICAgICAgIGZvbnQtc2l6ZTogMzBweCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgICAgIG1hcmdpbi1sZWZ0OiA0cHghaW1wb3J0YW50O1xyXG4gICAgICAgbWFyZ2luLXJpZ2h0OiAwcHghaW1wb3J0YW50O1xyXG4gICAgICAgbWFyZ2luLWJvdHRvbTogMHB4IWltcG9ydGFudDtcclxuICAgICAgIHBhZGRpbmctcmlnaHQ6IG5vbmUhaW1wb3J0YW50O1xyXG4gICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgZmxleDogMHB4IWltcG9ydGFudDtcclxuICAgICAgIGJvdHRvbTogNnB4IWltcG9ydGFudDtcclxuICAgICAgIG1pbi13aWR0aDo4NXB4IWltcG9ydGFudDtcclxuICAgICAgIGRpc3BsYXk6IGluaXRpYWwhaW1wb3J0YW50O1xyXG4gICAgICAgdGV4dC1hbGlnbjogbGVmdCFpbXBvcnRhbnQ7XHJcbiAgICAgICBib3R0b206IDRweCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmbGV4OiAwIWltcG9ydGFudDtcclxuICAgICAgIGZsZXgtd3JhcDogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmbGV4LXNocmluazogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmbGV4LWJhc2lzOiAwIWltcG9ydGFudDtcclxuICAgICAgIGZsZXgtZmxvdzowIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgOjpuZy1kZWVwe1xyXG4gICAgIHNwYW57XHJcbiAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgLy8gcGFkZGluZzogMHB4IWltcG9ydGFudDtcclxuICAgICAgIG1hcmdpbjogMHB4IWltcG9ydGFudDtcclxuICAgICAgIGZvbnQtc2l6ZTogMzBweCFpbXBvcnRhbnQ7XHJcbiAgICAgICBmbGV4OiBub25lIWltcG9ydGFudDtcclxuICAgICAgIGRpc3BsYXk6IGlubGluZSFpbXBvcnRhbnQ7XHJcbiAgICAgfVxyXG4gICB9XHJcbiAgIFxyXG4gIDo6bmctZGVlcHtcclxuICAgIHN2Z3tcclxuICAgICAgIHBvc2l0aW9uOiBpbml0aWFsIWltcG9ydGFudDtcclxuICAgICAgIHJpZ2h0OiA2cHghaW1wb3J0YW50O1xyXG4gICAgICAgbGVmdDogOHB4IWltcG9ydGFudDtcclxuICAgICAgIG1hcmdpbi10b3A6IDVweCFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi5idXR0b25hZGp1c3R7XHJcbiAgbWFyZ2luLWxlZnQ6IDI0cHghaW1wb3J0YW50O1xyXG59XHJcbi5leHBpcmF0aW9ud2hpdGVsaW5le1xyXG4gIGhlaWdodDogMXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XHJcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlciFpbXBvcnRhbnQ7XHJcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyIWltcG9ydGFudDtcclxuICBtYXJnaW4tbGVmdDogMTZweDtcclxuICBtYXJnaW4tdG9wOiAyNXB4O1xyXG59XHJcbi5leHB3aGl0ZWxpbmV7XHJcbiAgaGVpZ2h0OiAxcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyIWltcG9ydGFudDtcclxuICBnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsOiBjZW50ZXIhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gIG1hcmdpbi10b3A6IDEzNXB4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZSFpbXBvcnRhbnQ7XHJcbn1cclxuLmJhcmNvZGV7XHJcbiAgbWFyZ2luLXRvcDogMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDJweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: GuidedInvMgmtCycleCountPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedInvMgmtCycleCountPageComponent", function() { return GuidedInvMgmtCycleCountPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _api_core_services_guided_cycle_count_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api-core/services/guided-cycle-count-service */ "./src/app/api-core/services/guided-cycle-count-service.ts");
/* harmony import */ var _model_guided_cycle_count__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../model/guided-cycle-count */ "./src/app/core/model/guided-cycle-count.ts");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var _api_core_data_contracts_guided_cycle_count_update__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../api-core/data-contracts/guided-cycle-count-update */ "./src/app/api-core/data-contracts/guided-cycle-count-update.ts");
/* harmony import */ var _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/enums/device-location-access-result */ "./src/app/shared/enums/device-location-access-result.ts");
/* harmony import */ var _shared_services_devices_carousel_location_access_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/services/devices/carousel-location-access.service */ "./src/app/shared/services/devices/carousel-location-access.service.ts");
/* harmony import */ var _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../api-core/services/core-event-connection.service */ "./src/app/api-core/services/core-event-connection.service.ts");
/* harmony import */ var _shared_constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/constants/device-location-type-id */ "./src/app/shared/constants/device-location-type-id.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../api-core/services/hardware-lease-service */ "./src/app/api-core/services/hardware-lease-service.ts");
/* harmony import */ var _shared_components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../shared/components/spinner-popup/spinner-popup.component */ "./src/app/shared/components/spinner-popup/spinner-popup.component.ts");
/* harmony import */ var _shared_services_system_configuration_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../shared/services/system-configuration.service */ "./src/app/shared/services/system-configuration.service.ts");
/* harmony import */ var _api_core_data_contracts_guided_cycle_count_print_label__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../api-core/data-contracts/guided-cycle-count-print-label */ "./src/app/api-core/data-contracts/guided-cycle-count-print-label.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");




















let GuidedInvMgmtCycleCountPageComponent = class GuidedInvMgmtCycleCountPageComponent {
    constructor(activatedRoute, guidedCycleCountService, wpfActionController, carouselLocationAccessService, coreEventConnectionService, dialogService, translateService, hardwareLeaseService, systemConfigurationService) {
        this.activatedRoute = activatedRoute;
        this.guidedCycleCountService = guidedCycleCountService;
        this.wpfActionController = wpfActionController;
        this.carouselLocationAccessService = carouselLocationAccessService;
        this.coreEventConnectionService = coreEventConnectionService;
        this.dialogService = dialogService;
        this.translateService = translateService;
        this.hardwareLeaseService = hardwareLeaseService;
        this.systemConfigurationService = systemConfigurationService;
        this.carouselFaulted = false;
        this.numericindexes = ['', 1, ''];
        this.datepickerindexes = [2, 3, 4, ''];
        this.time = new Date();
        setInterval(() => {
            this.time = new Date();
        }, 1);
        this.itemCount = 0;
        this.currentItemCount = 0;
        this.nextButtonDisable = false;
        this.doneButtonDisable = false;
        this.daterequired = false;
        this.printResult = false;
        this.disablethedate = false;
        this.numericfocus = false;
        this.todaydate = this.time.getMonth() + "/" + this.time.getDate() + "/" + this.time.getFullYear();
        this.leaseBusyTitle$ = translateService.get('LEASE_BUSY_TITLE');
        this.leaseBusyMessage$ = translateService.get('LEASE_BUSY_MESSAGE');
        this._leaseDeniedTitle$ = translateService.get('DEVICE_ACCESS');
    }
    ngOnInit() {
        this.deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
        this.coreEventConnectionService.carouselReadySubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(x => x.DeviceId.toString() == this.deviceId)).subscribe(x => this.carouselFaulted = false);
        this.coreEventConnectionService.carouselFaultedSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(x => x.DeviceId.toString() == this.deviceId)).subscribe(x => this.carouselFaulted = true);
        this.hardwareLeaseService.getDeviceConfiguration(this.deviceId).subscribe(res => {
            console.log(res);
            this.devicePrinterName = res.PrinterName;
        });
        this.systemConfigurationService.GetConfigurationValues('PRINTING', 'LABEL_PRINTER').subscribe(result => {
            console.log('label printer name : ' + result);
            this.labelPrinterName = result.Value;
        });
        this.systemConfigurationService.GetConfigurationValues('TIMEOUTS', 'POP_UP_MESSAGE_TIMEOUT').subscribe(result => {
            console.log('popup message timeout : ' + result);
            this.popupTimeoutSeconds = (Number(result.Value));
        });
        this.systemConfigurationService.GetConfigurationValues('ITEM', 'GUIDEDCYCLECOUNT_SAFETYSTOCK').subscribe(result => {
            console.log('Guided Cycle Count : ' + result);
            this.safetyScanConfirmation = result.Value;
        });
        this.getCycleCountData(this.deviceId);
    }
    ngAfterViewChecked() {
        this.toggleredborderforfirstitem();
    }
    getCycleCountData(deviceID) {
        this.cycleCountItems = this.guidedCycleCountService.get(deviceID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(guidedCycleCountItems => {
            return guidedCycleCountItems.map(p => new _model_guided_cycle_count__WEBPACK_IMPORTED_MODULE_7__["GuidedCycleCount"](p));
        }));
        this.cycleCountItems.subscribe(x => {
            if (x.length > 0 && x[0].ExpirationDate) {
                this.displayCycleCountItem = x[0];
                var date = new Date(x[0].ExpirationDate);
                this.displayCycleCountItem.InStockQuantity = x[0].QuantityOnHand;
                this.toggleredborderfornonfirstitem(true);
                this.displayCycleCountItem.ItemDateFormat = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["DateFormat"].mmddyyyy_withslashes;
                this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
                if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
                    this.DisableActionButtons(true);
                this.cycleCountItemsCopy = x;
                x.splice(0, 1);
                this.itemCount = x.length + 1;
            }
            this.IsLastItem();
            this.currentItemCount++;
        }, () => { this.toggleredborderforfirstitem(); _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["Util"].setByTabIndex(this.numericindexes[1]); }, () => { this.toggleredborderforfirstitem(); _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["Util"].setByTabIndex(this.numericindexes[1]); });
    }
    showValidComponent() {
        return this.displayCycleCountItem && this.cycleCountItemsCopy.length > 1;
    }
    IsLastItem() {
        if (this.itemCount <= 1) {
            this.isLastItem = true;
        }
        else {
            this.isLastItem = false;
        }
    }
    FormatExpireDate(date) {
        if (date) {
            var date = new Date(date);
            return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
        }
    }
    navigateBack() {
        if (this.displayCycleCountItem.DeviceLocationTypeId === _shared_constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_13__["DeviceLocationTypeId"].Carousel) {
            this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
        }
        this.wpfActionController.ExecuteBackAction();
    }
    navigateContinue() {
        if (this.displayCycleCountItem != null) {
            var expireddate = null, actualexpiradationdate = null;
            expireddate = new Date(this.displayCycleCountItem.ExpirationDateFormatted);
            if (this.displayCycleCountItem.ItmExpDateGranularity === "Month") {
                actualexpiradationdate = this.displayCycleCountItem.QuantityOnHand !== 0 ? new Date(expireddate.getFullYear(), expireddate.getMonth() + 1, 0) : null;
            }
            else {
                actualexpiradationdate = this.displayCycleCountItem.QuantityOnHand !== 0 ? new Date(expireddate) : null;
            }
            let update = new _api_core_data_contracts_guided_cycle_count_update__WEBPACK_IMPORTED_MODULE_9__["deviceCycleCountItemUpdate"]({
                DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
                ItemId: this.displayCycleCountItem.ItemId,
                ExpirationDate: actualexpiradationdate,
                QuantityOnHand: this.displayCycleCountItem.QuantityOnHand
            });
            var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
            this.guidedCycleCountService.post(deviceId, update).subscribe(res => {
                console.log(res);
            });
        }
        if (this.isLastItem || this.currentItemCount == this.itemCount) {
            if (this.displayCycleCountItem.DeviceLocationTypeId === _shared_constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_13__["DeviceLocationTypeId"].Carousel) {
                this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
            }
            this.wpfActionController.ExecuteBackAction();
        }
        else {
            this.nextRecord();
        }
    }
    nextRecord() {
        if (this.itemCount == 0) {
            this.isLastItem = true;
        }
        else {
            this.displayCycleCountItem = this.cycleCountItemsCopy[this.currentItemCount - 1];
            var date = new Date(this.cycleCountItemsCopy[this.currentItemCount - 1].ExpirationDate);
            if (this.displayCycleCountItem.QuantityOnHand === 0) {
                this.disabledatecomponent(true);
            }
            else {
                this.disabledatecomponent(false);
            }
            this.displayCycleCountItem.InStockQuantity = this.displayCycleCountItem.QuantityOnHand;
            this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
            if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
                this.DisableActionButtons(true);
            else
                this.DisableActionButtons(false);
            this.currentItemCount++;
            if (this.currentItemCount == this.itemCount) {
                this.isLastItem = true;
            }
        }
        this.toggleredborderfornonfirstitem(true);
        _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["Util"].setByTabIndex(this.numericindexes[1]);
    }
    onQuantityChange($event) {
        if ($event == "0") {
            this.daterequired = false;
            this.disabledatecomponent(true);
            this.toggleredborderfornonfirstitem(true);
            this.DisableActionButtons(false);
        }
        else {
            this.disabledatecomponent(false);
            var eventdate = new Date(this.datepicker && this.datepicker.selectedDate);
            if (this.datepicker && (this.datepicker.selectedDate === null || this.datepicker.selectedDate === "//" || this.datepicker.selectedDate === "")) {
                this.DisableActionButtons(true);
                this.toggleredborderfornonfirstitem(false);
            }
            else if (this.isdateexpired(this.datepicker && this.datepicker.selectedDate)) {
                this.toggleredborderfornonfirstitem(false);
            }
            else if (isNaN(eventdate.getTime()) && this.displayCycleCountItem.ItmExpDateGranularity !== 'None') {
                this.DisableActionButtons(true);
                this.toggleredborderfornonfirstitem(false);
            }
        }
    }
    onDateChange($event) {
        if ($event === '' || $event === null) {
            this.daterequired = true;
        }
        else {
            var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
            if ($event.match(dateReg)) {
                var eventdate = new Date($event);
                if (this.isdateexpired($event)) {
                    this.daterequired = true;
                    this.toggleredborderfornonfirstitem(false);
                    this.DisableActionButtons(false);
                }
                else if (isNaN(eventdate.getTime())) {
                    this.DisableActionButtons(true);
                }
                else {
                    this.daterequired = false;
                    this.DisableActionButtons(false);
                    this.toggleredborderfornonfirstitem(true);
                }
            }
            else {
                this.daterequired = true;
                this.DisableActionButtons(true);
            }
        }
    }
    DisableActionButtons(value) {
        if (this.isLastItem !== true)
            this.nextButtonDisable = value;
        if (this.isLastItem === true)
            this.doneButtonDisable = value;
    }
    CheckItemExpGranularity() {
        return this.displayCycleCountItem && this.displayCycleCountItem.ItmExpDateGranularity != "None" ? false : true;
    }
    navigateSkip() {
        if (this.isLastItem || this.currentItemCount == this.itemCount) {
            if (this.displayCycleCountItem.DeviceLocationTypeId === _shared_constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_13__["DeviceLocationTypeId"].Carousel) {
                this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
            }
            this.wpfActionController.ExecuteBackAction();
        }
        else {
            this.nextRecord();
        }
    }
    toggleredborderfornonfirstitem(nextrecordonly) {
        var element = document.getElementById("datepicker");
        if (element) {
            if (!nextrecordonly) {
                if ((element.classList.contains("ng-touched"))
                    || (element.classList.contains("ng-untouched"))) {
                    element.classList.contains("ng-valid") ? element.classList.remove("ng-valid") : null;
                    element.classList.contains("ng-invalid") ? null : element.classList.add("ng-invalid");
                }
            }
            else {
                element.classList.contains("ng-invalid") ? element.classList.remove("ng-invalid") : null;
                element.classList.contains("ng-dirty") ? element.classList.remove("ng-dirty") : null;
                element.classList.contains("ng-pristine") ? element.classList.remove("ng-pristine") : null;
            }
        }
    }
    disabledatecomponent(value) {
        this.disablethedate = value;
    }
    isdateexpired(input) {
        var todayDate = new Date();
        var todayDateText = (todayDate.getMonth() + 1) + "/" + todayDate.getDate() + "/" + todayDate.getFullYear();
        var inputToDate = Date.parse(input);
        var todayToDate = Date.parse(todayDateText);
        return (inputToDate < todayToDate);
    }
    toggleredborderforfirstitem() {
        if (this.displayCycleCountItem && this.displayCycleCountItem.QuantityOnHand === 0) {
            this.disabledatecomponent(true);
            this.toggleredborderfornonfirstitem(true);
        }
        else if (this.isdateexpired(this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted)
            || (this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted === "")) {
            if (!(this.datepicker && this.datepicker.isDisabled))
                this.toggleredborderfornonfirstitem(false);
        }
    }
    handleDeviceLocationAccessResult(deviceLocaitonAccessResult) {
        if (deviceLocaitonAccessResult == _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_10__["DeviceLocationAccessResult"].LeaseNotAvailable) {
            let leaseDeniedMessage$ = this.translateService.get('LEASE_DENIED_MESSAGE', { deviceDescription: this.displayCycleCountItem.DeviceDescription });
            Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["forkJoin"])(this._leaseDeniedTitle$, leaseDeniedMessage$).subscribe(r => {
                let leaseDeniedPopup = this.displayError('Lease-Denied', r[0], r[1]);
                Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(leaseDeniedPopup.didClickCloseButton, leaseDeniedPopup.didClickPrimaryButton).subscribe(() => this.navigateBack());
            });
        }
        if (deviceLocaitonAccessResult == _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_10__["DeviceLocationAccessResult"].LeaseNotRequested) {
            this.navigateBack();
        }
        if (deviceLocaitonAccessResult == _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_10__["DeviceLocationAccessResult"].Failed) {
            this.carouselFaulted = true;
        }
        else {
            this.carouselFaulted = false;
        }
    }
    handleLeaseBusyChanged(isBusy) {
        if (isBusy) {
            this.leaseBusyPopup$ = this.leaseBusyTitle$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(x => this.showLeaseDialog(x)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
            this.leaseBusyPopup$.subscribe();
        }
        else {
            this.leaseBusyPopup$.subscribe(x => x.onCloseClicked());
        }
    }
    showLeaseDialog(title) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogProperties"]('Lease-Busy');
        properties.titleElementText = title;
        properties.showPrimaryButton = false;
        properties.showSecondaryButton = false;
        properties.showCloseIcon = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogType"].Info;
        properties.timeoutLength = 0;
        properties.component = _shared_components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_16__["SpinnerPopupComponent"];
        return this.dialogService.showOnce(properties);
    }
    displayError(uniqueId, title, message) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogProperties"](uniqueId);
        properties.titleElementText = title;
        properties.messageElementText = message;
        properties.showPrimaryButton = true;
        properties.primaryButtonText = 'Ok';
        properties.showSecondaryButton = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogType"].Error;
        properties.timeoutLength = 0;
        return this.dialogService.showOnce(properties);
    }
    HasLabelPrinterConfigured() {
        if ((this.devicePrinterName != undefined && this.devicePrinterName.length > 0) || this.labelPrinterName != undefined && this.labelPrinterName.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    CheckSafetyScanConfiguration() {
        if (this.safetyScanConfirmation === "Yes" && this.displayCycleCountItem.SafetyStockRestockScan != 'N') {
            this.DisableActionButtons(true);
            return true;
        }
        else {
            this.DisableActionButtons(false);
            return false;
        }
    }
    PrintLabel() {
        this.displayPrintLabel = new _api_core_data_contracts_guided_cycle_count_print_label__WEBPACK_IMPORTED_MODULE_18__["GuidedCycleCountPrintLabel"]({
            ItemId: this.displayCycleCountItem.ItemId,
            DosageForm: this.displayCycleCountItem.DosageForm,
            DeviceId: this.displayCycleCountItem.DeviceId,
            DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
            DeviceLocationDescription: this.displayCycleCountItem.LocationDescription,
            TradeName: this.displayCycleCountItem.BrandNameFormatted,
            GenericName: this.displayCycleCountItem.GenericNameFormatted,
            UnitOfIssue: this.displayCycleCountItem.Units
        });
        this.guidedCycleCountService.PrintLabel(this.deviceId, this.displayPrintLabel).subscribe(res => {
            console.log(_angular_common_http__WEBPACK_IMPORTED_MODULE_19__["HttpResponse"], res);
            if (res) {
                this.printResult = true;
                this.displaySuccessToSaveDialog();
            }
            else {
                this.printResult = false;
                this.displayFailedToSaveDialog();
            }
        }, err => {
            console.error(_angular_common_http__WEBPACK_IMPORTED_MODULE_19__["HttpErrorResponse"], err);
        });
    }
    displaySuccessToSaveDialog() {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogProperties"]('Role-Status-Info');
        this.translateService.get('PRINTSUCCESSFUL_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('PRINTSUCCESSFUL_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
        properties.showPrimaryButton = true;
        properties.showSecondaryButton = false;
        properties.primaryButtonText = 'OK';
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogType"].Info;
        properties.timeoutLength = this.popupTimeoutSeconds;
        this.dialogService.showOnce(properties);
    }
    displayFailedToSaveDialog() {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogProperties"]('Role-Status-Error');
        this.translateService.get('PRINTFAILED_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('PRINTFAILED_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
        properties.showPrimaryButton = true;
        properties.showSecondaryButton = false;
        properties.primaryButtonText = 'OK';
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogType"].Error;
        properties.timeoutLength = this.popupTimeoutSeconds;
        this.dialogService.showOnce(properties);
    }
};
GuidedInvMgmtCycleCountPageComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _api_core_services_guided_cycle_count_service__WEBPACK_IMPORTED_MODULE_6__["GuidedCycleCountService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_8__["WpfActionControllerService"] },
    { type: _shared_services_devices_carousel_location_access_service__WEBPACK_IMPORTED_MODULE_11__["CarouselLocationAccessService"] },
    { type: _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_12__["CoreEventConnectionService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__["TranslateService"] },
    { type: _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_15__["HardwareLeaseService"] },
    { type: _shared_services_system_configuration_service__WEBPACK_IMPORTED_MODULE_17__["SystemConfigurationService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["NumericComponent"], null)
], GuidedInvMgmtCycleCountPageComponent.prototype, "numericElement", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["DatepickerComponent"], null)
], GuidedInvMgmtCycleCountPageComponent.prototype, "datepicker", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["ButtonActionComponent"], null)
], GuidedInvMgmtCycleCountPageComponent.prototype, "nextbutton", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["ButtonActionComponent"], null)
], GuidedInvMgmtCycleCountPageComponent.prototype, "cancelbutton", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["ButtonActionComponent"], null)
], GuidedInvMgmtCycleCountPageComponent.prototype, "donebutton", void 0);
GuidedInvMgmtCycleCountPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-guidedinvmgmt-cyclecount-page',
        template: __webpack_require__(/*! raw-loader!./guidedinvmgmt-cyclecount-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.html"),
        styles: [__webpack_require__(/*! ./guidedinvmgmt-cyclecount-page.component.scss */ "./src/app/core/guidedinvmgmt-cyclecount-page/guidedinvmgmt-cyclecount-page.component.scss")]
    })
], GuidedInvMgmtCycleCountPageComponent);



/***/ }),

/***/ "./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "oc-grid {\n  height: 90%;\n}\n\n:host {\n  height: 100%;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n\n.searchbox {\n  width: 400px;\n  align-self: right;\n}\n\n.badge {\n  position: relative;\n  bottom: 10px;\n  right: -100px;\n}\n\n.cpmwarningtext {\n  font-size: 14px;\n  color: maroon;\n}\n\n.downarrow {\n  transform: rotate(45deg);\n  background-color: pink;\n}\n\n.uparrow {\n  transform: rotate(0deg);\n}\n\n.headertext {\n  float: left;\n}\n\n.headericon {\n  position: relative;\n  left: 15px;\n  top: 3px;\n  float: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2d1aWRlZGludm1nbXQtZGV2aWNlbGlzdC1wYWdlL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcY29yZVxcZ3VpZGVkaW52bWdtdC1kZXZpY2VsaXN0LXBhZ2VcXGd1aWRlZGludm1nbXQtZGV2aWNlbGlzdC1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvZ3VpZGVkaW52bWdtdC1kZXZpY2VsaXN0LXBhZ2UvZ3VpZGVkaW52bWdtdC1kZXZpY2VsaXN0LXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7RUFDQSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSx3QkFBQTtFQUNBLHNCQUFBO0FDQ0Y7O0FERUE7RUFDRSx1QkFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7QUNDRiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9ndWlkZWRpbnZtZ210LWRldmljZWxpc3QtcGFnZS9ndWlkZWRpbnZtZ210LWRldmljZWxpc3QtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm9jLWdyaWR7XHJcbiAgaGVpZ2h0OiA5MCU7XHJcbn1cclxuXHJcbjpob3N0e1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuOmhvc3QgOjpuZy1kZWVwIG9jLWdyaWR7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG59XHJcblxyXG4uc2VhcmNoYm94e1xyXG4gIHdpZHRoOiA0MDBweDtcclxuICBhbGlnbi1zZWxmOiByaWdodDtcclxufVxyXG5cclxuLmJhZGdlIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYm90dG9tOiAxMHB4O1xyXG4gIHJpZ2h0OiAtMTAwcHg7XHJcbn1cclxuXHJcbi5jcG13YXJuaW5ndGV4dHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6IG1hcm9vbjtcclxufVxyXG5cclxuLmRvd25hcnJvd3tcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcclxufVxyXG5cclxuLnVwYXJyb3d7XHJcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XHJcbn1cclxuXHJcbi5oZWFkZXJ0ZXh0e1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4uaGVhZGVyaWNvbntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMTVweDtcclxuICB0b3A6IDNweDtcclxuICBmbG9hdDogbGVmdDtcclxufVxyXG4iLCJvYy1ncmlkIHtcbiAgaGVpZ2h0OiA5MCU7XG59XG5cbjpob3N0IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgb2MtZ3JpZCB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cblxuLnNlYXJjaGJveCB7XG4gIHdpZHRoOiA0MDBweDtcbiAgYWxpZ24tc2VsZjogcmlnaHQ7XG59XG5cbi5iYWRnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm90dG9tOiAxMHB4O1xuICByaWdodDogLTEwMHB4O1xufVxuXG4uY3Btd2FybmluZ3RleHQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiBtYXJvb247XG59XG5cbi5kb3duYXJyb3cge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHBpbms7XG59XG5cbi51cGFycm93IHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG59XG5cbi5oZWFkZXJ0ZXh0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5oZWFkZXJpY29uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAxNXB4O1xuICB0b3A6IDNweDtcbiAgZmxvYXQ6IGxlZnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: GuidedInvMgmtDevicelistPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedInvMgmtDevicelistPageComponent", function() { return GuidedInvMgmtDevicelistPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _model_guided_device_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/guided-device-list */ "./src/app/core/model/guided-device-list.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _api_core_services_guided_device_list_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api-core/services/guided-device-list-service */ "./src/app/api-core/services/guided-device-list-service.ts");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var _constants_wpf_action_paths__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/wpf-action-paths */ "./src/app/core/constants/wpf-action-paths.ts");
/* harmony import */ var _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../api-core/services/hardware-lease-service */ "./src/app/api-core/services/hardware-lease-service.ts");
/* harmony import */ var _api_core_data_contracts_lease_verification_result__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../api-core/data-contracts/lease-verification-result */ "./src/app/api-core/data-contracts/lease-verification-result.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/constants/sort-direction */ "./src/app/shared/constants/sort-direction.ts");













let GuidedInvMgmtDevicelistPageComponent = class GuidedInvMgmtDevicelistPageComponent {
    constructor(guidedDeviceListService, wpfActionControllerService, hardwareLeaseService) {
        this.guidedDeviceListService = guidedDeviceListService;
        this.wpfActionControllerService = wpfActionControllerService;
        this.hardwareLeaseService = hardwareLeaseService;
        this.devicePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_11__["nameof"])("DeviceDescription");
        this.lastCycleCountPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_11__["nameof"])("NumberOfLocationsWithOutdatedCycleCount");
        this.earliestExpirationDatePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_11__["nameof"])("NumberOfLocationsExpiringSoon");
        this.currentSortPropertyName = this.devicePropertyName;
        this.searchFields = [this.devicePropertyName];
    }
    ngOnInit() {
        this.displayGuidedDeviceList$ = this.guidedDeviceListService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(guidedDeviceListItems => {
            return this.sort(guidedDeviceListItems.map(p => new _model_guided_device_list__WEBPACK_IMPORTED_MODULE_2__["GuidedDeviceList"](p)), _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_12__["SortDirection"].ascending);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
    }
    navigateManualCycleCount() {
        this.wpfActionControllerService.ExecuteWpfContinueNavigationAction(_constants_wpf_action_paths__WEBPACK_IMPORTED_MODULE_7__["WpfActionPaths"].ManualCycleCountPath);
    }
    navigate(deviceId) {
        this.hardwareLeaseService.HasDeviceLease(deviceId).subscribe(currentDeviceLeaseOwner => {
            console.log('Current Device Lease Owner : ' + currentDeviceLeaseOwner);
            if (currentDeviceLeaseOwner === _api_core_data_contracts_lease_verification_result__WEBPACK_IMPORTED_MODULE_9__["LeaseVerificationResult"].Success) {
                this.wpfActionControllerService.ExecuteContinueNavigationAction(`guidedinvmgmt/cyclecount`, { deviceId: deviceId.toString() });
            }
            else {
                this.wpfActionControllerService.ExecuteContinueNavigationAction(`hardwareLease/requestLease`, { deviceId, routeToPath: `guidedinvmgmt/cyclecount` });
            }
        });
    }
    ngAfterViewInit() {
        this.searchElement.searchOutput$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((searchData) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(searchData);
        }))
            .subscribe(data => {
            this.searchTextFilter = data;
        });
    }
    columnSelected(event) {
        this.currentSortPropertyName = event.ColumnPropertyName;
        this.displayGuidedDeviceList$ = this.displayGuidedDeviceList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(devices => {
            return this.sort(devices, event.SortDirection);
        }));
    }
    sort(devices, sortDirection) {
        return lodash__WEBPACK_IMPORTED_MODULE_10__["orderBy"](devices, x => x[this.currentSortPropertyName], sortDirection);
    }
    navigatemanualcyclecount() {
        this.wpfActionControllerService.ExecuteContinueNavigationAction(`/guidedinvmgmt/manualcyclecount`);
    }
};
GuidedInvMgmtDevicelistPageComponent.ctorParameters = () => [
    { type: _api_core_services_guided_device_list_service__WEBPACK_IMPORTED_MODULE_5__["GuidedDeviceListService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_6__["WpfActionControllerService"] },
    { type: _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_8__["HardwareLeaseService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBox', null)
], GuidedInvMgmtDevicelistPageComponent.prototype, "searchElement", void 0);
GuidedInvMgmtDevicelistPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-guidedinvmgmt-devicelist-page',
        template: __webpack_require__(/*! raw-loader!./guidedinvmgmt-devicelist-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.html"),
        styles: [__webpack_require__(/*! ./guidedinvmgmt-devicelist-page.component.scss */ "./src/app/core/guidedinvmgmt-devicelist-page/guidedinvmgmt-devicelist-page.component.scss")]
    })
], GuidedInvMgmtDevicelistPageComponent);



/***/ }),

/***/ "./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.scss":
/*!*************************************************************************************************************!*\
  !*** ./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\n:host {\n  height: 100%;\n}\n\n.searchBar {\n  margin-top: 6px;\n  margin-left: 9px;\n  margin-right: 9px;\n}\n\n::ng-deep .col-2 {\n  flex-grow: 1 !important;\n}\n\n::ng-deep .col-3 {\n  flex-grow: 3 !important;\n}\n\n.BrandName {\n  font-size: 38px;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  position: relative;\n  color: #333;\n  margin-top: 10px;\n  margin-left: 16px;\n}\n\n.GenericName {\n  font-size: 38px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  position: relative;\n  font-weight: normal;\n  color: #333;\n  margin-top: 6px;\n  margin-bottom: 8px !important;\n  margin-left: 16px;\n}\n\n.ItemId {\n  font-size: 38px;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n  bottom: 16px;\n  left: 16px;\n}\n\n.location {\n  font-size: 28px;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n  bottom: 16px;\n  left: 16px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.locationdescription {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.devicelocationaccess {\n  margin-top: 18px;\n  margin-left: auto;\n  margin-right: 15px;\n}\n\n.DeviceLocation {\n  font-size: 22px;\n  height: 50px;\n  box-sizing: border-box;\n  margin-top: 2px;\n  margin-bottom: 8px;\n  margin-left: 20px;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.panelContainer1 {\n  display: flex;\n  flex-direction: row;\n  overflow: hidden;\n}\n\n.panelContainer {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  overflow: hidden;\n}\n\n.displayGuidedCycleCount {\n  border-bottom: solid #c8c8c8 1px;\n  height: 180px;\n  overflow: visible;\n}\n\n.itemIdBox {\n  height: 75px;\n  width: 478px;\n  border-left: solid white 24px;\n  border-right: solid #c8c8c8 1px;\n  margin-top: 0px;\n  margin-bottom: 0px;\n}\n\n.locationOfCycleCount {\n  height: 50px;\n  width: 327px;\n  margin-left: 330px;\n  border-left: solid white 24px;\n  border-right: solid #c8c8c8 1px;\n}\n\n.leftCycleCountPanel {\n  flex: 1;\n  border-top: solid #c8c8c8 1px;\n  border-left: solid #c8c8c8 24px;\n  border-right: solid #c8c8c8 28px;\n  height: 100%;\n  width: 360px;\n  left: 24px;\n  box-sizing: border-box;\n  background-color: #c8c8c8;\n}\n\n.leftPanelRow {\n  width: 300px;\n  height: 100px;\n  color: #333;\n  font-size: 18px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  margin-left: 16px;\n  margin-top: 16px;\n  margin-bottom: 16px;\n}\n\n.rightCycleCountPanel {\n  border-top: solid #c8c8c8 1px;\n  height: 100%;\n  width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-weight: 500;\n}\n\n.itemIdHeader {\n  font-size: 14px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-weight: normal;\n  color: #333;\n  left: 16px;\n  top: 6px;\n  bottom: 10px;\n}\n\n.dateTime {\n  font-size: 14px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #ffffff;\n  font-weight: normal;\n  position: relative;\n  vertical-align: center;\n  margin-top: 20px;\n  margin-right: 310px;\n}\n\n.textContent {\n  font-weight: bold;\n  font-size: 38px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  height: 100%;\n  width: 100%;\n  margin-top: 28px !important;\n  color: #333;\n  box-sizing: content-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.totalItemCount {\n  font-size: 20px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #ffffff;\n  font-weight: normal;\n  vertical-align: Center;\n  position: relative;\n  margin-top: 16px;\n  right: 16px;\n}\n\n.whiteline {\n  height: 1px;\n  background-color: #ffffff;\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-left: 16px;\n}\n\n.demo {\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-bottom: 100px !important;\n  width: 400px !important;\n}\n\n.demo ::ng-deep div:first-child {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n  font-size: 20px !important;\n  line-height: 16px !important;\n}\n\n.demo ::ng-deep div:nth-child(2) {\n  height: 100px;\n}\n\n.demo ::ng-deep input:first-child {\n  margin-top: 12px !important;\n  font-size: 38px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #333;\n}\n\n.demo ::ng-deep div:last-child {\n  margin-top: 8px !important;\n  font-size: 18px !important;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-weight: normal;\n  color: #333;\n  margin-bottom: 4px;\n}\n\n.demo ::ng-deep span {\n  min-width: 80px !important;\n}\n\n.expiration {\n  margin-top: 22px !important;\n}\n\n.expiration ::ng-deep div.first-Child {\n  margin-right: 24px !important;\n  width: 200px !important;\n}\n\n.expiration ::ng-deep form {\n  height: 65px !important;\n  width: 290px;\n  background-color: #ffffff;\n}\n\n.expiration ::ng-deep input:nth-child(1) {\n  font-size: 30px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  margin-left: 0px !important;\n  margin-right: 2px !important;\n  margin-top: 3px !important;\n  height: 50px !important;\n  padding-right: none !important;\n  position: relative;\n  flex: 0px !important;\n  min-width: 45px !important;\n  width: 120px !important;\n  display: initial !important;\n  text-align: left !important;\n  bottom: 4px !important;\n  flex: 0 !important;\n  flex-wrap: 0 !important;\n  flex-shrink: 0 !important;\n  flex-basis: 0 !important;\n  flex-flow: 0 !important;\n}\n\n.expiration ::ng-deep input:nth-child(3) {\n  font-size: 30px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  margin-left: 3px !important;\n  margin-right: 3px !important;\n  padding-right: none !important;\n  position: relative;\n  flex: 0px !important;\n  min-width: 45px !important;\n  width: 120px !important;\n  display: initial !important;\n  text-align: center !important;\n  bottom: 3px !important;\n  flex: 0 !important;\n  flex-wrap: 0 !important;\n  flex-shrink: 0 !important;\n  flex-basis: 0 !important;\n  flex-flow: 0 !important;\n}\n\n.expiration ::ng-deep input:nth-child(5) {\n  font-size: 30px !important;\n  font-weight: bold;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  margin-left: 4px !important;\n  margin-right: 0px !important;\n  margin-bottom: 0px !important;\n  padding-right: none !important;\n  position: relative;\n  flex: 0px !important;\n  bottom: 6px !important;\n  min-width: 85px !important;\n  display: initial !important;\n  text-align: left !important;\n  bottom: 4px !important;\n  flex: 0 !important;\n  flex-wrap: 0 !important;\n  flex-shrink: 0 !important;\n  flex-basis: 0 !important;\n  flex-flow: 0 !important;\n}\n\n.expiration ::ng-deep span {\n  font-weight: bold;\n  margin: 0px !important;\n  font-size: 30px !important;\n  flex: none !important;\n  display: inline !important;\n}\n\n.expiration ::ng-deep svg {\n  position: initial !important;\n  right: 6px !important;\n  left: 8px !important;\n  margin-top: 5px !important;\n}\n\n.buttonadjust {\n  margin-left: 24px !important;\n}\n\n.expirationwhiteline {\n  height: 1px;\n  background-color: #ffffff;\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-left: 16px;\n  margin-top: 25px;\n}\n\n.expwhiteline {\n  height: 1px;\n  background-color: #ffffff;\n  vertical-align: center !important;\n  glyph-orientation-horizontal: center !important;\n  margin-left: 16px;\n  margin-top: 135px;\n  position: relative !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2d1aWRlZGludm1nbXQtbWFudWFsY3ljbGVjb3VudC1wYWdlL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcY29yZVxcZ3VpZGVkaW52bWdtdC1tYW51YWxjeWNsZWNvdW50LXBhZ2VcXGd1aWRlZGludm1nbXQtbWFudWFsY3ljbGVjb3VudC1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvZ3VpZGVkaW52bWdtdC1tYW51YWxjeWNsZWNvdW50LXBhZ2UvZ3VpZGVkaW52bWdtdC1tYW51YWxjeWNsZWNvdW50LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9ndWlkZWRpbnZtZ210LW1hbnVhbGN5Y2xlY291bnQtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QkE7RUFDRSxhQUFBO0FDNUJGOztBRDhCQTtFQUNFLE9BQUE7QUMzQkY7O0FENkJBO0VBQ0Usc0JBQUE7QUMxQkY7O0FDVEE7RUFDRSxZQUFBO0FEWUY7O0FDVEE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBRFlGOztBQ1ZBO0VBQ0UsdUJBQUE7QURhRjs7QUNYQTtFQUNFLHVCQUFBO0FEY0Y7O0FDWEE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSw2RUZEdUI7RUVFdkIsa0JBQUE7RUFDQSxXRkxXO0VFTVgsZ0JBQUE7RUFDQSxpQkFBQTtBRGNGOztBQ1hBO0VBQ0UsZUFBQTtFQUNBLDZFRlZ1QjtFRVd2QixrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0ZmVztFRWdCWCxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxpQkFBQTtBRGNGOztBQ1hBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsNkVGdEJ1QjtFRXVCdkIsV0Z6Qlc7RUUwQlgsWUFBQTtFQUNBLFVBQUE7QURjRjs7QUNYQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLDZFRi9CdUI7RUVnQ3ZCLFdGbENXO0VFbUNYLFlBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxXQUFBO0FEY0Y7O0FDWkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtBRGVGOztBQ2JBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FEZ0JGOztBQ2JBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0FEZ0JGOztBQ2RBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QURpQkY7O0FDZEE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0VBQ0EsZ0JBQUE7QURpQkY7O0FDZEE7RUFDRSxnQ0FBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBRGlCRjs7QUNkQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBRGlCRjs7QUNkQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtFQUNBLCtCQUFBO0FEaUJGOztBQ2RBO0VBQ0UsT0FBQTtFQUNBLDZCQUFBO0VBQ0EsK0JBQUE7RUFDQSxnQ0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7QURpQkY7O0FDZEE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFdGcEhXO0VFcUhYLGVBQUE7RUFDQSw2RUZwSHVCO0VFcUh2Qix1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JGcEdLO0VFcUdMLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBRGlCRjs7QUNkQTtFQUNFLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsNkVGckl1QjtFRXNJdkIsZ0JBQUE7QURpQkY7O0FDZEE7RUFDRSxlQUFBO0VBQ0EsNkVGM0l1QjtFRTRJdkIsbUJBQUE7RUFDQSxXRi9JVztFRWdKWCxVQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QURpQkY7O0FDZEE7RUFDRSxlQUFBO0VBQ0EsNkVGckp1QjtFRXNKdkIsY0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QURpQkY7O0FDZEE7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSw2RUZqS3VCO0VFa0t2QixZQUFBO0VBQ0EsV0FBQTtFQUNBLDJCQUFBO0VBQ0EsV0Z2S1c7RUV3S1gsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBRGlCRjs7QUNmQTtFQUNFLGVBQUE7RUFDQSw2RUY3S3VCO0VFOEt2QixjQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FEa0JGOztBQ2ZBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUNBQUE7RUFDQSwrQ0FBQTtFQUNBLGlCQUFBO0FEa0JGOztBQ2hCQTtFQUNFLGlDQUFBO0VBQ0EsK0NBQUE7RUFDQSwrQkFBQTtFQUNBLHVCQUFBO0FEbUJGOztBQ2hCTTtFQUNFLDZFRnJNaUI7RUVzTWpCLFdGeE1LO0VFeU1MLDBCQUFBO0VBQ0EsNEJBQUE7QURrQlI7O0FDYkk7RUFDRSxhQUFBO0FEZU47O0FDVk07RUFDRSwyQkFBQTtFQUNBLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSw2RUZ2TmlCO0VFd05qQixXRjFOSztBQ3NPYjs7QUNOTTtFQUNFLDBCQUFBO0VBQ0EsMEJBQUE7RUFDQSw2RUZqT2lCO0VFa09qQixtQkFBQTtFQUNBLFdGck9LO0VFc09MLGtCQUFBO0FEUVI7O0FDSEk7RUFDRSwwQkFBQTtBREtOOztBQ0RBO0VBQ0UsMkJBQUE7QURJRjs7QUNETTtFQUNFLDZCQUFBO0VBQ0EsdUJBQUE7QURHUjs7QUNFSTtFQUNFLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0FEQU47O0FDSUk7RUFDRSwwQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNkVGblFtQjtFRW9RbkIsMkJBQUE7RUFDQSw0QkFBQTtFQUNBLDBCQUFBO0VBQ0EsdUJBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMkJBQUE7RUFDQSwyQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7RUFDQSx1QkFBQTtBREZOOztBQ01JO0VBQ0UsMEJBQUE7RUFDQSxpQkFBQTtFQUNBLDZFRjNSbUI7RUU0Um5CLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMkJBQUE7RUFDQSw2QkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7RUFDQSx1QkFBQTtBREpOOztBQ1FJO0VBQ0UsMEJBQUE7RUFDQSxpQkFBQTtFQUNBLDZFRmpUbUI7RUVrVG5CLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsMEJBQUE7RUFDQSwyQkFBQTtFQUNBLDJCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSx3QkFBQTtFQUNBLHVCQUFBO0FETk47O0FDV0k7RUFDRSxpQkFBQTtFQUVBLHNCQUFBO0VBQ0EsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLDBCQUFBO0FEVk47O0FDZUk7RUFDRSw0QkFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtBRGJOOztBQ2lCQTtFQUNFLDRCQUFBO0FEZEY7O0FDZ0JBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUNBQUE7RUFDQSwrQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QURiRjs7QUNlQTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGlDQUFBO0VBQ0EsK0NBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNkJBQUE7QURaRiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9ndWlkZWRpbnZtZ210LW1hbnVhbGN5Y2xlY291bnQtcGFnZS9ndWlkZWRpbnZtZ210LW1hbnVhbGN5Y2xlY291bnQtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRib3JkZXItcmFkaXVzOiA0cHg7XHJcbiRib3JkZXItY29sb3I6ICNhMGEyYTg7XHJcbiRzbGF0ZS1ncmV5OiAjNUU2QTcxO1xyXG4kYnJhbmQtcHJpbWFyeTogIzY5QkUyODtcclxuJGJyYW5kLWxpZ2h0Ymx1ZTogIzk3QzBFNjtcclxuJGJyYW5kLW1lZGl1bWJsdWU6ICM2Njk5Q0M7XHJcbiRicmFuZC1zZWNvbmRhcnk6ICM2OWM7XHJcbiRicmFuZC1pbmZvOiAjMDA2Njk5O1xyXG4kYnJhbmQtd2FybmluZyA6ICNmMGFkNGU7XHJcbiRicmFuZC1kYW5nZXIgOiAjQzgwODE5O1xyXG4kbGlnaHQtZ3JleTogI2RkZDtcclxuJGRhcmstZ3JleTogIzk5OTtcclxuJGFjdGlvbi1ibHVlOiAjNjY5OWNjO1xyXG4kYmFkZ2UtaW5mbzogI0YzRjlGRjtcclxuJHNjcm9sbC1idXR0b24tY29sb3I6ICNhMGEyYTg7XHJcbiRzY3JvbGwtYmFyLWNvbG9yOiAjRURFREVFO1xyXG5cclxuJHRleHQtY29sb3I6ICMzMzM7XHJcbiRwbGFjZWhvbGRlci10ZXh0LWNvbG9yOiAjOTk5O1xyXG4kZm9udC1mYW1pbHktc2Fucy1zZXJpZjogXCJTZWdvZSBVSVwiLFwiSGVsdmV0aWNhIE5ldWVcIixcIkhlbHZldGljYVwiLFwiQXJpYWxcIixcInNhbnMtc2VyaWZcIiAhZGVmYXVsdDtcclxuJGZvbnQtc2l6ZS14eGxhcmdlOiAyNnB4O1xyXG4kZm9udC1zaXplLXhsYXJnZTogMjRweDtcclxuJGZvbnQtc2l6ZS1sYXJnZTogMjJweDtcclxuJGZvbnQtc2l6ZS1tZWRpdW06IDIwcHg7XHJcbiRmb250LXNpemUtYmFzZTogMThweDtcclxuJGZvbnQtc2l6ZS1zbWFsbDogMTZweDtcclxuJGZvbnQtc2l6ZS14c21hbGw6IDE0cHg7XHJcbiRmb250LXNpemUteHhzbWFsbDogMTJweDtcclxuJGVycm9yLW1lc3NhZ2U6ICNDNzA3MTk7XHJcbi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5mbGV4LTEge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuLmNvbHVtbiB7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG4kYm9sZDogNjAwO1xyXG4kc2VtaS1ib2xkOiA1MDA7XHJcbiRyZWd1bGFyOiA0MDA7XHJcblxyXG4kYnV0dG9uLWZvbnQtc2l6ZTogMjBweDtcclxuXHJcbi8vIHotaW5kZXhcclxuJHNlYXJjaGRyb3Bkb3duLXppbmRleDogOTk4O1xyXG4kaGVhZGVyLWluZGV4OiA5OTkgIWRlZmF1bHQ7IC8vIEZvciB0aGUgaGVhZGVyXHJcbiRwb3B1cHdpbmRvdy16aW5kZXg6IDEwMDAgIWRlZmF1bHQ7IC8vIEZvciB0aGUgcG9wdXB3aW5kb3dcclxuJGNhbGVuZGFyLXppbmRleDogMTAwMSAhZGVmYXVsdDtcclxuJHBvcHVwZGlhbG9nLXppbmRleDogMTAwMiAhZGVmYXVsdDsgLy8gRm9yIHRoZSBwb3B1cHdpbmRvd1xyXG4kdG9hc3QtemluZGV4OiAxMDAzICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJGhvdmVyLXppbmRleDogMTAwNCAhZGVmYXVsdDsgLy8gRm9yIHRoZSBob3ZlclxyXG4kYmFkZ2UtemluZGV4OiAxMDA1ICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJHByb2dyZXNzYmFyLXppbmRleDogMTAwNSAhZGVmYXVsdDtcclxuJGRpc2FibGVkLWlucHV0LWNvbG9yOiAjZjJmMmYyO1xyXG4kdmFsaWRhdGlvbi1lcnJvci1ib3JkZXItY29sb3I6IHJlZDtcclxuJHNpZGVwYW5lbC1idXR0b24temluZGV4OiA5OTkgIWRlZmF1bHQ7XHJcbiIsIi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmZsZXgtMSB7XG4gIGZsZXg6IDE7XG59XG5cbi5jb2x1bW4ge1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG46aG9zdCB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnNlYXJjaEJhciB7XG4gIG1hcmdpbi10b3A6IDZweDtcbiAgbWFyZ2luLWxlZnQ6IDlweDtcbiAgbWFyZ2luLXJpZ2h0OiA5cHg7XG59XG5cbjo6bmctZGVlcCAuY29sLTIge1xuICBmbGV4LWdyb3c6IDEgIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIC5jb2wtMyB7XG4gIGZsZXgtZ3JvdzogMyAhaW1wb3J0YW50O1xufVxuXG4uQnJhbmROYW1lIHtcbiAgZm9udC1zaXplOiAzOHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tbGVmdDogMTZweDtcbn1cblxuLkdlbmVyaWNOYW1lIHtcbiAgZm9udC1zaXplOiAzOHB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbi10b3A6IDZweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4uSXRlbUlkIHtcbiAgZm9udC1zaXplOiAzOHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBjb2xvcjogIzMzMztcbiAgYm90dG9tOiAxNnB4O1xuICBsZWZ0OiAxNnB4O1xufVxuXG4ubG9jYXRpb24ge1xuICBmb250LXNpemU6IDI4cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGNvbG9yOiAjMzMzO1xuICBib3R0b206IDE2cHg7XG4gIGxlZnQ6IDE2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5sb2NhdGlvbmRlc2NyaXB0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5kZXZpY2Vsb2NhdGlvbmFjY2VzcyB7XG4gIG1hcmdpbi10b3A6IDE4cHg7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG59XG5cbi5EZXZpY2VMb2NhdGlvbiB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5wYW5lbENvbnRhaW5lcjEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucGFuZWxDb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uZGlzcGxheUd1aWRlZEN5Y2xlQ291bnQge1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAjYzhjOGM4IDFweDtcbiAgaGVpZ2h0OiAxODBweDtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi5pdGVtSWRCb3gge1xuICBoZWlnaHQ6IDc1cHg7XG4gIHdpZHRoOiA0NzhweDtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIHdoaXRlIDI0cHg7XG4gIGJvcmRlci1yaWdodDogc29saWQgI2M4YzhjOCAxcHg7XG4gIG1hcmdpbi10b3A6IDBweDtcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xufVxuXG4ubG9jYXRpb25PZkN5Y2xlQ291bnQge1xuICBoZWlnaHQ6IDUwcHg7XG4gIHdpZHRoOiAzMjdweDtcbiAgbWFyZ2luLWxlZnQ6IDMzMHB4O1xuICBib3JkZXItbGVmdDogc29saWQgd2hpdGUgMjRweDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAjYzhjOGM4IDFweDtcbn1cblxuLmxlZnRDeWNsZUNvdW50UGFuZWwge1xuICBmbGV4OiAxO1xuICBib3JkZXItdG9wOiBzb2xpZCAjYzhjOGM4IDFweDtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkICNjOGM4YzggMjRweDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAjYzhjOGM4IDI4cHg7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDM2MHB4O1xuICBsZWZ0OiAyNHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzhjOGM4O1xufVxuXG4ubGVmdFBhbmVsUm93IHtcbiAgd2lkdGg6IDMwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBjb2xvcjogIzMzMztcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tbGVmdDogMTZweDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cblxuLnJpZ2h0Q3ljbGVDb3VudFBhbmVsIHtcbiAgYm9yZGVyLXRvcDogc29saWQgI2M4YzhjOCAxcHg7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5pdGVtSWRIZWFkZXIge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICMzMzM7XG4gIGxlZnQ6IDE2cHg7XG4gIHRvcDogNnB4O1xuICBib3R0b206IDEwcHg7XG59XG5cbi5kYXRlVGltZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDMxMHB4O1xufVxuXG4udGV4dENvbnRlbnQge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAzOHB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDI4cHggIWltcG9ydGFudDtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnRvdGFsSXRlbUNvdW50IHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB2ZXJ0aWNhbC1hbGlnbjogQ2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG4gIHJpZ2h0OiAxNnB4O1xufVxuXG4ud2hpdGVsaW5lIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4uZGVtbyB7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1ib3R0b206IDEwMHB4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiA0MDBweCAhaW1wb3J0YW50O1xufVxuLmRlbW8gOjpuZy1kZWVwIGRpdjpmaXJzdC1jaGlsZCB7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgY29sb3I6ICMzMzM7XG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogMTZweCAhaW1wb3J0YW50O1xufVxuLmRlbW8gOjpuZy1kZWVwIGRpdjpudGgtY2hpbGQoMikge1xuICBoZWlnaHQ6IDEwMHB4O1xufVxuLmRlbW8gOjpuZy1kZWVwIGlucHV0OmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMTJweCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDM4cHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgY29sb3I6ICMzMzM7XG59XG4uZGVtbyA6Om5nLWRlZXAgZGl2Omxhc3QtY2hpbGQge1xuICBtYXJnaW4tdG9wOiA4cHggIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cbi5kZW1vIDo6bmctZGVlcCBzcGFuIHtcbiAgbWluLXdpZHRoOiA4MHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5leHBpcmF0aW9uIHtcbiAgbWFyZ2luLXRvcDogMjJweCAhaW1wb3J0YW50O1xufVxuLmV4cGlyYXRpb24gOjpuZy1kZWVwIGRpdi5maXJzdC1DaGlsZCB7XG4gIG1hcmdpbi1yaWdodDogMjRweCAhaW1wb3J0YW50O1xuICB3aWR0aDogMjAwcHggIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBmb3JtIHtcbiAgaGVpZ2h0OiA2NXB4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAyOTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBpbnB1dDpudGgtY2hpbGQoMSkge1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgbWFyZ2luLWxlZnQ6IDBweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDJweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAzcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctcmlnaHQ6IG5vbmUgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4OiAwcHggIWltcG9ydGFudDtcbiAgbWluLXdpZHRoOiA0NXB4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAxMjBweCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBpbml0aWFsICFpbXBvcnRhbnQ7XG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcbiAgYm90dG9tOiA0cHggIWltcG9ydGFudDtcbiAgZmxleDogMCAhaW1wb3J0YW50O1xuICBmbGV4LXdyYXA6IDAgIWltcG9ydGFudDtcbiAgZmxleC1zaHJpbms6IDAgIWltcG9ydGFudDtcbiAgZmxleC1iYXNpczogMCAhaW1wb3J0YW50O1xuICBmbGV4LWZsb3c6IDAgIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBpbnB1dDpudGgtY2hpbGQoMykge1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgbWFyZ2luLWxlZnQ6IDNweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDNweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxleDogMHB4ICFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogNDVweCAhaW1wb3J0YW50O1xuICB3aWR0aDogMTIwcHggIWltcG9ydGFudDtcbiAgZGlzcGxheTogaW5pdGlhbCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgYm90dG9tOiAzcHggIWltcG9ydGFudDtcbiAgZmxleDogMCAhaW1wb3J0YW50O1xuICBmbGV4LXdyYXA6IDAgIWltcG9ydGFudDtcbiAgZmxleC1zaHJpbms6IDAgIWltcG9ydGFudDtcbiAgZmxleC1iYXNpczogMCAhaW1wb3J0YW50O1xuICBmbGV4LWZsb3c6IDAgIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBpbnB1dDpudGgtY2hpbGQoNSkge1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgbWFyZ2luLWxlZnQ6IDRweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1yaWdodDogbm9uZSAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZsZXg6IDBweCAhaW1wb3J0YW50O1xuICBib3R0b206IDZweCAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IDg1cHggIWltcG9ydGFudDtcbiAgZGlzcGxheTogaW5pdGlhbCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XG4gIGJvdHRvbTogNHB4ICFpbXBvcnRhbnQ7XG4gIGZsZXg6IDAgIWltcG9ydGFudDtcbiAgZmxleC13cmFwOiAwICFpbXBvcnRhbnQ7XG4gIGZsZXgtc2hyaW5rOiAwICFpbXBvcnRhbnQ7XG4gIGZsZXgtYmFzaXM6IDAgIWltcG9ydGFudDtcbiAgZmxleC1mbG93OiAwICFpbXBvcnRhbnQ7XG59XG4uZXhwaXJhdGlvbiA6Om5nLWRlZXAgc3BhbiB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcbiAgZmxleDogbm9uZSAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcbn1cbi5leHBpcmF0aW9uIDo6bmctZGVlcCBzdmcge1xuICBwb3NpdGlvbjogaW5pdGlhbCAhaW1wb3J0YW50O1xuICByaWdodDogNnB4ICFpbXBvcnRhbnQ7XG4gIGxlZnQ6IDhweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiA1cHggIWltcG9ydGFudDtcbn1cblxuLmJ1dHRvbmFkanVzdCB7XG4gIG1hcmdpbi1sZWZ0OiAyNHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5leHBpcmF0aW9ud2hpdGVsaW5lIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICBtYXJnaW4tdG9wOiAyNXB4O1xufVxuXG4uZXhwd2hpdGVsaW5lIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbDogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICBtYXJnaW4tdG9wOiAxMzVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG59IiwiQGltcG9ydCBcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab21uaWNlbGwvd2ViY29yZWNvbXBvbmVudHMvbGliL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG46aG9zdCB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uc2VhcmNoQmFyIHtcclxuICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDlweDtcclxuICBtYXJnaW4tcmlnaHQ6IDlweDtcclxufVxyXG46Om5nLWRlZXAgLmNvbC0yIHtcclxuICBmbGV4LWdyb3c6IDEgIWltcG9ydGFudDtcclxufVxyXG46Om5nLWRlZXAgLmNvbC0zIHtcclxuICBmbGV4LWdyb3c6IDMgIWltcG9ydGFudDtcclxufVxyXG5cclxuLkJyYW5kTmFtZSB7XHJcbiAgZm9udC1zaXplOiAzOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgY29sb3I6ICR0ZXh0LWNvbG9yO1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XHJcbn1cclxuXHJcbi5HZW5lcmljTmFtZSB7XHJcbiAgZm9udC1zaXplOiAzOHB4O1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBjb2xvcjogJHRleHQtY29sb3I7XHJcbiAgbWFyZ2luLXRvcDogNnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDhweCAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG59XHJcblxyXG4uSXRlbUlkIHtcclxuICBmb250LXNpemU6IDM4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuICBib3R0b206IDE2cHg7XHJcbiAgbGVmdDogMTZweDtcclxufVxyXG5cclxuLmxvY2F0aW9uIHtcclxuICBmb250LXNpemU6IDI4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuICBib3R0b206IDE2cHg7XHJcbiAgbGVmdDogMTZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5sb2NhdGlvbmRlc2NyaXB0aW9uIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLmRldmljZWxvY2F0aW9uYWNjZXNzIHtcclxuICBtYXJnaW4tdG9wOiAxOHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogMTVweDtcclxufVxyXG5cclxuLkRldmljZUxvY2F0aW9uIHtcclxuICBmb250LXNpemU6IDIycHg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgbWFyZ2luLXRvcDogMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcbi5wYW5lbENvbnRhaW5lcjEge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4ucGFuZWxDb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBmbGV4OiAxO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5kaXNwbGF5R3VpZGVkQ3ljbGVDb3VudCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgI2M4YzhjOCAxcHg7XHJcbiAgaGVpZ2h0OiAxODBweDtcclxuICBvdmVyZmxvdzogdmlzaWJsZTtcclxufVxyXG5cclxuLml0ZW1JZEJveCB7XHJcbiAgaGVpZ2h0OiA3NXB4O1xyXG4gIHdpZHRoOiA0NzhweDtcclxuICBib3JkZXItbGVmdDogc29saWQgd2hpdGUgMjRweDtcclxuICBib3JkZXItcmlnaHQ6IHNvbGlkICNjOGM4YzggMXB4O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbn1cclxuXHJcbi5sb2NhdGlvbk9mQ3ljbGVDb3VudCB7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiAzMjdweDtcclxuICBtYXJnaW4tbGVmdDogMzMwcHg7XHJcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIHdoaXRlIDI0cHg7XHJcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAjYzhjOGM4IDFweDtcclxufVxyXG5cclxuLmxlZnRDeWNsZUNvdW50UGFuZWwge1xyXG4gIGZsZXg6IDE7XHJcbiAgYm9yZGVyLXRvcDogc29saWQgI2M4YzhjOCAxcHg7XHJcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkICNjOGM4YzggMjRweDtcclxuICBib3JkZXItcmlnaHQ6IHNvbGlkICNjOGM4YzggMjhweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDM2MHB4O1xyXG4gIGxlZnQ6IDI0cHg7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzhjOGM4O1xyXG59XHJcblxyXG4ubGVmdFBhbmVsUm93IHtcclxuICB3aWR0aDogMzAwcHg7XHJcbiAgaGVpZ2h0OiAxMDBweDtcclxuICBjb2xvcjogJHRleHQtY29sb3I7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OiAkYm9sZDtcclxuICBtYXJnaW4tbGVmdDogMTZweDtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbn1cclxuXHJcbi5yaWdodEN5Y2xlQ291bnRQYW5lbCB7XHJcbiAgYm9yZGVyLXRvcDogc29saWQgI2M4YzhjOCAxcHg7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG4uaXRlbUlkSGVhZGVyIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgY29sb3I6ICR0ZXh0LWNvbG9yO1xyXG4gIGxlZnQ6IDE2cHg7XHJcbiAgdG9wOiA2cHg7XHJcbiAgYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uZGF0ZVRpbWUge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMzEwcHg7XHJcbn1cclxuXHJcbi50ZXh0Q29udGVudCB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiAzOHB4O1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLXRvcDogMjhweCFpbXBvcnRhbnQ7XHJcbiAgY29sb3I6ICR0ZXh0LWNvbG9yO1xyXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4udG90YWxJdGVtQ291bnQge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICB2ZXJ0aWNhbC1hbGlnbjogQ2VudGVyO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gIHJpZ2h0OiAxNnB4O1xyXG59XHJcblxyXG4ud2hpdGVsaW5lIHtcclxuICBoZWlnaHQ6IDFweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICBnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICBtYXJnaW4tbGVmdDogMTZweDtcclxufVxyXG4uZGVtbyB7XHJcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gIGdseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWw6IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwMHB4ICFpbXBvcnRhbnQ7XHJcbiAgd2lkdGg6IDQwMHB4ICFpbXBvcnRhbnQ7XHJcbiAgOjpuZy1kZWVwIHtcclxuICAgIGRpdiB7XHJcbiAgICAgICY6Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgICAgICBjb2xvcjogJHRleHQtY29sb3I7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE2cHggIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICA6Om5nLWRlZXAge1xyXG4gICAgZGl2Om50aC1jaGlsZCgyKSB7XHJcbiAgICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIDo6bmctZGVlcCB7XHJcbiAgICBpbnB1dCB7XHJcbiAgICAgICY6Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDEycHggIWltcG9ydGFudDtcclxuICAgICAgICBmb250LXNpemU6IDM4cHggIWltcG9ydGFudDtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICAgICAgY29sb3I6ICR0ZXh0LWNvbG9yO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIDo6bmctZGVlcCB7XHJcbiAgICBkaXYge1xyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDhweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgOjpuZy1kZWVwIHtcclxuICAgIHNwYW4ge1xyXG4gICAgICBtaW4td2lkdGg6IDgwcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLmV4cGlyYXRpb24ge1xyXG4gIG1hcmdpbi10b3A6IDIycHggIWltcG9ydGFudDtcclxuICA6Om5nLWRlZXAge1xyXG4gICAgZGl2IHtcclxuICAgICAgJi5maXJzdC1DaGlsZCB7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgd2lkdGg6IDIwMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgOjpuZy1kZWVwIHtcclxuICAgIGZvcm0ge1xyXG4gICAgICBoZWlnaHQ6IDY1cHggIWltcG9ydGFudDtcclxuICAgICAgd2lkdGg6IDI5MHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgfVxyXG4gIH1cclxuICA6Om5nLWRlZXAge1xyXG4gICAgaW5wdXQ6bnRoLWNoaWxkKDEpIHtcclxuICAgICAgZm9udC1zaXplOiAzMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAwcHggIWltcG9ydGFudDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAycHggIWltcG9ydGFudDtcclxuICAgICAgbWFyZ2luLXRvcDogM3B4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIGhlaWdodDogNTBweCAhaW1wb3J0YW50O1xyXG4gICAgICBwYWRkaW5nLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgZmxleDogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIG1pbi13aWR0aDogNDVweCAhaW1wb3J0YW50O1xyXG4gICAgICB3aWR0aDogMTIwcHggIWltcG9ydGFudDtcclxuICAgICAgZGlzcGxheTogaW5pdGlhbCAhaW1wb3J0YW50O1xyXG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XHJcbiAgICAgIGJvdHRvbTogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIGZsZXg6IDAgIWltcG9ydGFudDtcclxuICAgICAgZmxleC13cmFwOiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgIGZsZXgtc2hyaW5rOiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgIGZsZXgtYmFzaXM6IDAgIWltcG9ydGFudDtcclxuICAgICAgZmxleC1mbG93OiAwICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIDo6bmctZGVlcCB7XHJcbiAgICBpbnB1dDpudGgtY2hpbGQoMykge1xyXG4gICAgICBmb250LXNpemU6IDMwcHggIWltcG9ydGFudDtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDNweCAhaW1wb3J0YW50O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDNweCAhaW1wb3J0YW50O1xyXG4gICAgICBwYWRkaW5nLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgZmxleDogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIG1pbi13aWR0aDogNDVweCAhaW1wb3J0YW50O1xyXG4gICAgICB3aWR0aDogMTIwcHggIWltcG9ydGFudDtcclxuICAgICAgZGlzcGxheTogaW5pdGlhbCAhaW1wb3J0YW50O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICAgICAgYm90dG9tOiAzcHggIWltcG9ydGFudDtcclxuICAgICAgZmxleDogMCAhaW1wb3J0YW50O1xyXG4gICAgICBmbGV4LXdyYXA6IDAgIWltcG9ydGFudDtcclxuICAgICAgZmxleC1zaHJpbms6IDAgIWltcG9ydGFudDtcclxuICAgICAgZmxleC1iYXNpczogMCAhaW1wb3J0YW50O1xyXG4gICAgICBmbGV4LWZsb3c6IDAgIWltcG9ydGFudDtcclxuICAgIH1cclxuICB9XHJcbiAgOjpuZy1kZWVwIHtcclxuICAgIGlucHV0Om50aC1jaGlsZCg1KSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMzBweCAhaW1wb3J0YW50O1xyXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gICAgICBtYXJnaW4tbGVmdDogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDBweCAhaW1wb3J0YW50O1xyXG4gICAgICBwYWRkaW5nLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgZmxleDogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIGJvdHRvbTogNnB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIG1pbi13aWR0aDogODVweCAhaW1wb3J0YW50O1xyXG4gICAgICBkaXNwbGF5OiBpbml0aWFsICFpbXBvcnRhbnQ7XHJcbiAgICAgIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICAgICAgYm90dG9tOiA0cHggIWltcG9ydGFudDtcclxuICAgICAgZmxleDogMCAhaW1wb3J0YW50O1xyXG4gICAgICBmbGV4LXdyYXA6IDAgIWltcG9ydGFudDtcclxuICAgICAgZmxleC1zaHJpbms6IDAgIWltcG9ydGFudDtcclxuICAgICAgZmxleC1iYXNpczogMCAhaW1wb3J0YW50O1xyXG4gICAgICBmbGV4LWZsb3c6IDAgIWltcG9ydGFudDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIDo6bmctZGVlcCB7XHJcbiAgICBzcGFuIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIC8vIHBhZGRpbmc6IDBweCFpbXBvcnRhbnQ7XHJcbiAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIGZvbnQtc2l6ZTogMzBweCAhaW1wb3J0YW50O1xyXG4gICAgICBmbGV4OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgOjpuZy1kZWVwIHtcclxuICAgIHN2ZyB7XHJcbiAgICAgIHBvc2l0aW9uOiBpbml0aWFsICFpbXBvcnRhbnQ7XHJcbiAgICAgIHJpZ2h0OiA2cHggIWltcG9ydGFudDtcclxuICAgICAgbGVmdDogOHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIG1hcmdpbi10b3A6IDVweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4uYnV0dG9uYWRqdXN0IHtcclxuICBtYXJnaW4tbGVmdDogMjRweCAhaW1wb3J0YW50O1xyXG59XHJcbi5leHBpcmF0aW9ud2hpdGVsaW5lIHtcclxuICBoZWlnaHQ6IDFweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICBnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICBtYXJnaW4tbGVmdDogMTZweDtcclxuICBtYXJnaW4tdG9wOiAyNXB4O1xyXG59XHJcbi5leHB3aGl0ZWxpbmUge1xyXG4gIGhlaWdodDogMXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gIGdseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWw6IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gIG1hcmdpbi10b3A6IDEzNXB4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: GuidedinvmgmtManualcyclecountPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedinvmgmtManualcyclecountPageComponent", function() { return GuidedinvmgmtManualcyclecountPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _api_core_data_contracts_guided_manual_cycle_count_itemid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api-core/data-contracts/guided-manual-cycle-count-itemid */ "./src/app/api-core/data-contracts/guided-manual-cycle-count-itemid.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _api_core_services_guided_manual_cycle_count_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../api-core/services/guided-manual-cycle-count-service.service */ "./src/app/api-core/services/guided-manual-cycle-count-service.service.ts");
/* harmony import */ var _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/enums/device-location-access-result */ "./src/app/shared/enums/device-location-access-result.ts");
/* harmony import */ var _shared_services_devices_carousel_location_access_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/services/devices/carousel-location-access.service */ "./src/app/shared/services/devices/carousel-location-access.service.ts");
/* harmony import */ var _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../api-core/services/core-event-connection.service */ "./src/app/api-core/services/core-event-connection.service.ts");
/* harmony import */ var _shared_constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/constants/device-location-type-id */ "./src/app/shared/constants/device-location-type-id.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _shared_components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/components/spinner-popup/spinner-popup.component */ "./src/app/shared/components/spinner-popup/spinner-popup.component.ts");
/* harmony import */ var _api_core_data_contracts_guided_cycle_count_update__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../api-core/data-contracts/guided-cycle-count-update */ "./src/app/api-core/data-contracts/guided-cycle-count-update.ts");
/* harmony import */ var _model_SingleselectRowItem__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../model/SingleselectRowItem */ "./src/app/core/model/SingleselectRowItem.ts");


















let GuidedinvmgmtManualcyclecountPageComponent = class GuidedinvmgmtManualcyclecountPageComponent {
    constructor(activatedRoute, guidedManualCycleCountServiceService, carouselLocationAccessService, coreEventConnectionService, dialogService, translateService, wpfActionController) {
        this.activatedRoute = activatedRoute;
        this.guidedManualCycleCountServiceService = guidedManualCycleCountServiceService;
        this.carouselLocationAccessService = carouselLocationAccessService;
        this.coreEventConnectionService = coreEventConnectionService;
        this.dialogService = dialogService;
        this.translateService = translateService;
        this.wpfActionController = wpfActionController;
        this.carouselFaulted = false;
        this.numericindexes = ["", 1, ""];
        this.datepickerindexes = [2, 3, 4, ""];
        this.time = new Date();
        this.searchKey = "";
        this.startCounter = 0;
        this.fetchCount = 100;
        this.searchRequestorText = "";
        this.placeHolderText = "";
        this.columnTemplate = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["SearchDropDownColumnTemplate"];
        this.noResultsFoundText = "";
        this.gridHeight = "";
        this.gridWidth = "";
        this.searchBoxAlign = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["SearchBoxAlign"];
        this.timeIntervalId = setInterval(() => {
            this.time = new Date();
        }, 1);
        this.daterequired = false;
        this.disablethedate = false;
        this.numericfocus = false;
        this.todaydate =
            this.time.getMonth() +
                "/" +
                this.time.getDate() +
                "/" +
                this.time.getFullYear();
        this.leaseBusyTitle$ = translateService.get("LEASE_BUSY_TITLE");
        this.leaseBusyMessage$ = translateService.get("LEASE_BUSY_MESSAGE");
        this._leaseDeniedTitle$ = translateService.get("DEVICE_ACCESS");
    }
    ngOnInit() {
        let deviceId = this.activatedRoute.snapshot.queryParamMap.get("deviceId");
        this.coreEventConnectionService.carouselReadySubject
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])((x) => x.DeviceId.toString() == deviceId))
            .subscribe((x) => (this.carouselFaulted = false));
        this.coreEventConnectionService.carouselFaultedSubject
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])((x) => x.DeviceId.toString() == deviceId))
            .subscribe((x) => (this.carouselFaulted = true));
        this.noResultsFoundText = "No results found";
        this.placeHolderText = "localized search text";
        this.gridHeight = "500px";
        this.gridWidth = "800px";
        this.columnsConfig = [
            {
                displayText: "",
                displayField: "",
            },
            {
                displayText: "Item ID",
                displayField: "ID",
            },
            {
                displayText: "Item Description",
                displayField: "GenericNameFormatted",
            },
        ];
        this.guidedManualCycleCountServiceService.getSearchItems("");
        this.cycleCountItemsCopy = [];
        this.doneButtonDisable = true;
    }
    ngAfterViewChecked() {
        this.toggleredborderforfirstitem();
    }
    ngOnDestroy() {
        if (this.timeIntervalId) {
            clearInterval(this.timeIntervalId);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }
    // Output from the Dropdown Search Item Click
    itemSelected(item) {
        this.selectedItem = JSON.stringify(item);
        this.isSingleSelectEnable = false;
        this.getCycleCountData(item.item.ID);
    }
    getSearchData(searchKey) {
        if (this.displayCycleCountItem != undefined) {
            this.displayCycleCountItem = null;
        }
        // Make api call to get data as an observable
        return this.guidedManualCycleCountServiceService.getSearchItems(searchKey);
        //return this.searchData ;
    }
    ngAfterViewInit() {
        this.userSearchDropdownElement.searchDropdownTextOutput$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])((searchData) => {
            if (searchData.reset) {
                this.endCounter = this.fetchCount;
            }
            return this.getSearchData(searchData.searchKey);
        }))
            .subscribe((data) => {
            this.searchData = data.slice(this.startCounter, this.endCounter);
            this.endCounter = this.endCounter + this.fetchCount;
            let loadMore = true;
            if (this.endCounter >= data.length) {
                // By setting this value to False,
                // search dropdown component will not make a call back on Scroll
                loadMore = false;
            }
            const searchDataResult = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["SearchDropdownInputData"](this.searchData, loadMore);
            this.userSearchDropdownElement.searchDropdownService.pushData(searchDataResult);
        });
    }
    itemLength() {
        this.displayCycleCountItem.QuantityOnHand = 0;
        this.isSingleSelectEnable = true;
        this.isMultiLocation = true;
        this.DisableActionButtons(true);
        this.multiLocations = [];
    }
    multipleLocations(x) {
        for (let i = 0; i < x.length; i++) {
            this.locationCount++;
            let location = new _model_SingleselectRowItem__WEBPACK_IMPORTED_MODULE_16__["SingleselectRowItem"]();
            location.text = x[i].LocationDescription + " " + x[i].PackageFormName;
            location.value = x[i].LocationDescription;
            location.Visible = true;
            this.multiLocations && this.multiLocations.push(location && location);
        }
    }
    getCycleCountData(itemid) {
        this.cycleCountItems = this.guidedManualCycleCountServiceService
            .get(itemid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])((guidedCycleCountItems) => {
            return guidedCycleCountItems.map((p) => new _api_core_data_contracts_guided_manual_cycle_count_itemid__WEBPACK_IMPORTED_MODULE_6__["GuidedManualCycleCountItemid"](p));
        }));
        this.sub = this.cycleCountItems.subscribe((x) => {
            if (x.length > 0 && x[0].ExpirationDate) {
                this.displayCycleCountItem = x[0];
                let date = new Date(x[0].ExpirationDate);
                this.displayCycleCountItem.InStockQuantity = x[0].QuantityOnHand;
                this.locationCount = 0;
                if (x.length > 1) {
                    this.itemLength();
                    this.multipleLocations(x);
                }
                else {
                    this.isSingleSelectEnable = false;
                    this.displayCycleCountItem.ExpirationDateFormatted =
                        date.getFullYear() == 1
                            ? ""
                            : (date.getMonth() > 8
                                ? date.getMonth() + 1
                                : "0" + (date.getMonth() + 1)) +
                                "/" +
                                (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
                                "/" +
                                (date.getFullYear() == 1 ? 1900 : date.getFullYear());
                    this.CycleCountValidation();
                }
            }
            else {
                this.displayUnknownItemDialog(itemid);
            }
        }, () => {
            this.toggleredborderforfirstitem();
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["Util"].setByTabIndex(this.numericindexes[1]);
        }, () => {
            this.toggleredborderforfirstitem();
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["Util"].setByTabIndex(this.numericindexes[1]);
        });
    }
    CycleCountValidation() {
        this.isMultiLocation = false;
        this.toggleredborderfornonfirstitem(true);
        this.DisableActionButtons(false);
        this.displayCycleCountItem.ItemDateFormat = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["DateFormat"].mmddyyyy_withslashes;
        if (this.displayCycleCountItem.ExpirationDateFormatted === "" &&
            this.displayCycleCountItem.QuantityOnHand !== 0)
            this.DisableActionButtons(false);
        if (this.displayCycleCountItem.ItmExpDateGranularity != "None") {
            if (this.displayCycleCountItem.ExpirationDateFormatted === "" &&
                this.displayCycleCountItem.QuantityOnHand !== 0)
                this.DisableActionButtons(true);
        }
    }
    DisableActionButtons(value) {
        this.doneButtonDisable = value;
    }
    toggleredborderfornonfirstitem(nextrecordonly) {
        let element = document.getElementById("datepicker");
        if (element) {
            if (!nextrecordonly) {
                if (element.classList.contains("ng-touched") ||
                    element.classList.contains("ng-untouched")) {
                    element.classList.contains("ng-valid")
                        ? element.classList.remove("ng-valid")
                        : null;
                    element.classList.contains("ng-invalid")
                        ? null
                        : element.classList.add("ng-invalid");
                }
            }
            else {
                element.classList.contains("ng-invalid")
                    ? element.classList.remove("ng-invalid")
                    : null;
                element.classList.contains("ng-dirty")
                    ? element.classList.remove("ng-dirty")
                    : null;
                element.classList.contains("ng-pristine")
                    ? element.classList.remove("ng-pristine")
                    : null;
            }
        }
    }
    disabledatecomponent(value) {
        this.disablethedate = value;
    }
    isdateexpired(input) {
        let todayDate = new Date();
        let todayDateText = todayDate.getMonth() +
            1 +
            "/" +
            todayDate.getDate() +
            "/" +
            todayDate.getFullYear();
        let inputToDate = Date.parse(input);
        let todayToDate = Date.parse(todayDateText);
        return inputToDate < todayToDate;
    }
    toggleredborderforfirstitem() {
        if (this.displayCycleCountItem &&
            this.displayCycleCountItem.QuantityOnHand === 0) {
            this.disabledatecomponent(true);
            this.toggleredborderfornonfirstitem(true);
        }
        else if (this.isdateexpired(this.displayCycleCountItem &&
            this.displayCycleCountItem.ExpirationDateFormatted) ||
            (this.displayCycleCountItem &&
                this.displayCycleCountItem.ExpirationDateFormatted === "")) {
            if (!(this.datepicker && this.datepicker.isDisabled))
                this.toggleredborderfornonfirstitem(false);
        }
    }
    FormatExpireDate(date) {
        if (date) {
            var date = new Date(date);
            return ((date.getMonth() > 8
                ? date.getMonth() + 1
                : "0" + (date.getMonth() + 1)) +
                "/" +
                (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
                "/" +
                (date.getFullYear() == 1 ? 1900 : date.getFullYear()));
        }
    }
    CheckItemExpGranularity() {
        return this.displayCycleCountItem &&
            this.displayCycleCountItem.ItmExpDateGranularity != "None"
            ? false
            : true;
    }
    onQuantityChange($event) {
        if ($event == "0") {
            this.daterequired = false;
            this.disabledatecomponent(true);
            this.toggleredborderfornonfirstitem(true);
            if (!this.isMultiLocation)
                this.DisableActionButtons(false);
        }
        else {
            this.disabledatecomponent(false);
            let eventdate = new Date(this.datepicker && this.datepicker.selectedDate);
            if (this.datepicker &&
                (this.datepicker.selectedDate === null ||
                    this.datepicker.selectedDate === "//" ||
                    this.datepicker.selectedDate === "")) {
                this.DisableActionButtons(true);
                this.toggleredborderfornonfirstitem(false);
            }
            else if (this.isdateexpired(this.datepicker && this.datepicker.selectedDate)) {
                this.toggleredborderfornonfirstitem(false);
            }
            else if (isNaN(eventdate.getTime()) &&
                this.displayCycleCountItem.ItmExpDateGranularity !== "None") {
                this.DisableActionButtons(true);
                this.toggleredborderfornonfirstitem(false);
            }
        }
    }
    onDateChange($event) {
        if ($event === "" || $event === null) {
            this.daterequired = true;
        }
        else {
            let dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
            if ($event.match(dateReg)) {
                let eventdate = new Date($event);
                if (this.isdateexpired($event)) {
                    this.daterequired = true;
                    this.toggleredborderfornonfirstitem(false);
                    this.DisableActionButtons(false);
                }
                else if (isNaN(eventdate.getTime())) {
                    this.DisableActionButtons(true);
                }
                else {
                    this.daterequired = false;
                    this.DisableActionButtons(false);
                    this.toggleredborderfornonfirstitem(true);
                }
            }
            else {
                this.daterequired = true;
                this.DisableActionButtons(true);
            }
        }
    }
    navigateContinue() {
        if (this.displayCycleCountItem != null) {
            let expireddate = null, actualexpiradationdate = null;
            expireddate = new Date(this.displayCycleCountItem.ExpirationDateFormatted);
            if (this.displayCycleCountItem.ItmExpDateGranularity === "Month") {
                actualexpiradationdate =
                    this.displayCycleCountItem.QuantityOnHand !== 0
                        ? new Date(expireddate.getFullYear(), expireddate.getMonth() + 1, 0)
                        : null;
            }
            else {
                actualexpiradationdate =
                    this.displayCycleCountItem.QuantityOnHand !== 0
                        ? new Date(expireddate)
                        : null;
            }
            let update = new _api_core_data_contracts_guided_cycle_count_update__WEBPACK_IMPORTED_MODULE_15__["deviceCycleCountItemUpdate"]({
                DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
                ItemId: this.displayCycleCountItem.ItemId,
                ExpirationDate: actualexpiradationdate,
                QuantityOnHand: this.displayCycleCountItem.QuantityOnHand,
            });
            let deviceId = this.activatedRoute.snapshot.queryParamMap.get("deviceId");
            this.guidedManualCycleCountServiceService
                .post(deviceId, update)
                .subscribe((res) => {
                console.log(res);
            });
        }
        this.wpfActionController.ExecuteBackAction();
    }
    navigateBack() {
        if (this.displayCycleCountItem != undefined) {
            if (this.displayCycleCountItem.DeviceLocationTypeId ===
                _shared_constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_12__["DeviceLocationTypeId"].Carousel) {
                this.carouselLocationAccessService
                    .clearLightbar(this.displayCycleCountItem.DeviceId)
                    .subscribe();
            }
        }
        this.wpfActionController.ExecuteBackAction();
    }
    navigateSamePage() {
        if (this.displayCycleCountItem != undefined) {
            if (this.displayCycleCountItem.DeviceLocationTypeId ===
                _shared_constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_12__["DeviceLocationTypeId"].Carousel) {
                this.carouselLocationAccessService
                    .clearLightbar(this.displayCycleCountItem.DeviceId)
                    .subscribe();
            }
        }
        if (this.displayCycleCountItem != undefined) {
            this.displayCycleCountItem = null;
        }
        this.DisableActionButtons(true);
    }
    handleDeviceLocationAccessResult(deviceLocaitonAccessResult) {
        if (deviceLocaitonAccessResult == _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_9__["DeviceLocationAccessResult"].LeaseNotAvailable) {
            let leaseDeniedMessage$ = this.translateService.get("LEASE_DENIED_MESSAGE", { deviceDescription: this.displayCycleCountItem.DeviceDescription });
            Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["forkJoin"])(this._leaseDeniedTitle$, leaseDeniedMessage$).subscribe((r) => {
                let leaseDeniedPopup = this.displayError("Lease-Denied", r[0], r[1]);
                Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(leaseDeniedPopup.didClickCloseButton, leaseDeniedPopup.didClickPrimaryButton).subscribe(() => this.navigateSamePage());
            });
        }
        if (deviceLocaitonAccessResult == _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_9__["DeviceLocationAccessResult"].LeaseNotRequested) {
            this.navigateSamePage();
        }
        if (deviceLocaitonAccessResult == _shared_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_9__["DeviceLocationAccessResult"].Failed) {
            this.carouselFaulted = true;
        }
        else {
            this.carouselFaulted = false;
        }
    }
    handleLeaseBusyChanged(isBusy) {
        if (isBusy) {
            this.leaseBusyPopup$ = this.leaseBusyTitle$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])((x) => this.showLeaseDialog(x)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["shareReplay"])(1));
            this.leaseBusyPopup$.subscribe();
        }
        else {
            this.leaseBusyPopup$.subscribe((x) => x.onCloseClicked());
        }
    }
    showLeaseDialog(title) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogProperties"]("Lease-Busy");
        properties.titleElementText = title;
        properties.showPrimaryButton = false;
        properties.showSecondaryButton = false;
        properties.showCloseIcon = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogType"].Info;
        properties.timeoutLength = 0;
        properties.component = _shared_components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_14__["SpinnerPopupComponent"];
        return this.dialogService.showOnce(properties);
    }
    displayError(uniqueId, title, message) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogProperties"](uniqueId);
        properties.titleElementText = title;
        properties.messageElementText = message;
        properties.showPrimaryButton = true;
        properties.primaryButtonText = "Ok";
        properties.showSecondaryButton = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogType"].Error;
        properties.timeoutLength = 0;
        return this.dialogService.showOnce(properties);
    }
    multipleLocationItem(x, eventData) {
        for (let i = 0; i < x.length; i++) {
            if (x[i].LocationDescription === eventData) {
                this.disablethedate = false;
                this.displayCycleCountItem = x[i];
                let date = new Date(x[i].ExpirationDate);
                this.displayCycleCountItem.InStockQuantity = x[i].QuantityOnHand;
                this.displayCycleCountItem.ExpirationDateFormatted =
                    date.getFullYear() == 1
                        ? ""
                        : (date.getMonth() > 8
                            ? date.getMonth() + 1
                            : "0" + (date.getMonth() + 1)) +
                            "/" +
                            (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
                            "/" +
                            (date.getFullYear() == 1 ? 1900 : date.getFullYear());
                this.CycleCountValidation();
            }
        }
    }
    onSelectionChanged($event) {
        if ($event != "" && $event != null) {
            let eventData = $event.value;
            if (this.cycleCountItems != undefined) {
                this.displayCycleCountItem.ExpirationDateFormatted = "";
                this.sub1 = this.cycleCountItems.subscribe((x) => {
                    if (x.length > 0) {
                        this.multipleLocationItem(x, eventData);
                    }
                }, () => {
                    this.toggleredborderforfirstitem();
                    _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["Util"].setByTabIndex(this.numericindexes[1]);
                }, () => {
                    this.toggleredborderforfirstitem();
                    _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["Util"].setByTabIndex(this.numericindexes[1]);
                });
            }
        }
    }
    displayUnknownItemDialog(itemId) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogProperties"]("Role-Status-Warning");
        this.translateService.get("UNKNOWNITEM_HEADER_TEXT").subscribe((result) => {
            properties.titleElementText = result;
        });
        this.translateService.get('UNKNOWNITEM_BODY_TEXT', { itemId: itemId }).subscribe((result) => {
            properties.messageElementText = result;
        });
        properties.showPrimaryButton = true;
        properties.showSecondaryButton = false;
        properties.primaryButtonText = "OK";
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogType"].Error;
        properties.timeoutLength = 60;
        this.dialogService.showOnce(properties);
    }
};
GuidedinvmgmtManualcyclecountPageComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _api_core_services_guided_manual_cycle_count_service_service__WEBPACK_IMPORTED_MODULE_8__["GuidedManualCycleCountServiceService"] },
    { type: _shared_services_devices_carousel_location_access_service__WEBPACK_IMPORTED_MODULE_10__["CarouselLocationAccessService"] },
    { type: _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_11__["CoreEventConnectionService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["PopupDialogService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_2__["WpfActionControllerService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["NumericComponent"], null)
], GuidedinvmgmtManualcyclecountPageComponent.prototype, "numericElement", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["DatepickerComponent"], null)
], GuidedinvmgmtManualcyclecountPageComponent.prototype, "datepicker", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["ButtonActionComponent"], null)
], GuidedinvmgmtManualcyclecountPageComponent.prototype, "cancelbutton", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_5__["ButtonActionComponent"], null)
], GuidedinvmgmtManualcyclecountPageComponent.prototype, "donebutton", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("dropdownSearchUser", { static: true })
], GuidedinvmgmtManualcyclecountPageComponent.prototype, "userSearchDropdownElement", void 0);
GuidedinvmgmtManualcyclecountPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-guidedinvmgmt-manualcyclecount-page",
        template: __webpack_require__(/*! raw-loader!./guidedinvmgmt-manualcyclecount-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.html"),
        styles: [__webpack_require__(/*! ./guidedinvmgmt-manualcyclecount-page.component.scss */ "./src/app/core/guidedinvmgmt-manualcyclecount-page/guidedinvmgmt-manualcyclecount-page.component.scss")]
    })
], GuidedinvmgmtManualcyclecountPageComponent);



/***/ }),

/***/ "./src/app/core/hardware-lease-page/hardware-lease-page.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/core/hardware-lease-page/hardware-lease-page.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\n:host {\n  height: 100%;\n  width: 100%;\n  flex-direction: column;\n}\n\n.dateTime {\n  font-size: 14px;\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\n  color: white;\n  position: relative;\n  margin-top: 20px;\n  margin-right: 375px;\n}\n\n.description {\n  font-size: 18px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  padding-left: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2hhcmR3YXJlLWxlYXNlLXBhZ2UvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvcHJvamVjdHNcXGNwbS1hcHBcXHNyY1xcYXBwXFxjb3JlXFxoYXJkd2FyZS1sZWFzZS1wYWdlXFxoYXJkd2FyZS1sZWFzZS1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvaGFyZHdhcmUtbGVhc2UtcGFnZS9oYXJkd2FyZS1sZWFzZS1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvaGFyZHdhcmUtbGVhc2UtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QkE7RUFDRSxhQUFBO0FDNUJGOztBRDhCQTtFQUNFLE9BQUE7QUMzQkY7O0FENkJBO0VBQ0Usc0JBQUE7QUMxQkY7O0FDVEE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0FEWUo7O0FDVEE7RUFDRSxlQUFBO0VBQ0EsNERBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNELG1CQUFBO0FEWUQ7O0FDVEE7RUFDRSxlQUFBO0VBQ0EsdUVBQUE7RUFDQSxrQkFBQTtBRFlGIiwiZmlsZSI6InByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2hhcmR3YXJlLWxlYXNlLXBhZ2UvaGFyZHdhcmUtbGVhc2UtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRib3JkZXItcmFkaXVzOiA0cHg7XHJcbiRib3JkZXItY29sb3I6ICNhMGEyYTg7XHJcbiRzbGF0ZS1ncmV5OiAjNUU2QTcxO1xyXG4kYnJhbmQtcHJpbWFyeTogIzY5QkUyODtcclxuJGJyYW5kLWxpZ2h0Ymx1ZTogIzk3QzBFNjtcclxuJGJyYW5kLW1lZGl1bWJsdWU6ICM2Njk5Q0M7XHJcbiRicmFuZC1zZWNvbmRhcnk6ICM2OWM7XHJcbiRicmFuZC1pbmZvOiAjMDA2Njk5O1xyXG4kYnJhbmQtd2FybmluZyA6ICNmMGFkNGU7XHJcbiRicmFuZC1kYW5nZXIgOiAjQzgwODE5O1xyXG4kbGlnaHQtZ3JleTogI2RkZDtcclxuJGRhcmstZ3JleTogIzk5OTtcclxuJGFjdGlvbi1ibHVlOiAjNjY5OWNjO1xyXG4kYmFkZ2UtaW5mbzogI0YzRjlGRjtcclxuJHNjcm9sbC1idXR0b24tY29sb3I6ICNhMGEyYTg7XHJcbiRzY3JvbGwtYmFyLWNvbG9yOiAjRURFREVFO1xyXG5cclxuJHRleHQtY29sb3I6ICMzMzM7XHJcbiRwbGFjZWhvbGRlci10ZXh0LWNvbG9yOiAjOTk5O1xyXG4kZm9udC1mYW1pbHktc2Fucy1zZXJpZjogXCJTZWdvZSBVSVwiLFwiSGVsdmV0aWNhIE5ldWVcIixcIkhlbHZldGljYVwiLFwiQXJpYWxcIixcInNhbnMtc2VyaWZcIiAhZGVmYXVsdDtcclxuJGZvbnQtc2l6ZS14eGxhcmdlOiAyNnB4O1xyXG4kZm9udC1zaXplLXhsYXJnZTogMjRweDtcclxuJGZvbnQtc2l6ZS1sYXJnZTogMjJweDtcclxuJGZvbnQtc2l6ZS1tZWRpdW06IDIwcHg7XHJcbiRmb250LXNpemUtYmFzZTogMThweDtcclxuJGZvbnQtc2l6ZS1zbWFsbDogMTZweDtcclxuJGZvbnQtc2l6ZS14c21hbGw6IDE0cHg7XHJcbiRmb250LXNpemUteHhzbWFsbDogMTJweDtcclxuJGVycm9yLW1lc3NhZ2U6ICNDNzA3MTk7XHJcbi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5mbGV4LTEge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuLmNvbHVtbiB7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG4kYm9sZDogNjAwO1xyXG4kc2VtaS1ib2xkOiA1MDA7XHJcbiRyZWd1bGFyOiA0MDA7XHJcblxyXG4kYnV0dG9uLWZvbnQtc2l6ZTogMjBweDtcclxuXHJcbi8vIHotaW5kZXhcclxuJHNlYXJjaGRyb3Bkb3duLXppbmRleDogOTk4O1xyXG4kaGVhZGVyLWluZGV4OiA5OTkgIWRlZmF1bHQ7IC8vIEZvciB0aGUgaGVhZGVyXHJcbiRwb3B1cHdpbmRvdy16aW5kZXg6IDEwMDAgIWRlZmF1bHQ7IC8vIEZvciB0aGUgcG9wdXB3aW5kb3dcclxuJGNhbGVuZGFyLXppbmRleDogMTAwMSAhZGVmYXVsdDtcclxuJHBvcHVwZGlhbG9nLXppbmRleDogMTAwMiAhZGVmYXVsdDsgLy8gRm9yIHRoZSBwb3B1cHdpbmRvd1xyXG4kdG9hc3QtemluZGV4OiAxMDAzICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJGhvdmVyLXppbmRleDogMTAwNCAhZGVmYXVsdDsgLy8gRm9yIHRoZSBob3ZlclxyXG4kYmFkZ2UtemluZGV4OiAxMDA1ICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJHByb2dyZXNzYmFyLXppbmRleDogMTAwNSAhZGVmYXVsdDtcclxuJGRpc2FibGVkLWlucHV0LWNvbG9yOiAjZjJmMmYyO1xyXG4kdmFsaWRhdGlvbi1lcnJvci1ib3JkZXItY29sb3I6IHJlZDtcclxuJHNpZGVwYW5lbC1idXR0b24temluZGV4OiA5OTkgIWRlZmF1bHQ7XHJcbiIsIi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmZsZXgtMSB7XG4gIGZsZXg6IDE7XG59XG5cbi5jb2x1bW4ge1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG46aG9zdCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5kYXRlVGltZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDM3NXB4O1xufVxuXG4uZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xufSIsIkBpbXBvcnQgXCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9tbmljZWxsL3dlYmNvcmVjb21wb25lbnRzL2xpYi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtcclxuOmhvc3R7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5kYXRlVGltZXtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xyXG4gIGNvbG9yOndoaXRlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gbWFyZ2luLXJpZ2h0OiAzNzVweDtcclxufVxyXG5cclxuLmRlc2NyaXB0aW9ue1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLFwiSGVsdmV0aWNhIE5ldWVcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcclxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/core/hardware-lease-page/hardware-lease-page.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/core/hardware-lease-page/hardware-lease-page.component.ts ***!
  \***************************************************************************/
/*! exports provided: HardwareLeasePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardwareLeasePageComponent", function() { return HardwareLeasePageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api-core/services/hardware-lease-service */ "./src/app/api-core/services/hardware-lease-service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _api_core_services_hardware_lease_event_connection_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../api-core/services/hardware-lease-event-connection.service */ "./src/app/api-core/services/hardware-lease-event-connection.service.ts");
/* harmony import */ var _shared_services_system_configuration_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/services/system-configuration.service */ "./src/app/shared/services/system-configuration.service.ts");
/* harmony import */ var _api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../api-core/data-contracts/device-operation-outcome */ "./src/app/api-core/data-contracts/device-operation-outcome.ts");











let HardwareLeasePageComponent = class HardwareLeasePageComponent {
    constructor(wpfActionController, activatedRoute, router, hardwareLeaseService, translateService, dialogService, hardwareLeaseEventConnectionService, systemConfigurationService) {
        this.wpfActionController = wpfActionController;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.hardwareLeaseService = hardwareLeaseService;
        this.translateService = translateService;
        this.dialogService = dialogService;
        this.hardwareLeaseEventConnectionService = hardwareLeaseEventConnectionService;
        this.systemConfigurationService = systemConfigurationService;
        this.devicePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('DeviceDescription');
        this.deviceOwnerPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('DefaultOwnerShortname');
        this.displayDeviceConfigurationList = [];
        this.time = new Date();
        this.spinIcon = 'clear';
        this.disabledButtons = true;
        this.hwTimeout = 10000;
        this.popupTimeoutSeconds = 10;
        this.failureOutcome = [_api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__["DeviceOperationOutcome"].DeviceOperationOutcome_DeviceInactive,
            _api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__["DeviceOperationOutcome"].DeviceOperationOutcome_DeviceNotLeasedToClient,
            _api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__["DeviceOperationOutcome"].DeviceOperationOutcome_DeviceOfflineOrNotFound,
            _api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__["DeviceOperationOutcome"].DeviceOperationOutcome_ItemsAssignedToDevice,
            _api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__["DeviceOperationOutcome"].DeviceOperationOutcome_PendingLeaseRequestExistsForDevice];
        this.translateService.get('HardwareLease_Page_Description').subscribe(result => { this.pageDescription$ = result; });
        this.connectToEvents();
        setInterval(() => {
            this.time = new Date();
        }, 1);
    }
    ngOnInit() {
        this.deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
        this.routeToPath = this.activatedRoute.snapshot.queryParamMap.get('routeToPath');
        this.hardwareLeaseService.getDeviceConfiguration(this.deviceId).subscribe(res => {
            console.log(res);
            this.displayDeviceConfigurationList.push(res);
            this.disabledButtons = false;
        });
        this.systemConfigurationService.GetConfigurationValues('HARDWARE', 'LEASE_REQUEST_TIMEOUT').subscribe(result => {
            console.log('hw timeout : ' + result);
            console.log(result);
            this.hwTimeout = (Number(result.Value) * 1000) + 2000;
        });
        this.systemConfigurationService.GetConfigurationValues('TIMEOUTS', 'POP_UP_MESSAGE_TIMEOUT').subscribe(result => {
            console.log('popup message timeout : ' + result);
            console.log(result);
            this.popupTimeoutSeconds = (Number(result.Value));
        });
    }
    ngOnDestroy() {
    }
    navigateBack() {
        this.wpfActionController.ExecuteBackAction();
    }
    requestAccessClick() {
        this.disabledButtons = true;
        this.spinIcon = 'spin';
        this.hardwareLeaseService.RequestDeviceLease(this.deviceId).subscribe(results => {
            console.log(results);
            if (results.IsSuccessful === false || this.failureOutcome.includes(results.Outcome)) {
                this.resetPageAfterResults();
                clearTimeout(this.timeoutPending);
                this.displayRequestLeaseDialog(_api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__["DeviceOperationOutcome"][results.Outcome]);
            }
            else if (results.Outcome === _api_core_data_contracts_device_operation_outcome__WEBPACK_IMPORTED_MODULE_10__["DeviceOperationOutcome"].DeviceOperationOutcome_DeviceLeaseNotRequired) {
                this.navigateNext();
            }
        });
        this.SetupRequestDeviceLeaseTimeout();
    }
    SetupRequestDeviceLeaseTimeout() {
        this.timeoutPending = setTimeout(() => {
            this.displayRequestLeaseDialog('HardwareLease_RequestTimeout');
            this.resetPageAfterResults();
        }, Number(this.hwTimeout));
    }
    resetPageAfterResults() {
        this.spinIcon = 'clear';
        this.disabledButtons = false;
    }
    navigateNext() {
        const navigationExtras = {
            queryParams: { deviceId: this.deviceId },
            fragment: 'anchor'
        };
        this.router.navigate([this.routeToPath], navigationExtras);
    }
    displayRequestLeaseDialog(outcomeText) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogProperties"]('Request-Device-Lease');
        this.translateService.get('DeviceConfiguration_MessageBoxTitle').subscribe(result => { properties.titleElementText = result; });
        this.translateService.get(outcomeText).subscribe(result => { properties.messageElementText = result; });
        properties.showPrimaryButton = true;
        properties.showSecondaryButton = false;
        properties.primaryButtonText = 'OK';
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogType"].Error;
        properties.timeoutLength = this.popupTimeoutSeconds;
        this.dialogService.showOnce(properties);
    }
    connectToEvents() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.configureEventHandlers();
        });
    }
    configureEventHandlers() {
        if (!this.hardwareLeaseEventConnectionService) {
            return;
        }
        this.hardwareLeaseEventConnectionService.hardwareLeaseGrantedSubject
            .subscribe(message => {
            clearTimeout(this.timeoutPending);
            console.log('Received Granted Event');
            console.log(message);
            this.navigateNext();
        });
        this.hardwareLeaseEventConnectionService.hardwareLeaseDeniedSubject
            .subscribe(message => {
            clearTimeout(this.timeoutPending);
            this.resetPageAfterResults();
            console.log('Received Denied Event');
            console.log(message);
            this.displayRequestLeaseDialog('HardwareLease_Access_Denied');
        });
    }
};
HardwareLeasePageComponent.ctorParameters = () => [
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_2__["WpfActionControllerService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_5__["HardwareLeaseService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogService"] },
    { type: _api_core_services_hardware_lease_event_connection_service__WEBPACK_IMPORTED_MODULE_8__["HardwareLeaseEventConnectionService"] },
    { type: _shared_services_system_configuration_service__WEBPACK_IMPORTED_MODULE_9__["SystemConfigurationService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], HardwareLeasePageComponent.prototype, "devicePropertyName", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], HardwareLeasePageComponent.prototype, "deviceOwnerPropertyName", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], HardwareLeasePageComponent.prototype, "displayDeviceConfigurationList", void 0);
HardwareLeasePageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-hardware-lease-page',
        template: __webpack_require__(/*! raw-loader!./hardware-lease-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/hardware-lease-page/hardware-lease-page.component.html"),
        styles: [__webpack_require__(/*! ./hardware-lease-page.component.scss */ "./src/app/core/hardware-lease-page/hardware-lease-page.component.scss")]
    })
], HardwareLeasePageComponent);



/***/ }),

/***/ "./src/app/core/item-management/item-management.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/core/item-management/item-management.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "oc-grid {\n  height: 90%;\n}\n\n:host {\n  height: 100%;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n\n.umFont {\n  font-size: 16px;\n}\n\n.searchbox {\n  width: 400px;\n  align-self: right;\n}\n\n.badge {\n  position: relative;\n  bottom: 10px;\n  right: -100px;\n}\n\n.cpmwarningtext {\n  font-size: 14px;\n  color: maroon;\n}\n\n.downarrow {\n  transform: rotate(45deg);\n  background-color: pink;\n}\n\n.uparrow {\n  transform: rotate(0deg);\n}\n\n.headertext {\n  float: left;\n}\n\n.headericon {\n  position: relative;\n  left: 15px;\n  top: 3px;\n  float: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2l0ZW0tbWFuYWdlbWVudC9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9wcm9qZWN0c1xcY3BtLWFwcFxcc3JjXFxhcHBcXGNvcmVcXGl0ZW0tbWFuYWdlbWVudFxcaXRlbS1tYW5hZ2VtZW50LmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvaXRlbS1tYW5hZ2VtZW50L2l0ZW0tbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGFBQUE7QUNDRjs7QURFQTtFQUNFLHdCQUFBO0VBQ0Esc0JBQUE7QUNDRjs7QURFQTtFQUNFLHVCQUFBO0FDQ0Y7O0FERUE7RUFDRSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtBQ0NGIiwiZmlsZSI6InByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL2l0ZW0tbWFuYWdlbWVudC9pdGVtLW1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJvYy1ncmlke1xyXG4gIGhlaWdodDogOTAlO1xyXG59XHJcblxyXG46aG9zdHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbjpob3N0IDo6bmctZGVlcCBvYy1ncmlke1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxufVxyXG5cclxuLnVtRm9udCB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4uc2VhcmNoYm94e1xyXG4gIHdpZHRoOiA0MDBweDtcclxuICBhbGlnbi1zZWxmOiByaWdodDtcclxufVxyXG5cclxuLmJhZGdlIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYm90dG9tOiAxMHB4O1xyXG4gIHJpZ2h0OiAtMTAwcHg7XHJcbn1cclxuXHJcbi5jcG13YXJuaW5ndGV4dHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6IG1hcm9vbjtcclxufVxyXG5cclxuLmRvd25hcnJvd3tcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcclxufVxyXG5cclxuLnVwYXJyb3d7XHJcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XHJcbn1cclxuXHJcbi5oZWFkZXJ0ZXh0e1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4uaGVhZGVyaWNvbntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMTVweDtcclxuICB0b3A6IDNweDtcclxuICBmbG9hdDogbGVmdDtcclxufVxyXG4iLCJvYy1ncmlkIHtcbiAgaGVpZ2h0OiA5MCU7XG59XG5cbjpob3N0IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgb2MtZ3JpZCB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cblxuLnVtRm9udCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLnNlYXJjaGJveCB7XG4gIHdpZHRoOiA0MDBweDtcbiAgYWxpZ24tc2VsZjogcmlnaHQ7XG59XG5cbi5iYWRnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm90dG9tOiAxMHB4O1xuICByaWdodDogLTEwMHB4O1xufVxuXG4uY3Btd2FybmluZ3RleHQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiBtYXJvb247XG59XG5cbi5kb3duYXJyb3cge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHBpbms7XG59XG5cbi51cGFycm93IHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG59XG5cbi5oZWFkZXJ0ZXh0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5oZWFkZXJpY29uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAxNXB4O1xuICB0b3A6IDNweDtcbiAgZmxvYXQ6IGxlZnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/core/item-management/item-management.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/core/item-management/item-management.component.ts ***!
  \*******************************************************************/
/*! exports provided: ItemManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemManagementComponent", function() { return ItemManagementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _model_item_management__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/item-management */ "./src/app/core/model/item-management.ts");
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/window-service */ "./src/app/shared/services/window-service.ts");
/* harmony import */ var _api_core_services_item_management_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api-core/services/item-management.service */ "./src/app/api-core/services/item-management.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constants/sort-direction */ "./src/app/shared/constants/sort-direction.ts");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");











let ItemManagementComponent = class ItemManagementComponent {
    constructor(windowService, itemManagementService, wpfActionControllerService) {
        this.windowService = windowService;
        this.itemManagementService = itemManagementService;
        this.wpfActionControllerService = wpfActionControllerService;
        this.itemIdPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('ItemId');
        this.itemDescriptionPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('ItemDescription');
        this.unitDoseQtyOnHandPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('UnitDoseQtyOnHand');
        this.bulkQtyOnHandPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('BulkQtyOnHand');
        this.totalQtyOnHandPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('TotalQtyOnHand');
        this.currentSortPropertyName = this.itemDescriptionPropertyName;
        this.searchFields = [this.itemDescriptionPropertyName, this.itemIdPropertyName];
    }
    ngOnInit() {
        this.ItemManagements$ = this.itemManagementService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(x => {
            return this.sort(x.map(p => new _model_item_management__WEBPACK_IMPORTED_MODULE_2__["ItemManagement"](p)), _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_9__["SortDirection"].ascending);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["shareReplay"])(1));
    }
    ngAfterViewInit() {
        this.searchElement.searchOutput$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])((searchData) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(searchData);
        }))
            .subscribe(data => {
            this.searchTextFilter = data;
        });
        if (this.windowService.nativeWindow) {
            this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
    }
    navigate(itemId) {
        this.wpfActionControllerService.ExecuteContinueNavigationWithDataAction({ ItemId: itemId });
    }
    columnSelected(event) {
        this.currentSortPropertyName = event.ColumnPropertyName;
        this.ItemManagements$ = this.ItemManagements$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(itemManagements => {
            return this.sort(itemManagements, event.SortDirection);
        }));
    }
    sort(itemManagements, sortDirection) {
        return lodash__WEBPACK_IMPORTED_MODULE_8__["orderBy"](itemManagements, x => x[this.currentSortPropertyName], sortDirection);
    }
};
ItemManagementComponent.ctorParameters = () => [
    { type: _shared_services_window_service__WEBPACK_IMPORTED_MODULE_4__["WindowService"] },
    { type: _api_core_services_item_management_service__WEBPACK_IMPORTED_MODULE_5__["ItemManagementService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_10__["WpfActionControllerService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBox', null)
], ItemManagementComponent.prototype, "searchElement", void 0);
ItemManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-item-management',
        template: __webpack_require__(/*! raw-loader!./item-management.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/item-management/item-management.component.html"),
        styles: [__webpack_require__(/*! ./item-management.component.scss */ "./src/app/core/item-management/item-management.component.scss")]
    })
], ItemManagementComponent);



/***/ }),

/***/ "./src/app/core/model/SingleselectRowItem.ts":
/*!***************************************************!*\
  !*** ./src/app/core/model/SingleselectRowItem.ts ***!
  \***************************************************/
/*! exports provided: SingleselectRowItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleselectRowItem", function() { return SingleselectRowItem; });
class SingleselectRowItem {
}


/***/ }),

/***/ "./src/app/core/model/guided-cycle-count.ts":
/*!**************************************************!*\
  !*** ./src/app/core/model/guided-cycle-count.ts ***!
  \**************************************************/
/*! exports provided: GuidedCycleCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedCycleCount", function() { return GuidedCycleCount; });
class GuidedCycleCount {
    constructor(guidedCycleCount) {
        Object.assign(this, guidedCycleCount);
        this.DeviceLocationAccessQuantity = this.QuantityOnHand;
        this.DeviceLocationAccessUnits = this.Units;
        this.ItemTradeName = this.ItemTradeName;
        this.ItemGenericNameFormatted = this.GenericNameFormatted;
    }
}
GuidedCycleCount.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/core/model/guided-device-list.ts":
/*!**************************************************!*\
  !*** ./src/app/core/model/guided-device-list.ts ***!
  \**************************************************/
/*! exports provided: GuidedDeviceList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidedDeviceList", function() { return GuidedDeviceList; });
class GuidedDeviceList {
    constructor(guidedDeviceList) {
        Object.assign(this, guidedDeviceList);
        if (this.EarliestExpirationDateInDevice != null) {
            var now = new Date();
            var expired = new Date(this.EarliestExpirationDateInDevice);
            this.ContainsExpiredItem = expired.getTime() <= now.getTime();
        }
    }
}
GuidedDeviceList.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/core/model/item-management.ts":
/*!***********************************************!*\
  !*** ./src/app/core/model/item-management.ts ***!
  \***********************************************/
/*! exports provided: ItemManagement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemManagement", function() { return ItemManagement; });
class ItemManagement {
    constructor(itemManagement) {
        Object.assign(this, itemManagement);
    }
}
ItemManagement.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/core/model/underfilled-picklist-line.ts":
/*!*********************************************************!*\
  !*** ./src/app/core/model/underfilled-picklist-line.ts ***!
  \*********************************************************/
/*! exports provided: UnderfilledPicklistLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklistLine", function() { return UnderfilledPicklistLine; });
/* harmony import */ var _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/picklist-destination-description-helper */ "./src/app/core/utilities/picklist-destination-description-helper.ts");

class UnderfilledPicklistLine {
    constructor(data) {
        Object.assign(this, data);
        this.DisplayPatientRoomAndArea = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDestinationDescriptionHelper"].DisplayPatientRoomAndArea(1, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientRoom = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDestinationDescriptionHelper"].DisplayPatientRoom(1, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayArea = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDestinationDescriptionHelper"].DisplayArea(1, 1, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayOmniName = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDestinationDescriptionHelper"].DisplayOmniName(1, 1, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientNameSecondLine = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDestinationDescriptionHelper"].DisplayPatientNameSecondLine(1, this.PicklistTypeDb, this.PriorityCode);
    }
    get DestinationSortValue() {
        if (this.DestinationType == 'P') {
            return this.PatientName;
        }
        if (this.DestinationType == 'A') {
            return this.AreaDescription;
        }
        if (this.DestinationType == 'O') {
            return this.DestinationOmni;
        }
        return this.DestinationId;
    }
    get DescriptionSortValue() {
        if (this.ItemFormattedGenericName) {
            return this.ItemFormattedGenericName.toLowerCase();
        }
    }
}
UnderfilledPicklistLine.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/core/model/underfilled-picklist.ts":
/*!****************************************************!*\
  !*** ./src/app/core/model/underfilled-picklist.ts ***!
  \****************************************************/
/*! exports provided: UnderfilledPicklist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklist", function() { return UnderfilledPicklist; });
/* harmony import */ var _utilities_picklist_description_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/picklist-description-helper */ "./src/app/core/utilities/picklist-description-helper.ts");
/* harmony import */ var _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/picklist-destination-description-helper */ "./src/app/core/utilities/picklist-destination-description-helper.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");



class UnderfilledPicklist {
    constructor(underfilledPicklist, locale, translatedItems, translatedPatients, translatedCabinets) {
        Object.assign(this, underfilledPicklist);
        this.UnderfilledItemCountDisplay = `${this.UnderfilledItemCount} ${translatedItems}`;
        this.UnderfilledPatientCountDisplay = `${this.UnderfilledPatientCount} ${translatedPatients}`;
        this.UnderfilledDestinationCountDisplay = `${this.UnderfilledDestinationCount} ${translatedCabinets}`;
        this.DisplayGenericName = _utilities_picklist_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDescriptionHelper"].DisplayGenericName(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayItemCount = _utilities_picklist_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDescriptionHelper"].DisplayItemCount(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayBrandName = _utilities_picklist_description_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistDescriptionHelper"].DisplayBrandName(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayRouteName = !this.DisplayBrandName && !this.DisplayGenericName && !this.DisplayItemCount;
        this.DisplayPatientCount = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__["PicklistDestinationDescriptionHelper"].DisplayPatientCount(this.UnderfilledPatientCount, this.PicklistTypeDb);
        this.DisplayPatientRoomAndArea = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__["PicklistDestinationDescriptionHelper"].DisplayPatientRoomAndArea(this.UnderfilledPatientCount, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientRoom = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__["PicklistDestinationDescriptionHelper"].DisplayPatientRoom(this.UnderfilledPatientCount, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayArea = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__["PicklistDestinationDescriptionHelper"].DisplayArea(this.UnderfilledPatientCount, this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayMultiDestination = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__["PicklistDestinationDescriptionHelper"].DisplayMultiDestination(this.UnderfilledDestinationCount, this.PicklistTypeDb);
        this.DisplayPatientNameSecondLine = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__["PicklistDestinationDescriptionHelper"].DisplayPatientNameSecondLine(this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayOmniName = _utilities_picklist_destination_description_helper__WEBPACK_IMPORTED_MODULE_1__["PicklistDestinationDescriptionHelper"].DisplayOmniName(this.UnderfilledPatientCount, this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DescriptionSearchValue = this.getDescriptionSearchValue();
        this.DesintationSearchValue = this.getDestinationSearchValue();
        this.DateSearchValue = this.getDateSearchValue(locale);
    }
    getDateSearchValue(locale) {
        var searchValues = [];
        searchValues.push(Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(this.CompletedDate, 'shortDate', locale));
        searchValues.push(Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(this.CompletedDate, 'shortTime', locale));
        return searchValues.join(' ');
    }
    getDestinationSearchValue() {
        var searchValues = [];
        if (this.DisplayPatientCount) {
            searchValues.push(this.UnderfilledPatientCountDisplay);
        }
        if (this.DisplayPatientRoomAndArea) {
            searchValues.push(this.PatientRoom);
            searchValues.push(this.AreaDescription);
        }
        if (this.DisplayPatientRoom) {
            searchValues.push(this.PatientRoom);
        }
        if (this.DisplayArea) {
            searchValues.push(this.AreaDescription);
        }
        if (this.DisplayMultiDestination) {
            searchValues.push(this.UnderfilledDestinationCountDisplay);
        }
        if (this.DisplayOmniName) {
            searchValues.push(this.DestinationOmni);
        }
        if (this.DisplayPatientNameSecondLine) {
            searchValues.push(this.PatientName);
        }
        return searchValues.join(' ');
    }
    getDescriptionSearchValue() {
        var searchValues = [];
        if (this.DisplayGenericName) {
            searchValues.push(this.ItemFormattedGenericName);
        }
        if (this.DisplayGenericName) {
            searchValues.push(this.ItemBrandName);
        }
        if (this.DisplayItemCount) {
            searchValues.push(this.UnderfilledItemCountDisplay);
        }
        if (this.DisplayRouteName) {
            searchValues.push(this.RouteName);
        }
        return searchValues.join(' ');
    }
}
UnderfilledPicklist.ctorParameters = () => [
    { type: undefined },
    { type: String },
    { type: String },
    { type: String },
    { type: String }
];


/***/ }),

/***/ "./src/app/core/pick-route-select/pick-route-select.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/core/pick-route-select/pick-route-select.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\n::-webkit-input-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n:-moz-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n::-moz-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n:-ms-input-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextboxwrapper {\n  position: relative;\n  display: block;\n}\n\n.octextboxwrapper span {\n  position: absolute;\n  top: 7px;\n  left: 7px;\n}\n\n.octextboxwrapper .ocinput {\n  position: relative;\n  box-sizing: border-box;\n  margin: 0;\n  overflow: visible;\n  display: block;\n  line-height: 1.5;\n  background-clip: padding-box;\n  border: 1px solid #5E6A71;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #333;\n  border-radius: 4px;\n  background-color: #fff;\n  height: 50px;\n  font-size: 18px;\n  padding: 0.375rem 0.375rem 0.375rem 9px;\n  width: 100%;\n}\n\n.octextboxwrapper .ocinput.ocinputmask {\n  font-family: \"omniasterisk\";\n  font-style: normal;\n  font-weight: normal;\n}\n\n.octextboxwrapper .ocinput.hasIcon {\n  padding: 0.375rem 9px 0.375rem 50px;\n}\n\n.octextboxwrapper .ocinput:focus {\n  background-color: #fff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.octextboxwrapper .ocinput:hover {\n  box-shadow: none;\n}\n\n.octextboxwrapper .ocinput:focus {\n  border-color: #5E6A71 !important;\n  box-shadow: none;\n}\n\n.octextboxwrapper .ocinput:disabled {\n  background-color: #f2f2f2;\n}\n\n.octextboxwrapper .ocinput.ng-invalid {\n  border: 1px solid red;\n}\n\n.octextboxwrapper .ocinput span {\n  position: absolute;\n  display: inline-block;\n  top: 7px;\n  background-color: #fff;\n}\n\n.octextboxwrapper .logon {\n  width: 400px;\n  height: 60px;\n  font-size: 22px;\n}\n\n@media only screen and (min-width: 768px) and (max-width: 1024px) {\n  .octextboxwrapper .ocinput {\n    font-size: 16px;\n  }\n}\n\n.octextareawrapper {\n  box-sizing: border-box;\n  display: block;\n  width: 100%;\n  padding: 1px;\n  line-height: 1.25;\n  color: #333;\n  background-color: #fff;\n  margin: 0;\n  overflow: auto;\n  outline: none;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\n.octextareawrapper .resize {\n  resize: none;\n}\n\n.octextareawrapper .octextarea {\n  resize: none;\n  box-sizing: border-box;\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 18px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-family: inherit;\n  line-height: 1.25;\n  color: #333;\n  background-color: #fff;\n  margin: 0;\n  overflow: auto;\n  overflow-x: hidden;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  -ms-word-wrap: break-word;\n  word-break: break-all;\n  -ms-word-break: break-all;\n  border: 1px solid #5E6A71;\n  border-radius: 4px;\n  outline: none;\n}\n\n.octextareawrapper .octextarea:focus {\n  border-color: #5E6A71 !important;\n  box-shadow: none;\n}\n\n.octextareawrapper .octextarea:disabled {\n  cursor: default;\n  opacity: 1;\n  background-color: #f2f2f2;\n}\n\n.octextareawrapper .octextarea::-webkit-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-ms-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-webkit-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea:-ms-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea:-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-moz-placeholder {\n  font-style: italic;\n}\n\n.octextareawrapper .octextarea.ng-invalid {\n  border-color: red;\n}\n\n.action-button-container oc-button-action {\n  padding-right: 30px;\n}\n\n.flex-row .filter-control, .flex-row .filter-control-align-right {\n  padding-right: 30px;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n\n.flex-column .filter-control, .flex-column .filter-control-align-right {\n  padding-bottom: 20px;\n  flex-grow: 0;\n  flex-shrink: 0;\n  max-width: 100%;\n}\n\n.flex-column .filter-control.group-padding, .flex-column .filter-control-align-right.group-padding {\n  padding-bottom: 40px;\n}\n\n@media only screen and (max-width: 1024px) {\n  .action-button-container oc-button-action {\n    padding-right: 20px;\n  }\n\n  .filter-container .filter-control {\n    padding-right: 20px;\n  }\n}\n\n.daterangeinput {\n  display: inline-flex;\n  border: 1px solid #5E6A71;\n  background-clip: padding-box;\n  border-radius: 4px;\n  padding: 0.375rem 9px 0.375rem 9px;\n  color: #333;\n  background-color: #fff;\n  line-height: 1.5;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  width: 320px;\n}\n\n.daterangeinput *, .daterangeinput *::before, .daterangeinput *::after {\n  box-sizing: border-box;\n  zoom: 1;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.daterangeinput input:focus {\n  outline: none;\n}\n\n.daterangeinput input::-ms-clear {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n.daterangeinput ::-webkit-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput :-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput ::-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput :-ms-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput [type=number]::-webkit-inner-spin-button,\n.daterangeinput [type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.daterangeinput .pointer {\n  cursor: pointer;\n}\n\n.daterangeinput [type=date]::-webkit-inner-spin-button {\n  display: none;\n}\n\n.daterangeinput [type=date]::-webkit-calendar-picker-indicator {\n  display: none;\n}\n\n.daterangeinput.invalid {\n  border-color: #C80819;\n}\n\n.daterangeinput input {\n  margin: 0;\n  padding: 0;\n  border: none;\n  font-size: 22px;\n  width: 100%;\n}\n\n.daterangeinput input.invalid {\n  color: #C70719;\n}\n\n.daterangeinput label {\n  font-size: 12px;\n}\n\n.daterangeinput .start, .daterangeinput .end {\n  display: flex;\n  flex: 1;\n}\n\n.daterangeinput .start .group, .daterangeinput .end .group {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n.oc-visually-hidden, input[type=radio].ocRadioButton {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  text-transform: none;\n  width: 1px;\n}\n\n.arrow-down {\n  position: relative;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-top: 8px solid #fff;\n  top: 16px;\n  left: 18px;\n}\n\n.arrow-up {\n  position: relative;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 8px solid #fff;\n  top: -15px;\n  left: 18px;\n}\n\n.flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.flex-col-center {\n  justify-content: center;\n}\n\n.flex-align-center {\n  align-items: center;\n}\n\n.column {\n  flex-direction: column;\n}\n\n.hidden {\n  display: none;\n}\n\n.ht-100 {\n  height: 100%;\n}\n\ninput[type=radio].ocRadioButton + label {\n  margin: 0px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 18px;\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\ninput[type=radio].ocRadioButton:checked + label {\n  cursor: default;\n}\n\ninput[type=radio].ocRadioButton + label .labeltext {\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n\ninput[type=radio].ocRadioButton + label .radiomark {\n  display: inline-block;\n  box-sizing: border-box;\n  width: 35px;\n  height: 35px;\n  background: transparent;\n  vertical-align: middle;\n  border: 2px solid #5E6A71;\n  border-radius: 50%;\n  padding: 5px;\n  margin: 0 8px 0 0;\n  cursor: pointer;\n  transition: all 0.2s ease-out;\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n\ninput[type=radio].ocRadioButton:checked + label .radiomark {\n  background: #69BE28;\n  background-clip: content-box;\n  cursor: default;\n  transition: all 0.2s ease-out;\n}\n\n.radio-container-inline {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\ndiv.radio-item {\n  padding: 7px 5px 7px 15px;\n}\n\ninput[type=radio].ocRadioButton:disabled + label div {\n  opacity: 0.7;\n  cursor: default;\n  /*not-allowed;*/\n}\n\ninput[type=radio].ocRadioButton:disabled + label {\n  opacity: 0.7;\n  cursor: default;\n  /*not-allowed;*/\n}\n\n:host {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3BpY2stcm91dGUtc2VsZWN0L0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcY29yZVxccGljay1yb3V0ZS1zZWxlY3RcXHBpY2stcm91dGUtc2VsZWN0LmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvcGljay1yb3V0ZS1zZWxlY3QvcGljay1yb3V0ZS1zZWxlY3QuY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9waWNrLXJvdXRlLXNlbGVjdC9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9ub2RlX21vZHVsZXNcXEBvbW5pY2VsbFxcd2ViY29yZWNvbXBvbmVudHNcXGxpYlxcc3R5bGVzXFx0ZXh0Ym94LnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9waWNrLXJvdXRlLXNlbGVjdC9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9ub2RlX21vZHVsZXNcXEBvbW5pY2VsbFxcd2ViY29yZWNvbXBvbmVudHNcXGxpYlxcc3R5bGVzXFx0ZXh0YXJlYS5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvcGljay1yb3V0ZS1zZWxlY3QvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvbm9kZV9tb2R1bGVzXFxAb21uaWNlbGxcXHdlYmNvcmVjb21wb25lbnRzXFxsaWJcXHN0eWxlc1xcZmlsdGVyLWFyZWEuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3BpY2stcm91dGUtc2VsZWN0L0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L25vZGVfbW9kdWxlc1xcQG9tbmljZWxsXFx3ZWJjb3JlY29tcG9uZW50c1xcbGliXFxzdHlsZXNcXGRhdGVyYW5nZS5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvcGljay1yb3V0ZS1zZWxlY3QvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvbm9kZV9tb2R1bGVzXFxAb21uaWNlbGxcXHdlYmNvcmVjb21wb25lbnRzXFxsaWJcXHN0eWxlc1xcc3R5bGVzLnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9waWNrLXJvdXRlLXNlbGVjdC9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QkE7RUFDRSxhQUFBO0FDNUJGOztBRDhCQTtFQUNFLE9BQUE7QUMzQkY7O0FENkJBO0VBQ0Usc0JBQUE7QUMxQkY7O0FDVkE7RUFDSSw2RUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QURhSjs7QUNYQztFQUNHLDZFQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBRGNKOztBQ1pDO0VBQ0csNkVBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FEZUo7O0FDYkM7RUFDRyw2RUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QURnQko7O0FDYkE7RUFDSSxrQkFBQTtFQUNBLGNBQUE7QURnQko7O0FDZEk7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0FEZ0JSOztBQ2JJO0VBQ0ksa0JBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUVBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EseUJBQUE7RUFDQSx3RUFBQTtFQUVBLFdGMUJLO0VFMkJMLGtCRjVDUTtFRTZDUixzQkFBQTtFQUVBLFlBQUE7RUFDQSxlRnhCUztFRXlCVCx1Q0FBQTtFQUNBLFdBQUE7QURZUjs7QUNWSTtFQUNJLDJCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBRFlSOztBQ1ZJO0VBQ0ksbUNBQUE7QURZUjs7QUNUSTtFQUNJLHNCQUFBO0VBQ0EsVUFBQTtFQUNBLGdEQUFBO0FEV1I7O0FDVEk7RUFDSSxnQkFBQTtBRFdSOztBQ1JJO0VBQ0ksZ0NBQUE7RUFDQSxnQkFBQTtBRFVSOztBQ1BJO0VBQ0kseUJGdEJlO0FDK0J2Qjs7QUNOSTtFQUNJLHFCQUFBO0FEUVI7O0FDTEk7RUFDSSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsUUFBQTtFQUNBLHNCQUFBO0FET1I7O0FDSkk7RUFDSSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVGdkVVO0FDNkVsQjs7QUNISTtFQUNJO0lBQ0ksZUZ6RU07RUM4RWhCO0FBQ0Y7O0FFeEdBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFdIV1c7RUdWWCxzQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLHdFQUFBO0FGMkdGOztBRXpHRTtFQUNFLFlBQUE7QUYyR0o7O0FFeEdFO0VBQ0UsWUFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLGVIQ2E7RUdBYiw2RUhMcUI7RUdNckIsb0JBQUE7RUFDQSxpQkFBQTtFQUNBLFdIVlM7RUdXVCxzQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkh0Q1k7RUd1Q1osYUFBQTtBRjBHSjs7QUV4R0U7RUFDRSxnQ0FBQTtFQUNBLGdCQUFBO0FGMEdKOztBRXhHRTtFQUNFLGVBQUE7RUFDQSxVQUFBO0VBQ0EseUJITW1CO0FDb0d2Qjs7QUV4R0U7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FGMEdKOztBRTVHRTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7QUYwR0o7O0FFNUdFO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtBRjBHSjs7QUU1R0U7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FGMEdKOztBRXhHRTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7QUYwR0o7O0FFeEdFO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtBRjBHSjs7QUV4R0U7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FGMEdKOztBRXhHRTtFQUNFLGtCQUFBO0FGMEdKOztBRXhHRTtFQUNFLGlCSGY0QjtBQ3lIaEM7O0FHL0tFO0VBQ0UsbUJBQUE7QUhrTEo7O0FHOUtBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBSGlMSjs7QUcxS0E7RUFDRSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBSDZLRjs7QUd4S0U7RUFDRSxvQkFBQTtBSDBLSjs7QUdyS0E7RUFFSTtJQUNFLG1CQUFBO0VIdUtKOztFR25LQTtJQUNFLG1CQUFBO0VIc0tGO0FBQ0Y7O0FJOU1BO0VBNENFLG9CQUFBO0VBQ0EseUJBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLDZFTGpDdUI7RUtrQ3ZCLFlBQUE7QUpxS0Y7O0FJek5FO0VBQ0Usc0JBQUE7RUFDQSxPQUFBO0VBQ0EseUJBQUE7S0FBQSxzQkFBQTtNQUFBLHFCQUFBO1VBQUEsaUJBQUE7QUoyTko7O0FJek5FO0VBQ0UsYUFBQTtBSjJOSjs7QUl6TkU7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUoyTko7O0FJek5FO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtBSjJOSjs7QUl6TkU7RUFDSSxrQkFBQTtFQUNBLHNCQUFBO0FKMk5OOztBSXpORTtFQUNJLGtCQUFBO0VBQ0Esc0JBQUE7QUoyTk47O0FJek5FO0VBQ0ksa0JBQUE7RUFDQSxzQkFBQTtBSjJOTjs7QUl6TkU7O0VBRUUsd0JBQUE7RUFDQSxTQUFBO0FKMk5KOztBSXpORTtFQUNFLGVBQUE7QUoyTko7O0FJek5FO0VBQ0UsYUFBQTtBSjJOSjs7QUl6TkU7RUFDRSxhQUFBO0FKMk5KOztBSS9NRTtFQUNFLHFCTDlDWTtBQytQaEI7O0FJL01FO0VBQ0UsU0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUppTko7O0FJaE5JO0VBQ0UsY0xwQ1U7QUNzUGhCOztBSS9NRTtFQUNFLGVBQUE7QUppTko7O0FJL01FO0VBQ0UsYUFBQTtFQUNBLE9BQUE7QUppTko7O0FJaE5JO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsT0FBQTtBSmtOTjs7QUt4UkE7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxVQUFBO0FMMlJGOztBS3hSQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBRUEsMEJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBTDBSRjs7QUt4UkE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUVBLDZCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7QUwwUkY7O0FLdFJBO0VBQ0UsYUFBQTtBTHlSRjs7QUt2UkE7RUFDRSxPQUFBO0FMMFJGOztBS3hSQTtFQUNFLHVCQUFBO0FMMlJGOztBS3pSQTtFQUNFLG1CQUFBO0FMNFJGOztBSzFSQTtFQUNFLHNCQUFBO0FMNlJGOztBSzNSQTtFQUNJLGFBQUE7QUw4Uko7O0FLNVJBO0VBQ0UsWUFBQTtBTCtSRjs7QU14VkE7RUFDRSxXQUFBO0VBQ0EsNkVQYXVCO0VPWnZCLGVQaUJlO0VPaEJmLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBTjJWRjs7QU16VkE7RUFDRSxlQUFBO0FONFZGOztBTXpWQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FONFZGOztBTTFWQTtFQUNFLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QU42VkY7O0FNM1ZBO0VBR0UsbUJQckNjO0VPc0NkLDRCQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0FONFZGOztBTXhWRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QU4yVko7O0FNdlZBO0VBQ0UseUJBQUE7QU4wVkY7O0FNdlZBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFBZ0IsZUFBQTtBTjJWbEI7O0FNeFZBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFBZ0IsZUFBQTtBTjRWbEI7O0FNelZBO0VBQU0sV0FBQTtBTjZWTiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9waWNrLXJvdXRlLXNlbGVjdC9waWNrLXJvdXRlLXNlbGVjdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRib3JkZXItcmFkaXVzOiA0cHg7XHJcbiRib3JkZXItY29sb3I6ICNhMGEyYTg7XHJcbiRzbGF0ZS1ncmV5OiAjNUU2QTcxO1xyXG4kYnJhbmQtcHJpbWFyeTogIzY5QkUyODtcclxuJGJyYW5kLWxpZ2h0Ymx1ZTogIzk3QzBFNjtcclxuJGJyYW5kLW1lZGl1bWJsdWU6ICM2Njk5Q0M7XHJcbiRicmFuZC1zZWNvbmRhcnk6ICM2OWM7XHJcbiRicmFuZC1pbmZvOiAjMDA2Njk5O1xyXG4kYnJhbmQtd2FybmluZyA6ICNmMGFkNGU7XHJcbiRicmFuZC1kYW5nZXIgOiAjQzgwODE5O1xyXG4kbGlnaHQtZ3JleTogI2RkZDtcclxuJGRhcmstZ3JleTogIzk5OTtcclxuJGFjdGlvbi1ibHVlOiAjNjY5OWNjO1xyXG4kYmFkZ2UtaW5mbzogI0YzRjlGRjtcclxuJHNjcm9sbC1idXR0b24tY29sb3I6ICNhMGEyYTg7XHJcbiRzY3JvbGwtYmFyLWNvbG9yOiAjRURFREVFO1xyXG5cclxuJHRleHQtY29sb3I6ICMzMzM7XHJcbiRwbGFjZWhvbGRlci10ZXh0LWNvbG9yOiAjOTk5O1xyXG4kZm9udC1mYW1pbHktc2Fucy1zZXJpZjogXCJTZWdvZSBVSVwiLFwiSGVsdmV0aWNhIE5ldWVcIixcIkhlbHZldGljYVwiLFwiQXJpYWxcIixcInNhbnMtc2VyaWZcIiAhZGVmYXVsdDtcclxuJGZvbnQtc2l6ZS14eGxhcmdlOiAyNnB4O1xyXG4kZm9udC1zaXplLXhsYXJnZTogMjRweDtcclxuJGZvbnQtc2l6ZS1sYXJnZTogMjJweDtcclxuJGZvbnQtc2l6ZS1tZWRpdW06IDIwcHg7XHJcbiRmb250LXNpemUtYmFzZTogMThweDtcclxuJGZvbnQtc2l6ZS1zbWFsbDogMTZweDtcclxuJGZvbnQtc2l6ZS14c21hbGw6IDE0cHg7XHJcbiRmb250LXNpemUteHhzbWFsbDogMTJweDtcclxuJGVycm9yLW1lc3NhZ2U6ICNDNzA3MTk7XHJcbi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5mbGV4LTEge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuLmNvbHVtbiB7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG4kYm9sZDogNjAwO1xyXG4kc2VtaS1ib2xkOiA1MDA7XHJcbiRyZWd1bGFyOiA0MDA7XHJcblxyXG4kYnV0dG9uLWZvbnQtc2l6ZTogMjBweDtcclxuXHJcbi8vIHotaW5kZXhcclxuJHNlYXJjaGRyb3Bkb3duLXppbmRleDogOTk4O1xyXG4kaGVhZGVyLWluZGV4OiA5OTkgIWRlZmF1bHQ7IC8vIEZvciB0aGUgaGVhZGVyXHJcbiRwb3B1cHdpbmRvdy16aW5kZXg6IDEwMDAgIWRlZmF1bHQ7IC8vIEZvciB0aGUgcG9wdXB3aW5kb3dcclxuJGNhbGVuZGFyLXppbmRleDogMTAwMSAhZGVmYXVsdDtcclxuJHBvcHVwZGlhbG9nLXppbmRleDogMTAwMiAhZGVmYXVsdDsgLy8gRm9yIHRoZSBwb3B1cHdpbmRvd1xyXG4kdG9hc3QtemluZGV4OiAxMDAzICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJGhvdmVyLXppbmRleDogMTAwNCAhZGVmYXVsdDsgLy8gRm9yIHRoZSBob3ZlclxyXG4kYmFkZ2UtemluZGV4OiAxMDA1ICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJHByb2dyZXNzYmFyLXppbmRleDogMTAwNSAhZGVmYXVsdDtcclxuJGRpc2FibGVkLWlucHV0LWNvbG9yOiAjZjJmMmYyO1xyXG4kdmFsaWRhdGlvbi1lcnJvci1ib3JkZXItY29sb3I6IHJlZDtcclxuJHNpZGVwYW5lbC1idXR0b24temluZGV4OiA5OTkgIWRlZmF1bHQ7XHJcbiIsIi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmZsZXgtMSB7XG4gIGZsZXg6IDE7XG59XG5cbi5jb2x1bW4ge1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cblxuOi1tb3otcGxhY2Vob2xkZXIge1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cblxuOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG5cbjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cblxuLm9jdGV4dGJveHdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLm9jdGV4dGJveHdyYXBwZXIgc3BhbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA3cHg7XG4gIGxlZnQ6IDdweDtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzVFNkE3MTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0O1xuICBjb2xvcjogIzMzMztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBoZWlnaHQ6IDUwcHg7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgcGFkZGluZzogMC4zNzVyZW0gMC4zNzVyZW0gMC4zNzVyZW0gOXB4O1xuICB3aWR0aDogMTAwJTtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0Lm9jaW5wdXRtYXNrIHtcbiAgZm9udC1mYW1pbHk6IFwib21uaWFzdGVyaXNrXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0Lmhhc0ljb24ge1xuICBwYWRkaW5nOiAwLjM3NXJlbSA5cHggMC4zNzVyZW0gNTBweDtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0OmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgb3V0bGluZTogMDtcbiAgYm94LXNoYWRvdzogMCAwIDAgMC4ycmVtIHJnYmEoMCwgMTIzLCAyNTUsIDAuMjUpO1xufVxuLm9jdGV4dGJveHdyYXBwZXIgLm9jaW5wdXQ6aG92ZXIge1xuICBib3gtc2hhZG93OiBub25lO1xufVxuLm9jdGV4dGJveHdyYXBwZXIgLm9jaW5wdXQ6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM1RTZBNzEgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0OmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0Lm5nLWludmFsaWQge1xuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG59XG4ub2N0ZXh0Ym94d3JhcHBlciAub2NpbnB1dCBzcGFuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRvcDogN3B4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuLm9jdGV4dGJveHdyYXBwZXIgLmxvZ29uIHtcbiAgd2lkdGg6IDQwMHB4O1xuICBoZWlnaHQ6IDYwcHg7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIHtcbiAgLm9jdGV4dGJveHdyYXBwZXIgLm9jaW5wdXQge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG4ub2N0ZXh0YXJlYXdyYXBwZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDFweDtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gIGNvbG9yOiAjMzMzO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBvdXRsaW5lOiBub25lO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXQ7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLnJlc2l6ZSB7XG4gIHJlc2l6ZTogbm9uZTtcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYSB7XG4gIHJlc2l6ZTogbm9uZTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwLjVyZW0gMC43NXJlbTtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBsaW5lLWhlaWdodDogMS4yNTtcbiAgY29sb3I6ICMzMzM7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIG1hcmdpbjogMDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAtbXMtd29yZC13cmFwOiBicmVhay13b3JkO1xuICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gIC1tcy13b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM1RTZBNzE7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3V0bGluZTogbm9uZTtcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYTpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzVFNkE3MSAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lO1xufVxuLm9jdGV4dGFyZWF3cmFwcGVyIC5vY3RleHRhcmVhOmRpc2FibGVkIHtcbiAgY3Vyc29yOiBkZWZhdWx0O1xuICBvcGFjaXR5OiAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xufVxuLm9jdGV4dGFyZWF3cmFwcGVyIC5vY3RleHRhcmVhOjpwbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYTotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLm9jdGV4dGFyZWE6LW1vei1wbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYTo6LW1vei1wbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYS5uZy1pbnZhbGlkIHtcbiAgYm9yZGVyLWNvbG9yOiByZWQ7XG59XG5cbi5hY3Rpb24tYnV0dG9uLWNvbnRhaW5lciBvYy1idXR0b24tYWN0aW9uIHtcbiAgcGFkZGluZy1yaWdodDogMzBweDtcbn1cblxuLmZsZXgtcm93IC5maWx0ZXItY29udHJvbCwgLmZsZXgtcm93IC5maWx0ZXItY29udHJvbC1hbGlnbi1yaWdodCB7XG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XG4gIGZsZXgtZ3JvdzogMDtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5mbGV4LWNvbHVtbiAuZmlsdGVyLWNvbnRyb2wsIC5mbGV4LWNvbHVtbiAuZmlsdGVyLWNvbnRyb2wtYWxpZ24tcmlnaHQge1xuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbiAgZmxleC1ncm93OiAwO1xuICBmbGV4LXNocmluazogMDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuLmZsZXgtY29sdW1uIC5maWx0ZXItY29udHJvbC5ncm91cC1wYWRkaW5nLCAuZmxleC1jb2x1bW4gLmZpbHRlci1jb250cm9sLWFsaWduLXJpZ2h0Lmdyb3VwLXBhZGRpbmcge1xuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIHtcbiAgLmFjdGlvbi1idXR0b24tY29udGFpbmVyIG9jLWJ1dHRvbi1hY3Rpb24ge1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gIH1cblxuICAuZmlsdGVyLWNvbnRhaW5lciAuZmlsdGVyLWNvbnRyb2wge1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gIH1cbn1cbi5kYXRlcmFuZ2VpbnB1dCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjNUU2QTcxO1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAuMzc1cmVtIDlweCAwLjM3NXJlbSA5cHg7XG4gIGNvbG9yOiAjMzMzO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIHdpZHRoOiAzMjBweDtcbn1cbi5kYXRlcmFuZ2VpbnB1dCAqLCAuZGF0ZXJhbmdlaW5wdXQgKjo6YmVmb3JlLCAuZGF0ZXJhbmdlaW5wdXQgKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB6b29tOiAxO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cbi5kYXRlcmFuZ2VpbnB1dCBpbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG4uZGF0ZXJhbmdlaW5wdXQgaW5wdXQ6Oi1tcy1jbGVhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG59XG4uZGF0ZXJhbmdlaW5wdXQgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xufVxuLmRhdGVyYW5nZWlucHV0IDotbW96LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xufVxuLmRhdGVyYW5nZWlucHV0IDo6LW1vei1wbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cbi5kYXRlcmFuZ2VpbnB1dCA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xufVxuLmRhdGVyYW5nZWlucHV0IFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG4uZGF0ZXJhbmdlaW5wdXQgW3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xufVxuLmRhdGVyYW5nZWlucHV0IC5wb2ludGVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmRhdGVyYW5nZWlucHV0IFt0eXBlPWRhdGVdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5kYXRlcmFuZ2VpbnB1dCBbdHlwZT1kYXRlXTo6LXdlYmtpdC1jYWxlbmRhci1waWNrZXItaW5kaWNhdG9yIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5kYXRlcmFuZ2VpbnB1dC5pbnZhbGlkIHtcbiAgYm9yZGVyLWNvbG9yOiAjQzgwODE5O1xufVxuLmRhdGVyYW5nZWlucHV0IGlucHV0IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgd2lkdGg6IDEwMCU7XG59XG4uZGF0ZXJhbmdlaW5wdXQgaW5wdXQuaW52YWxpZCB7XG4gIGNvbG9yOiAjQzcwNzE5O1xufVxuLmRhdGVyYW5nZWlucHV0IGxhYmVsIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuLmRhdGVyYW5nZWlucHV0IC5zdGFydCwgLmRhdGVyYW5nZWlucHV0IC5lbmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAxO1xufVxuLmRhdGVyYW5nZWlucHV0IC5zdGFydCAuZ3JvdXAsIC5kYXRlcmFuZ2VpbnB1dCAuZW5kIC5ncm91cCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXg6IDE7XG59XG5cbi5vYy12aXN1YWxseS1oaWRkZW4sIGlucHV0W3R5cGU9cmFkaW9dLm9jUmFkaW9CdXR0b24ge1xuICBib3JkZXI6IDA7XG4gIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gIGhlaWdodDogMXB4O1xuICBtYXJnaW46IC0xcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIHdpZHRoOiAxcHg7XG59XG5cbi5hcnJvdy1kb3duIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBib3JkZXItbGVmdDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXRvcDogOHB4IHNvbGlkICNmZmY7XG4gIHRvcDogMTZweDtcbiAgbGVmdDogMThweDtcbn1cblxuLmFycm93LXVwIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBib3JkZXItbGVmdDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWJvdHRvbTogOHB4IHNvbGlkICNmZmY7XG4gIHRvcDogLTE1cHg7XG4gIGxlZnQ6IDE4cHg7XG59XG5cbi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmZsZXgtMSB7XG4gIGZsZXg6IDE7XG59XG5cbi5mbGV4LWNvbC1jZW50ZXIge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmZsZXgtYWxpZ24tY2VudGVyIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmNvbHVtbiB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaHQtMTAwIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5pbnB1dFt0eXBlPXJhZGlvXS5vY1JhZGlvQnV0dG9uICsgbGFiZWwge1xuICBtYXJnaW46IDBweDtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuaW5wdXRbdHlwZT1yYWRpb10ub2NSYWRpb0J1dHRvbjpjaGVja2VkICsgbGFiZWwge1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbmlucHV0W3R5cGU9cmFkaW9dLm9jUmFkaW9CdXR0b24gKyBsYWJlbCAubGFiZWx0ZXh0IHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGZsZXgtZ3JvdzogMDtcbn1cblxuaW5wdXRbdHlwZT1yYWRpb10ub2NSYWRpb0J1dHRvbiArIGxhYmVsIC5yYWRpb21hcmsge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHdpZHRoOiAzNXB4O1xuICBoZWlnaHQ6IDM1cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNUU2QTcxO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWFyZ2luOiAwIDhweCAwIDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1vdXQ7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBmbGV4LWdyb3c6IDA7XG59XG5cbmlucHV0W3R5cGU9cmFkaW9dLm9jUmFkaW9CdXR0b246Y2hlY2tlZCArIGxhYmVsIC5yYWRpb21hcmsge1xuICBiYWNrZ3JvdW5kOiAjNjlCRTI4O1xuICBiYWNrZ3JvdW5kLWNsaXA6IGNvbnRlbnQtYm94O1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2Utb3V0O1xufVxuXG4ucmFkaW8tY29udGFpbmVyLWlubGluZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuZGl2LnJhZGlvLWl0ZW0ge1xuICBwYWRkaW5nOiA3cHggNXB4IDdweCAxNXB4O1xufVxuXG5pbnB1dFt0eXBlPXJhZGlvXS5vY1JhZGlvQnV0dG9uOmRpc2FibGVkICsgbGFiZWwgZGl2IHtcbiAgb3BhY2l0eTogMC43O1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIC8qbm90LWFsbG93ZWQ7Ki9cbn1cblxuaW5wdXRbdHlwZT1yYWRpb10ub2NSYWRpb0J1dHRvbjpkaXNhYmxlZCArIGxhYmVsIHtcbiAgb3BhY2l0eTogMC43O1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIC8qbm90LWFsbG93ZWQ7Ki9cbn1cblxuOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbn0iLCI6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsXCJIZWx2ZXRpY2FcIixcIkFyaWFsXCIsXCJzYW5zLXNlcmlmXCI7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICBjb2xvcjogJHBsYWNlaG9sZGVyLXRleHQtY29sb3IgIWltcG9ydGFudDtcclxuIH1cclxuIDotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsXCJIZWx2ZXRpY2EgTmV1ZVwiLFwiSGVsdmV0aWNhXCIsXCJBcmlhbFwiLFwic2Fucy1zZXJpZlwiO1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljOyAgXHJcbiAgICBjb2xvcjogJHBsYWNlaG9sZGVyLXRleHQtY29sb3IgIWltcG9ydGFudDtcclxuIH1cclxuIDo6LW1vei1wbGFjZWhvbGRlciB7XHJcbiAgICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLFwiSGVsdmV0aWNhIE5ldWVcIixcIkhlbHZldGljYVwiLFwiQXJpYWxcIixcInNhbnMtc2VyaWZcIjtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYzsgIFxyXG4gICAgY29sb3I6ICRwbGFjZWhvbGRlci10ZXh0LWNvbG9yICFpbXBvcnRhbnQ7XHJcbiB9XHJcbiA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsXCJIZWx2ZXRpY2EgTmV1ZVwiLFwiSGVsdmV0aWNhXCIsXCJBcmlhbFwiLFwic2Fucy1zZXJpZlwiO1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljOyBcclxuICAgIGNvbG9yOiAkcGxhY2Vob2xkZXItdGV4dC1jb2xvciAhaW1wb3J0YW50O1xyXG4gfVxyXG4gXHJcbi5vY3RleHRib3h3cmFwcGVye1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBcclxuICAgIHNwYW57XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogN3B4O1xyXG4gICAgICAgIGxlZnQ6IDdweDtcclxuICAgIH1cclxuXHJcbiAgICAub2NpbnB1dCB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xyXG4gICAgXHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRzbGF0ZS1ncmV5O1xyXG4gICAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IC4xNXMgZWFzZS1pbi1vdXQ7XHJcbiAgICBcclxuICAgICAgICBjb2xvcjogJHRleHQtY29sb3I7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czokYm9yZGVyLXJhZGl1cztcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgIC8vIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAkZm9udC1zaXplLWJhc2U7XHJcbiAgICAgICAgcGFkZGluZzogLjM3NXJlbSAuMzc1cmVtIC4zNzVyZW0gOXB4O1xyXG4gICAgICAgIHdpZHRoOiAxMDAlOyAgICAgICBcclxuICAgIH1cclxuICAgIC5vY2lucHV0Lm9jaW5wdXRtYXNrIHtcclxuICAgICAgICBmb250LWZhbWlseTogXCJvbW5pYXN0ZXJpc2tcIjtcclxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIH1cclxuICAgIC5vY2lucHV0Lmhhc0ljb24ge1xyXG4gICAgICAgIHBhZGRpbmc6IC4zNzVyZW0gOXB4IC4zNzVyZW0gNTBweDtcclxuICAgIH1cclxuXHJcbiAgICAub2NpbnB1dDpmb2N1cyB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojZmZmO1xyXG4gICAgICAgIG91dGxpbmU6IDA7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMC4ycmVtIHJnYmEoMCwxMjMsMjU1LC4yNSk7XHJcbiAgICB9XHJcbiAgICAub2NpbnB1dDpob3ZlciB7XHJcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAub2NpbnB1dDpmb2N1cyB7XHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkc2xhdGUtZ3JleSAhaW1wb3J0YW50O1xyXG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLm9jaW5wdXQ6ZGlzYWJsZWQge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkaXNhYmxlZC1pbnB1dC1jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAub2NpbnB1dC5uZy1pbnZhbGlkIHtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkdmFsaWRhdGlvbi1lcnJvci1ib3JkZXItY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLm9jaW5wdXQgc3BhbiB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICB0b3A6IDdweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5sb2dvbiB7XHJcbiAgICAgICAgd2lkdGg6IDQwMHB4O1xyXG4gICAgICAgIGhlaWdodDogNjBweDtcclxuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtbGFyZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoIDogNzY4cHgpIGFuZCAobWF4LXdpZHRoIDogMTAyNHB4KSAge1xyXG4gICAgICAgIC5vY2lucHV0IHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udC1zaXplLXNtYWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi5vY3RleHRhcmVhd3JhcHBlciB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XHJcbiAgY29sb3I6ICR0ZXh0LWNvbG9yO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0O1xyXG5cclxuICAucmVzaXplIHtcclxuICAgIHJlc2l6ZTogbm9uZTtcclxuICB9XHJcblxyXG4gIC5vY3RleHRhcmVhIHtcclxuICAgIHJlc2l6ZTogbm9uZTtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMC41cmVtIDAuNzVyZW07XHJcbiAgICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcclxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMjU7XHJcbiAgICBjb2xvcjogJHRleHQtY29sb3I7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xyXG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gICAgLW1zLXdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcclxuICAgIC1tcy13b3JkLWJyZWFrOiBicmVhay1hbGw7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkc2xhdGUtZ3JleTtcclxuICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICB9XHJcbiAgLm9jdGV4dGFyZWE6Zm9jdXMge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAkc2xhdGUtZ3JleSAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICB9XHJcbiAgLm9jdGV4dGFyZWE6ZGlzYWJsZWQge1xyXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRkaXNhYmxlZC1pbnB1dC1jb2xvcjtcclxuICB9XHJcbiAgLm9jdGV4dGFyZWE6OnBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkcGxhY2Vob2xkZXItdGV4dC1jb2xvciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICAub2N0ZXh0YXJlYTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICBjb2xvcjogJHBsYWNlaG9sZGVyLXRleHQtY29sb3IgIWltcG9ydGFudDtcclxuICB9XHJcbiAgLm9jdGV4dGFyZWE6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkcGxhY2Vob2xkZXItdGV4dC1jb2xvciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICAub2N0ZXh0YXJlYTotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkcGxhY2Vob2xkZXItdGV4dC1jb2xvciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICAub2N0ZXh0YXJlYTo6LW1vei1wbGFjZWhvbGRlciB7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgfVxyXG4gIC5vY3RleHRhcmVhLm5nLWludmFsaWQge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAkdmFsaWRhdGlvbi1lcnJvci1ib3JkZXItY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG4iLCIuYWN0aW9uLWJ1dHRvbi1jb250YWluZXIge1xyXG4gIG9jLWJ1dHRvbi1hY3Rpb24ge1xyXG4gICAgcGFkZGluZy1yaWdodDogMzBweDtcclxuICB9XHJcbn1cclxuXHJcbi5mbGV4LXJvdyAuZmlsdGVyLWNvbnRyb2wsIC5mbGV4LXJvdyAuZmlsdGVyLWNvbnRyb2wtYWxpZ24tcmlnaHQge1xyXG4gICAgcGFkZGluZy1yaWdodDogMzBweDtcclxuICAgIGZsZXgtZ3JvdzogMDtcclxuICAgIGZsZXgtc2hyaW5rOiAwO1xyXG5cclxuICAgIC8vICY6bGFzdC1jaGlsZCB7XHJcbiAgICAvLyAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbi5mbGV4LWNvbHVtbiAuZmlsdGVyLWNvbnRyb2wsIC5mbGV4LWNvbHVtbiAuZmlsdGVyLWNvbnRyb2wtYWxpZ24tcmlnaHQge1xyXG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gIGZsZXgtZ3JvdzogMDtcclxuICBmbGV4LXNocmluazogMDtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgLy8gJjpsYXN0LWNoaWxkIHtcclxuICAvLyAgIHBhZGRpbmctYm90dG9tOiAwO1xyXG4gIC8vIH1cclxuXHJcbiAgJi5ncm91cC1wYWRkaW5nIHtcclxuICAgIHBhZGRpbmctYm90dG9tOiA0MHB4O1xyXG4gIH1cclxufVxyXG5cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6IDEwMjRweCkgIHtcclxuICAuYWN0aW9uLWJ1dHRvbi1jb250YWluZXIge1xyXG4gICAgb2MtYnV0dG9uLWFjdGlvbiB7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuZmlsdGVyLWNvbnRhaW5lciAuZmlsdGVyLWNvbnRyb2wge1xyXG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcclxuXHJcbiAgICAvLyAmOmxhc3QtY2hpbGQge1xyXG4gICAgLy8gICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCIuZGF0ZXJhbmdlaW5wdXQge1xyXG4gICosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHpvb206IDE7XHJcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICB9XHJcbiAgaW5wdXQ6Zm9jdXMge1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICB9XHJcbiAgaW5wdXQ6Oi1tcy1jbGVhciB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgd2lkdGggOiAwO1xyXG4gICAgaGVpZ2h0OiAwO1xyXG4gIH1cclxuICA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcclxuICB9XHJcbiAgOi1tb3otcGxhY2Vob2xkZXIge1xyXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICAgIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIDo6LW1vei1wbGFjZWhvbGRlciB7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcclxuICB9XHJcbiAgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcclxuICB9XHJcbiAgW3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcclxuICBbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcclxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcbiAgLnBvaW50ZXIge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuICBbdHlwZT1cImRhdGVcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24ge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgW3R5cGU9XCJkYXRlXCJdOjotd2Via2l0LWNhbGVuZGFyLXBpY2tlci1pbmRpY2F0b3Ige1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgJHNsYXRlLWdyZXk7XHJcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgcGFkZGluZzogMC4zNzVyZW0gOXB4IDAuMzc1cmVtIDlweDtcclxuICBjb2xvcjogIzMzMztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIHdpZHRoOiAzMjBweDtcclxuICAmLmludmFsaWQge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAkYnJhbmQtZGFuZ2VyO1xyXG4gIH1cclxuICBpbnB1dCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICAmLmludmFsaWQge1xyXG4gICAgICBjb2xvcjogJGVycm9yLW1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbiAgLnN0YXJ0LCAuZW5kIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgLmdyb3VwIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgZmxleDogMTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiQGltcG9ydCBcInZhcmlhYmxlc1wiO1xyXG5AaW1wb3J0IFwidGV4dGJveFwiO1xyXG5AaW1wb3J0IFwidGV4dGFyZWFcIjtcclxuQGltcG9ydCBcImZpbHRlci1hcmVhXCI7XHJcbkBpbXBvcnQgXCJkYXRlcmFuZ2VcIjtcclxuXHJcbi5vYy12aXN1YWxseS1oaWRkZW4ge1xyXG4gIGJvcmRlcjogMDtcclxuICBjbGlwOiByZWN0KDAgMCAwIDApO1xyXG4gIGhlaWdodDogMXB4O1xyXG4gIG1hcmdpbjogLTFweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xyXG4gIHdpZHRoOiAxcHg7XHJcbn1cclxuLy89PT09PT09PT09PSBzb3J0aW5nIGFycm93cz09PT09PT09PT09PT1cclxuLmFycm93LWRvd24ge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMDtcclxuICBoZWlnaHQ6IDA7XHJcbiAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICBib3JkZXItcmlnaHQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuXHJcbiAgYm9yZGVyLXRvcDogOHB4IHNvbGlkICNmZmY7XHJcbiAgdG9wOiAxNnB4O1xyXG4gIGxlZnQ6IDE4cHg7XHJcbn1cclxuLmFycm93LXVwIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDA7XHJcbiAgaGVpZ2h0OiAwO1xyXG4gIGJvcmRlci1sZWZ0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcblxyXG4gIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCAjZmZmO1xyXG4gIHRvcDogLTE1cHg7XHJcbiAgbGVmdDogMThweDtcclxufVxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy89PT09PT09PT09PT1BZGQgRmxleCBzdHlsZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5mbGV4LTEge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuLmZsZXgtY29sLWNlbnRlciB7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLmZsZXgtYWxpZ24tY2VudGVyIHtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5jb2x1bW4ge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuLmhpZGRlbntcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuLmh0LTEwMCB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4iLCJAaW1wb3J0IFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BvbW5pY2VsbC93ZWJjb3JlY29tcG9uZW50cy9saWIvc3R5bGVzL3N0eWxlc1wiO1xyXG5pbnB1dFt0eXBlPVwicmFkaW9cIl0ub2NSYWRpb0J1dHRvbiB7XHJcbiAgQGV4dGVuZCAub2MtdmlzdWFsbHktaGlkZGVuO1xyXG59XHJcbmlucHV0W3R5cGU9XCJyYWRpb1wiXS5vY1JhZGlvQnV0dG9uICsgbGFiZWwge1xyXG4gIG1hcmdpbjogMHB4O1xyXG4gIGZvbnQtZmFtaWx5OiRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5pbnB1dFt0eXBlPVwicmFkaW9cIl0ub2NSYWRpb0J1dHRvbjpjaGVja2VkICsgbGFiZWwge1xyXG4gIGN1cnNvcjogZGVmYXVsdDtcclxuXHJcbn1cclxuaW5wdXRbdHlwZT1cInJhZGlvXCJdLm9jUmFkaW9CdXR0b24gKyBsYWJlbCAubGFiZWx0ZXh0IHtcclxuICBmbGV4LXNocmluazowO1xyXG4gIGZsZXgtZ3JvdzowO1xyXG59XHJcbmlucHV0W3R5cGU9XCJyYWRpb1wiXS5vY1JhZGlvQnV0dG9uICsgbGFiZWwgLnJhZGlvbWFyayB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgd2lkdGg6IDM1cHg7XHJcbiAgaGVpZ2h0OiAzNXB4O1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgYm9yZGVyOiAycHggc29saWQgJHNsYXRlLWdyZXk7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBtYXJnaW46MCA4cHggMCAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLW91dDtcclxuICBmbGV4LXNocmluazogMDtcclxuICBmbGV4LWdyb3c6IDA7XHJcbn1cclxuaW5wdXRbdHlwZT1cInJhZGlvXCJdLm9jUmFkaW9CdXR0b246Y2hlY2tlZCArIGxhYmVsIC5yYWRpb21hcmsge1xyXG4gIC8vIHdpZHRoOiAkZm9udC1zaXplLWJhc2UgKiAxLjMzMztcclxuICAvLyBoZWlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDEuMzMzO1xyXG4gIGJhY2tncm91bmQ6ICRicmFuZC1wcmltYXJ5O1xyXG4gIGJhY2tncm91bmQtY2xpcDogY29udGVudC1ib3g7XHJcbiAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2Utb3V0O1xyXG59XHJcblxyXG4ucmFkaW8tY29udGFpbmVyIHtcclxuICAmLWlubGluZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICB9XHJcbn1cclxuXHJcbmRpdi5yYWRpby1pdGVtIHtcclxuICBwYWRkaW5nOjdweCA1cHggN3B4IDE1cHg7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJyYWRpb1wiXS5vY1JhZGlvQnV0dG9uOmRpc2FibGVkICsgbGFiZWwgZGl2IHtcclxuICBvcGFjaXR5OiAwLjc7XHJcbiAgY3Vyc29yOiBkZWZhdWx0Oy8qbm90LWFsbG93ZWQ7Ki9cclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInJhZGlvXCJdLm9jUmFkaW9CdXR0b246ZGlzYWJsZWQgKyBsYWJlbCB7XHJcbiAgb3BhY2l0eTogMC43O1xyXG4gIGN1cnNvcjogZGVmYXVsdDsvKm5vdC1hbGxvd2VkOyovXHJcbn1cclxuXHJcbjpob3N0e3dpZHRoOjEwMCU7fVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/core/pick-route-select/pick-route-select.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/core/pick-route-select/pick-route-select.component.ts ***!
  \***********************************************************************/
/*! exports provided: PickRouteSelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickRouteSelectComponent", function() { return PickRouteSelectComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let PickRouteSelectComponent = class PickRouteSelectComponent {
    constructor() {
        this.groupName = 'RadioList';
        this.colDescription = 'My Description';
        this.SelectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
    }
    selectionChanged(selectionItem) {
        if (selectionItem !== this.selectedItem) {
            this.selectedItem = selectionItem;
            this.SelectionChange.emit(this.selectedItem);
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PickRouteSelectComponent.prototype, "listMap", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PickRouteSelectComponent.prototype, "selectedItem", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PickRouteSelectComponent.prototype, "colDescription", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], PickRouteSelectComponent.prototype, "SelectionChange", void 0);
PickRouteSelectComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-pick-route-select',
        template: __webpack_require__(/*! raw-loader!./pick-route-select.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/pick-route-select/pick-route-select.component.html"),
        styles: [__webpack_require__(/*! ./pick-route-select.component.scss */ "./src/app/core/pick-route-select/pick-route-select.component.scss")]
    })
], PickRouteSelectComponent);



/***/ }),

/***/ "./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3ByaW9yaXR5LWNvZGUtcGljay1yb3V0ZXMtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9wcm9qZWN0c1xcY3BtLWFwcFxcc3JjXFxhcHBcXGNvcmVcXHByaW9yaXR5LWNvZGUtcGljay1yb3V0ZXMtcGFnZVxccHJpb3JpdHktY29kZS1waWNrLXJvdXRlcy1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvcHJpb3JpdHktY29kZS1waWNrLXJvdXRlcy1wYWdlL3ByaW9yaXR5LWNvZGUtcGljay1yb3V0ZXMtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUNDSiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9wcmlvcml0eS1jb2RlLXBpY2stcm91dGVzLXBhZ2UvcHJpb3JpdHktY29kZS1waWNrLXJvdXRlcy1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3R7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn0iLCI6aG9zdCB7XG4gIGhlaWdodDogMTAwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: PriorityCodePickRoutesPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityCodePickRoutesPageComponent", function() { return PriorityCodePickRoutesPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_core_services_priority_code_pick_routes_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api-core/services/priority-code-pick-routes.service */ "./src/app/api-core/services/priority-code-pick-routes.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");





let PriorityCodePickRoutesPageComponent = class PriorityCodePickRoutesPageComponent {
    constructor(priorityCodePickRoutesService) {
        this.priorityCodePickRoutesService = priorityCodePickRoutesService;
    }
    ngOnInit() {
        this.priorityCodePickRoutes$ = this.priorityCodePickRoutesService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(p => {
            return lodash__WEBPACK_IMPORTED_MODULE_3__["orderBy"](p, (x) => x.PrioritySequenceOrder);
        }));
    }
};
PriorityCodePickRoutesPageComponent.ctorParameters = () => [
    { type: _api_core_services_priority_code_pick_routes_service__WEBPACK_IMPORTED_MODULE_2__["PriorityCodePickRoutesService"] }
];
PriorityCodePickRoutesPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-priority-code-pick-routes-page',
        template: __webpack_require__(/*! raw-loader!./priority-code-pick-routes-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.html"),
        styles: [__webpack_require__(/*! ./priority-code-pick-routes-page.component.scss */ "./src/app/core/priority-code-pick-routes-page/priority-code-pick-routes-page.component.scss")]
    })
], PriorityCodePickRoutesPageComponent);



/***/ }),

/***/ "./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.scss ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n\n:host ::ng-deep oc-search-box {\n  width: 358px !important;\n  margin-right: 10px;\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3ByaW9yaXR5LWNvZGUtcGljay1yb3V0ZXMvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvcHJvamVjdHNcXGNwbS1hcHBcXHNyY1xcYXBwXFxjb3JlXFxwcmlvcml0eS1jb2RlLXBpY2stcm91dGVzXFxwcmlvcml0eS1jb2RlLXBpY2stcm91dGVzLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvcHJpb3JpdHktY29kZS1waWNrLXJvdXRlcy9wcmlvcml0eS1jb2RlLXBpY2stcm91dGVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLE9BQUE7QUNDRjs7QURDQTtFQUNFLGVBQUE7QUNFRjs7QURBQTtFQUNFLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQ0dGIiwiZmlsZSI6InByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3ByaW9yaXR5LWNvZGUtcGljay1yb3V0ZXMvcHJpb3JpdHktY29kZS1waWNrLXJvdXRlcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0e1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZmxleDogMTtcclxufVxyXG46aG9zdCA6Om5nLWRlZXAgb2MtZ3JpZHtcclxuICBmb250LXNpemU6IDIycHg7XHJcbn1cclxuOmhvc3QgOjpuZy1kZWVwIG9jLXNlYXJjaC1ib3h7XHJcbiAgd2lkdGg6IDM1OHB4ICFpbXBvcnRhbnQ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufSIsIjpob3N0IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4OiAxO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgb2MtZ3JpZCB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIG9jLXNlYXJjaC1ib3gge1xuICB3aWR0aDogMzU4cHggIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59Il19 */"

/***/ }),

/***/ "./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.ts ***!
  \***************************************************************************************/
/*! exports provided: PriorityCodePickRoutesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityCodePickRoutesComponent", function() { return PriorityCodePickRoutesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/services/window-service */ "./src/app/shared/services/window-service.ts");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");







let PriorityCodePickRoutesComponent = class PriorityCodePickRoutesComponent {
    constructor(windowService, wpfActionControllerService) {
        this.windowService = windowService;
        this.wpfActionControllerService = wpfActionControllerService;
        this.searchFields = [Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('PriorityCodeDescription'), Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('PickRouteDescription')];
    }
    set priorityCodePickRoutes(value) {
        this._priorityCodePickRoutes = value;
        if (this.windowService.nativeWindow) {
            this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
    }
    get priorityCodePickRoutes() {
        return this._priorityCodePickRoutes;
    }
    ngAfterViewInit() {
        this.searchElement.searchOutput$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((searchData) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(searchData);
        }))
            .subscribe(data => {
            this.searchTextFilter = data;
            if (this.windowService.nativeWindow) {
                this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
            }
        });
    }
    navigate(priorityCodePickRouteId) {
        this.wpfActionControllerService.
            ExecuteContinueNavigationAction(`priorityCode/RouteAssignments`, { priorityCodePickRouteId: priorityCodePickRouteId });
    }
};
PriorityCodePickRoutesComponent.ctorParameters = () => [
    { type: _shared_services_window_service__WEBPACK_IMPORTED_MODULE_5__["WindowService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_6__["WpfActionControllerService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PriorityCodePickRoutesComponent.prototype, "priorityCodePickRoutes", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBox', {
        static: true
    })
], PriorityCodePickRoutesComponent.prototype, "searchElement", void 0);
PriorityCodePickRoutesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-priority-code-pick-routes',
        template: __webpack_require__(/*! raw-loader!./priority-code-pick-routes.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.html"),
        styles: [__webpack_require__(/*! ./priority-code-pick-routes.component.scss */ "./src/app/core/priority-code-pick-routes/priority-code-pick-routes.component.scss")]
    })
], PriorityCodePickRoutesComponent);



/***/ }),

/***/ "./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.scss":
/*!***************************************************************************************************************!*\
  !*** ./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.scss ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\n:host {\n  height: 100%;\n}\n\n.panelContainer {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  overflow: hidden;\n}\n\n.leftPanel {\n  flex: 1;\n  overflow-y: auto;\n  border-top: solid #5E6A71 4px;\n  border-right: solid #5E6A71 6px;\n  height: 100%;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.rightPanel {\n  flex: 1;\n  overflow-y: auto;\n  border-top: solid #5E6A71 4px;\n  height: 100%;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.buttonSpacer {\n  margin: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3ByaW9yaXR5LWNvZGUtcm91dGUtYXNzaWdubWVudHMtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9wcm9qZWN0c1xcY3BtLWFwcFxcc3JjXFxhcHBcXGNvcmVcXHByaW9yaXR5LWNvZGUtcm91dGUtYXNzaWdubWVudHMtcGFnZVxccHJpb3JpdHktY29kZS1yb3V0ZS1hc3NpZ25tZW50cy1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvcHJpb3JpdHktY29kZS1yb3V0ZS1hc3NpZ25tZW50cy1wYWdlL3ByaW9yaXR5LWNvZGUtcm91dGUtYXNzaWdubWVudHMtcGFnZS5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3ByaW9yaXR5LWNvZGUtcm91dGUtYXNzaWdubWVudHMtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QkE7RUFDRSxhQUFBO0FDNUJGOztBRDhCQTtFQUNFLE9BQUE7QUMzQkY7O0FENkJBO0VBQ0Usc0JBQUE7QUMxQkY7O0FDVEE7RUFDSSxZQUFBO0FEWUo7O0FDVkE7RUFFRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0VBQ0EsZ0JBQUE7QURZRjs7QUNWQTtFQUNFLE9BQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0EsK0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0FEYUY7O0FDWEE7RUFDRSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7QURjRjs7QUNaQTtFQUNFLFlBQUE7QURlRiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvY29yZS9wcmlvcml0eS1jb2RlLXJvdXRlLWFzc2lnbm1lbnRzLXBhZ2UvcHJpb3JpdHktY29kZS1yb3V0ZS1hc3NpZ25tZW50cy1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGJvcmRlci1yYWRpdXM6IDRweDtcclxuJGJvcmRlci1jb2xvcjogI2EwYTJhODtcclxuJHNsYXRlLWdyZXk6ICM1RTZBNzE7XHJcbiRicmFuZC1wcmltYXJ5OiAjNjlCRTI4O1xyXG4kYnJhbmQtbGlnaHRibHVlOiAjOTdDMEU2O1xyXG4kYnJhbmQtbWVkaXVtYmx1ZTogIzY2OTlDQztcclxuJGJyYW5kLXNlY29uZGFyeTogIzY5YztcclxuJGJyYW5kLWluZm86ICMwMDY2OTk7XHJcbiRicmFuZC13YXJuaW5nIDogI2YwYWQ0ZTtcclxuJGJyYW5kLWRhbmdlciA6ICNDODA4MTk7XHJcbiRsaWdodC1ncmV5OiAjZGRkO1xyXG4kZGFyay1ncmV5OiAjOTk5O1xyXG4kYWN0aW9uLWJsdWU6ICM2Njk5Y2M7XHJcbiRiYWRnZS1pbmZvOiAjRjNGOUZGO1xyXG4kc2Nyb2xsLWJ1dHRvbi1jb2xvcjogI2EwYTJhODtcclxuJHNjcm9sbC1iYXItY29sb3I6ICNFREVERUU7XHJcblxyXG4kdGV4dC1jb2xvcjogIzMzMztcclxuJHBsYWNlaG9sZGVyLXRleHQtY29sb3I6ICM5OTk7XHJcbiRmb250LWZhbWlseS1zYW5zLXNlcmlmOiBcIlNlZ29lIFVJXCIsXCJIZWx2ZXRpY2EgTmV1ZVwiLFwiSGVsdmV0aWNhXCIsXCJBcmlhbFwiLFwic2Fucy1zZXJpZlwiICFkZWZhdWx0O1xyXG4kZm9udC1zaXplLXh4bGFyZ2U6IDI2cHg7XHJcbiRmb250LXNpemUteGxhcmdlOiAyNHB4O1xyXG4kZm9udC1zaXplLWxhcmdlOiAyMnB4O1xyXG4kZm9udC1zaXplLW1lZGl1bTogMjBweDtcclxuJGZvbnQtc2l6ZS1iYXNlOiAxOHB4O1xyXG4kZm9udC1zaXplLXNtYWxsOiAxNnB4O1xyXG4kZm9udC1zaXplLXhzbWFsbDogMTRweDtcclxuJGZvbnQtc2l6ZS14eHNtYWxsOiAxMnB4O1xyXG4kZXJyb3ItbWVzc2FnZTogI0M3MDcxOTtcclxuLmZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuLmZsZXgtMSB7XHJcbiAgZmxleDogMTtcclxufVxyXG4uY29sdW1uIHtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcbiRib2xkOiA2MDA7XHJcbiRzZW1pLWJvbGQ6IDUwMDtcclxuJHJlZ3VsYXI6IDQwMDtcclxuXHJcbiRidXR0b24tZm9udC1zaXplOiAyMHB4O1xyXG5cclxuLy8gei1pbmRleFxyXG4kc2VhcmNoZHJvcGRvd24temluZGV4OiA5OTg7XHJcbiRoZWFkZXItaW5kZXg6IDk5OSAhZGVmYXVsdDsgLy8gRm9yIHRoZSBoZWFkZXJcclxuJHBvcHVwd2luZG93LXppbmRleDogMTAwMCAhZGVmYXVsdDsgLy8gRm9yIHRoZSBwb3B1cHdpbmRvd1xyXG4kY2FsZW5kYXItemluZGV4OiAxMDAxICFkZWZhdWx0O1xyXG4kcG9wdXBkaWFsb2ctemluZGV4OiAxMDAyICFkZWZhdWx0OyAvLyBGb3IgdGhlIHBvcHVwd2luZG93XHJcbiR0b2FzdC16aW5kZXg6IDEwMDMgIWRlZmF1bHQ7IC8vIEZvciB0aGUgdG9hc3QgbWVzc2FnZVxyXG4kaG92ZXItemluZGV4OiAxMDA0ICFkZWZhdWx0OyAvLyBGb3IgdGhlIGhvdmVyXHJcbiRiYWRnZS16aW5kZXg6IDEwMDUgIWRlZmF1bHQ7IC8vIEZvciB0aGUgdG9hc3QgbWVzc2FnZVxyXG4kcHJvZ3Jlc3NiYXItemluZGV4OiAxMDA1ICFkZWZhdWx0O1xyXG4kZGlzYWJsZWQtaW5wdXQtY29sb3I6ICNmMmYyZjI7XHJcbiR2YWxpZGF0aW9uLWVycm9yLWJvcmRlci1jb2xvcjogcmVkO1xyXG4kc2lkZXBhbmVsLWJ1dHRvbi16aW5kZXg6IDk5OSAhZGVmYXVsdDtcclxuIiwiLmZsZXgge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uZmxleC0xIHtcbiAgZmxleDogMTtcbn1cblxuLmNvbHVtbiB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbjpob3N0IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ucGFuZWxDb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ubGVmdFBhbmVsIHtcbiAgZmxleDogMTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYm9yZGVyLXRvcDogc29saWQgIzVFNkE3MSA0cHg7XG4gIGJvcmRlci1yaWdodDogc29saWQgIzVFNkE3MSA2cHg7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5yaWdodFBhbmVsIHtcbiAgZmxleDogMTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYm9yZGVyLXRvcDogc29saWQgIzVFNkE3MSA0cHg7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5idXR0b25TcGFjZXIge1xuICBtYXJnaW46IDI1cHg7XG59IiwiQGltcG9ydCBcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ab21uaWNlbGwvd2ViY29yZWNvbXBvbmVudHMvbGliL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG46aG9zdHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG4ucGFuZWxDb250YWluZXJcclxue1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBmbGV4OiAxO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuLmxlZnRQYW5lbCB7XHJcbiAgZmxleDogMTtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIGJvcmRlci10b3A6IHNvbGlkICRzbGF0ZS1ncmV5IDRweDtcclxuICBib3JkZXItcmlnaHQ6IHNvbGlkICRzbGF0ZS1ncmV5IDZweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG4ucmlnaHRQYW5lbCB7XHJcbiAgZmxleDogMTtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIGJvcmRlci10b3A6c29saWQgJHNsYXRlLWdyZXkgIDRweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG4uYnV0dG9uU3BhY2VyIHtcclxuICBtYXJnaW46IDI1cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: PriorityCodeRouteAssignmentsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityCodeRouteAssignmentsPageComponent", function() { return PriorityCodeRouteAssignmentsPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _api_core_services_priority_code_route_assignments_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api-core/services/priority-code-route-assignments.service */ "./src/app/api-core/services/priority-code-route-assignments.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _api_core_services_priority_code_pick_routes_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../api-core/services/priority-code-pick-routes.service */ "./src/app/api-core/services/priority-code-pick-routes.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _shared_components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/components/confirm-popup/confirm-popup.component */ "./src/app/shared/components/confirm-popup/confirm-popup.component.ts");
/* harmony import */ var _api_core_services_ocs_status_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../api-core/services/ocs-status.service */ "./src/app/api-core/services/ocs-status.service.ts");
/* harmony import */ var _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../api-core/services/core-event-connection.service */ "./src/app/api-core/services/core-event-connection.service.ts");














let PriorityCodeRouteAssignmentsPageComponent = class PriorityCodeRouteAssignmentsPageComponent {
    constructor(route, priorityCodeRouteAssignmentsService, priorityCodePickRoutesService, wpfActionControllerService, translateService, dialogService, popupWindowService, coreEventConnectionService, ocsStatusService) {
        this.route = route;
        this.priorityCodeRouteAssignmentsService = priorityCodeRouteAssignmentsService;
        this.priorityCodePickRoutesService = priorityCodePickRoutesService;
        this.wpfActionControllerService = wpfActionControllerService;
        this.translateService = translateService;
        this.dialogService = dialogService;
        this.popupWindowService = popupWindowService;
        this.coreEventConnectionService = coreEventConnectionService;
        this.ocsStatusService = ocsStatusService;
        this.saveInProgress = false;
        this.isEditAvailable = true;
        this.canSave = false;
        this.ocsIsHealthy = false;
    }
    get pickRoute() {
        return this._pickRoute;
    }
    set pickRoute(value) {
        this._pickRoute = value;
        this.deviceList$ = this.pickrouteDevices$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(results => {
            return this.setDevices(this.pickRoute, results);
        }));
    }
    ngOnInit() {
        const pcprId = this.route.snapshot.queryParamMap.get('priorityCodePickRouteId');
        this._priorityCodePickRouteId = +pcprId;
        this.priorityCode$ = this.priorityCodePickRoutesService.getPriority(this._priorityCodePickRouteId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["single"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
        this.pickrouteDevices$ = this.getPickrouteDevices();
        this.routeList = this.pickrouteDevices$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(x => this.prdsToRadio(x)));
        this.deviceList$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])(this.priorityCode$, this.pickrouteDevices$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(results => {
            this._originalRoute = this.getOriginalPickRouteForPriorityType(results[0].PickRouteId, results[1]);
            this.pickRoute = this._originalRoute;
            this.priorityCode = results[0].PriorityCode;
            this.routerLinkPickRouteId = this.pickRoute.PickRouteId;
            return this.setDevices(this.pickRoute, results[1]);
        }));
        this.genericErrorTitle$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_TITLE');
        this.genericErrorMessage$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_MESSAGE');
        this.connectToEvents();
    }
    navigateBack() {
        this.wpfActionControllerService.ExecuteBackAction();
    }
    getPickrouteDevices() {
        return this.priorityCodeRouteAssignmentsService.getRoutes().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(prd => {
            return lodash__WEBPACK_IMPORTED_MODULE_3__["orderBy"](prd, (x) => [x.RouteDescription]);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
    }
    getOriginalPickRouteForPriorityType(pickRouteDeviceId, allPickRouteDevices) {
        let pickRouteDevice;
        for (const r of allPickRouteDevices) {
            if (r.PickRouteId === pickRouteDeviceId) {
                pickRouteDevice = r;
                break;
            }
        }
        return pickRouteDevice;
    }
    setDevices(pickRouteDeviceToSet, allPickRouteDevices) {
        let pickRouteDevice;
        for (const r of allPickRouteDevices) {
            if (r.PickRouteId === pickRouteDeviceToSet.PickRouteId) {
                pickRouteDevice = r;
                break;
            }
        }
        const sdl = lodash__WEBPACK_IMPORTED_MODULE_3__["orderBy"](pickRouteDevice.PickRouteDevices, (d => d.SequenceOrder));
        return sdl;
    }
    prdsToRadio(pks) {
        const listMap = new Map();
        pks.map(p => listMap.set(p, p.RouteDescription));
        return listMap;
    }
    pickrouteUpdated(pickroute) {
        this.pickRoute = pickroute;
        this.routerLinkPickRouteId = pickroute.PickRouteId;
        this.canSave = this._originalRoute.PickRouteId !== pickroute.PickRouteId;
    }
    save() {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_10__["PopupWindowProperties"]();
        const data = {
            headerResourceKey: 'SAVE_ROUTE_CHANGES',
            confirmTextboxResourceKey: 'ROUTE_SAVE_BEFORE'
        };
        properties.data = data;
        const component = this.popupWindowService.show(_shared_components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_11__["ConfirmPopupComponent"], properties);
        component.dismiss.subscribe(selectedConfirm => {
            if (selectedConfirm) {
                this.saveInProgress = true;
                this.priorityCodeRouteAssignmentsService.save(this.pickRoute.PickRouteGuid, this.priorityCode)
                    .subscribe(result => this.navigateBack(), error => this.onSaveFailed(error));
            }
        });
    }
    onSaveFailed(error) {
        this.saveInProgress = false;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])(this.genericErrorTitle$, this.genericErrorMessage$).subscribe(r => {
            this.displayError('Generic-Error', r[0], r[1]);
        });
    }
    displayError(uniqueId, title, message) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_10__["PopupDialogProperties"](uniqueId);
        properties.titleElementText = title;
        properties.messageElementText = message;
        properties.showPrimaryButton = true;
        properties.primaryButtonText = 'Ok';
        properties.showSecondaryButton = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_10__["PopupDialogType"].Error;
        properties.timeoutLength = 0;
        this.dialogService.showOnce(properties);
    }
    connectToEvents() {
        this.configureEventHandlers();
        this.coreEventConnectionService.startedSubject.subscribe(() => {
            this.ocsStatusService.requestStatus().subscribe();
        });
    }
    configureEventHandlers() {
        this.coreEventConnectionService.ocsIsHealthySubject
            .subscribe(message => this.setOcsStatus(message));
    }
    setOcsStatus(isHealthy) {
        this.ocsIsHealthy = isHealthy;
    }
};
PriorityCodeRouteAssignmentsPageComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
    { type: _api_core_services_priority_code_route_assignments_service__WEBPACK_IMPORTED_MODULE_1__["PriorityCodeRouteAssignmentsService"] },
    { type: _api_core_services_priority_code_pick_routes_service__WEBPACK_IMPORTED_MODULE_8__["PriorityCodePickRoutesService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_4__["WpfActionControllerService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_10__["PopupDialogService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_10__["PopupWindowService"] },
    { type: _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_13__["CoreEventConnectionService"] },
    { type: _api_core_services_ocs_status_service__WEBPACK_IMPORTED_MODULE_12__["OcsStatusService"] }
];
PriorityCodeRouteAssignmentsPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_5__["Component"])({
        selector: 'app-priority-code-route-assignments-page',
        template: __webpack_require__(/*! raw-loader!./priority-code-route-assignments-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.html"),
        styles: [__webpack_require__(/*! ./priority-code-route-assignments-page.component.scss */ "./src/app/core/priority-code-route-assignments-page/priority-code-route-assignments-page.component.scss")]
    })
], PriorityCodeRouteAssignmentsPageComponent);



/***/ }),

/***/ "./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.scss":
/*!*****************************************************************************************************!*\
  !*** ./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.scss ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3VuZGVyZmlsbGVkLXBpY2tsaXN0LWxpbmVzLXBhZ2UvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvcHJvamVjdHNcXGNwbS1hcHBcXHNyY1xcYXBwXFxjb3JlXFx1bmRlcmZpbGxlZC1waWNrbGlzdC1saW5lcy1wYWdlXFx1bmRlcmZpbGxlZC1waWNrbGlzdC1saW5lcy1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvdW5kZXJmaWxsZWQtcGlja2xpc3QtbGluZXMtcGFnZS91bmRlcmZpbGxlZC1waWNrbGlzdC1saW5lcy1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQ0NKIiwiZmlsZSI6InByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3VuZGVyZmlsbGVkLXBpY2tsaXN0LWxpbmVzLXBhZ2UvdW5kZXJmaWxsZWQtcGlja2xpc3QtbGluZXMtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0e1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbiIsIjpob3N0IHtcbiAgaGVpZ2h0OiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: UnderfilledPicklistLinesPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklistLinesPageComponent", function() { return UnderfilledPicklistLinesPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_core_services_underfilled_picklist_lines_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api-core/services/underfilled-picklist-lines.service */ "./src/app/api-core/services/underfilled-picklist-lines.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _model_underfilled_picklist_line__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/underfilled-picklist-line */ "./src/app/core/model/underfilled-picklist-line.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _api_core_services_underfilled_picklists_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../api-core/services/underfilled-picklists.service */ "./src/app/api-core/services/underfilled-picklists.service.ts");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");









let UnderfilledPicklistLinesPageComponent = class UnderfilledPicklistLinesPageComponent {
    constructor(route, underfilledPicklistsService, underfilledPicklistLinesService, wpfActionControllerService) {
        this.route = route;
        this.underfilledPicklistsService = underfilledPicklistsService;
        this.underfilledPicklistLinesService = underfilledPicklistLinesService;
        this.wpfActionControllerService = wpfActionControllerService;
    }
    ngOnInit() {
        var orderId = this.route.snapshot.queryParamMap.get('orderId');
        this.picklist$ = this.underfilledPicklistsService.getForOrder(orderId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
        this.picklistLines$ = this.underfilledPicklistLinesService.get(orderId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(underfilledPicklistLines => {
            var displayObjects = underfilledPicklistLines.map(l => new _model_underfilled_picklist_line__WEBPACK_IMPORTED_MODULE_4__["UnderfilledPicklistLine"](l));
            var result = lodash__WEBPACK_IMPORTED_MODULE_6__["orderBy"](displayObjects, (x) => [x.DestinationSortValue, x.ItemFormattedGenericName.toLowerCase()]);
            return result;
        }));
    }
    navigateBack() {
        this.wpfActionControllerService.ExecuteBackAction();
    }
};
UnderfilledPicklistLinesPageComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _api_core_services_underfilled_picklists_service__WEBPACK_IMPORTED_MODULE_7__["UnderfilledPicklistsService"] },
    { type: _api_core_services_underfilled_picklist_lines_service__WEBPACK_IMPORTED_MODULE_2__["UnderfilledPicklistLinesService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_8__["WpfActionControllerService"] }
];
UnderfilledPicklistLinesPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-underfilled-picklist-lines-page',
        template: __webpack_require__(/*! raw-loader!./underfilled-picklist-lines-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.html"),
        styles: [__webpack_require__(/*! ./underfilled-picklist-lines-page.component.scss */ "./src/app/core/underfilled-picklist-lines-page/underfilled-picklist-lines-page.component.scss")]
    })
], UnderfilledPicklistLinesPageComponent);



/***/ }),

/***/ "./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3VuZGVyZmlsbGVkLXBpY2tsaXN0LWxpbmVzL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcY29yZVxcdW5kZXJmaWxsZWQtcGlja2xpc3QtbGluZXNcXHVuZGVyZmlsbGVkLXBpY2tsaXN0LWxpbmVzLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvdW5kZXJmaWxsZWQtcGlja2xpc3QtbGluZXMvdW5kZXJmaWxsZWQtcGlja2xpc3QtbGluZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxPQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxlQUFBO0FDRUYiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvdW5kZXJmaWxsZWQtcGlja2xpc3QtbGluZXMvdW5kZXJmaWxsZWQtcGlja2xpc3QtbGluZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZmxleDogMTtcclxufVxyXG46aG9zdCA6Om5nLWRlZXAgb2MtZ3JpZHtcclxuICBmb250LXNpemU6IDIycHg7XHJcbn0iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXg6IDE7XG59XG5cbjpob3N0IDo6bmctZGVlcCBvYy1ncmlkIHtcbiAgZm9udC1zaXplOiAyMnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: UnderfilledPicklistLinesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklistLinesComponent", function() { return UnderfilledPicklistLinesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/window-service */ "./src/app/shared/services/window-service.ts");
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





let UnderfilledPicklistLinesComponent = class UnderfilledPicklistLinesComponent {
    constructor(windowService) {
        this.windowService = windowService;
        this.descriptionPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('DescriptionSortValue');
        this.destinationPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('DestinationSortValue');
        this.qtyFillReqPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('FillQuantity');
        this.fillDatePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_3__["nameof"])('FillDate');
    }
    set picklistLines(value) {
        this._picklistLines = value;
        if (this.windowService.nativeWindow) {
            this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
    }
    get picklistLines() {
        return this._picklistLines;
    }
    columnSelected(event) {
        this.currentSortPropertyName = event.ColumnPropertyName;
        this.picklistLines = lodash__WEBPACK_IMPORTED_MODULE_4__["orderBy"](this._picklistLines, x => x[this.currentSortPropertyName], event.SortDirection);
    }
};
UnderfilledPicklistLinesComponent.ctorParameters = () => [
    { type: _shared_services_window_service__WEBPACK_IMPORTED_MODULE_2__["WindowService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('picklistLines')
], UnderfilledPicklistLinesComponent.prototype, "picklistLines", null);
UnderfilledPicklistLinesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-underfilled-picklist-lines',
        template: __webpack_require__(/*! raw-loader!./underfilled-picklist-lines.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.html"),
        styles: [__webpack_require__(/*! ./underfilled-picklist-lines.component.scss */ "./src/app/core/underfilled-picklist-lines/underfilled-picklist-lines.component.scss")]
    })
], UnderfilledPicklistLinesComponent);



/***/ }),

/***/ "./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3VuZGVyZmlsbGVkLXBpY2tsaXN0cy1wYWdlL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcY29yZVxcdW5kZXJmaWxsZWQtcGlja2xpc3RzLXBhZ2VcXHVuZGVyZmlsbGVkLXBpY2tsaXN0cy1wYWdlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvdW5kZXJmaWxsZWQtcGlja2xpc3RzLXBhZ2UvdW5kZXJmaWxsZWQtcGlja2xpc3RzLXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0FDQ0oiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvdW5kZXJmaWxsZWQtcGlja2xpc3RzLXBhZ2UvdW5kZXJmaWxsZWQtcGlja2xpc3RzLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdHtcclxuICAgIGhlaWdodDoxMDAlO1xyXG59IiwiOmhvc3Qge1xuICBoZWlnaHQ6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: UnderfilledPicklistsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklistsPageComponent", function() { return UnderfilledPicklistsPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_core_services_underfilled_picklists_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api-core/services/underfilled-picklists.service */ "./src/app/api-core/services/underfilled-picklists.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _model_underfilled_picklist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/underfilled-picklist */ "./src/app/core/model/underfilled-picklist.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");







let UnderfilledPicklistsPageComponent = class UnderfilledPicklistsPageComponent {
    constructor(underfilledPicklistsService, locale, translateService) {
        this.underfilledPicklistsService = underfilledPicklistsService;
        this.locale = locale;
        this._itemsResourceKey = 'ITEMS';
        this._patientsResourceKey = 'PATIENTS';
        this._cabinetsResourceKey = 'CABINETS';
        this.translatedItems$ = translateService.get(this._itemsResourceKey);
        this.translatedPatients$ = translateService.get(this._patientsResourceKey);
        this.translatedCabinets$ = translateService.get(this._cabinetsResourceKey);
    }
    ngOnInit() {
        var picklists$ = this.underfilledPicklistsService.get();
        this.picklists = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(picklists$, this.translatedItems$, this.translatedPatients$, this.translatedCabinets$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(results => {
            var underfilledPicklists = results[0];
            var translatedItems = results[1];
            var translatedPatients = results[2];
            var translatedCabinets = results[3];
            var displayObjects = underfilledPicklists.map(p => new _model_underfilled_picklist__WEBPACK_IMPORTED_MODULE_5__["UnderfilledPicklist"](p, this.locale, translatedItems, translatedPatients, translatedCabinets));
            var sorted = displayObjects.sort(function (a, b) {
                if (a.SequenceOrder < b.SequenceOrder)
                    return -1;
                if (a.SequenceOrder > b.SequenceOrder)
                    return 1;
                if (a.CompletedDate > b.CompletedDate)
                    return -1;
                if (a.CompletedDate < b.CompletedDate)
                    return 1;
                return 0;
            });
            return sorted;
        }));
    }
};
UnderfilledPicklistsPageComponent.ctorParameters = () => [
    { type: _api_core_services_underfilled_picklists_service__WEBPACK_IMPORTED_MODULE_2__["UnderfilledPicklistsService"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"],] }] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] }
];
UnderfilledPicklistsPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-underfilled-picklists-page',
        template: __webpack_require__(/*! raw-loader!./underfilled-picklists-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.html"),
        styles: [__webpack_require__(/*! ./underfilled-picklists-page.component.scss */ "./src/app/core/underfilled-picklists-page/underfilled-picklists-page.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"]))
], UnderfilledPicklistsPageComponent);



/***/ }),

/***/ "./src/app/core/underfilled-picklists/underfilled-picklists.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/core/underfilled-picklists/underfilled-picklists.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n\n:host ::ng-deep oc-search-box {\n  width: 358px !important;\n  margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9jb3JlL3VuZGVyZmlsbGVkLXBpY2tsaXN0cy9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9wcm9qZWN0c1xcY3BtLWFwcFxcc3JjXFxhcHBcXGNvcmVcXHVuZGVyZmlsbGVkLXBpY2tsaXN0c1xcdW5kZXJmaWxsZWQtcGlja2xpc3RzLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvdW5kZXJmaWxsZWQtcGlja2xpc3RzL3VuZGVyZmlsbGVkLXBpY2tsaXN0cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxPQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSx1QkFBQTtFQUNBLGtCQUFBO0FDQ0YiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL2NvcmUvdW5kZXJmaWxsZWQtcGlja2xpc3RzL3VuZGVyZmlsbGVkLXBpY2tsaXN0cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0e1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZmxleDogMTtcclxufVxyXG5cclxuOmhvc3QgOjpuZy1kZWVwIG9jLWdyaWR7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgb2Mtc2VhcmNoLWJveHtcclxuICB3aWR0aDogMzU4cHggIWltcG9ydGFudDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn0iLCI6aG9zdCB7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMTtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIG9jLWdyaWQge1xuICBmb250LXNpemU6IDIycHg7XG59XG5cbjpob3N0IDo6bmctZGVlcCBvYy1zZWFyY2gtYm94IHtcbiAgd2lkdGg6IDM1OHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/core/underfilled-picklists/underfilled-picklists.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/core/underfilled-picklists/underfilled-picklists.component.ts ***!
  \*******************************************************************************/
/*! exports provided: UnderfilledPicklistsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnderfilledPicklistsComponent", function() { return UnderfilledPicklistsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/window-service */ "./src/app/shared/services/window-service.ts");
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);








let UnderfilledPicklistsComponent = class UnderfilledPicklistsComponent {
    constructor(windowService, wpfActionControllerService) {
        this.windowService = windowService;
        this.wpfActionControllerService = wpfActionControllerService;
        this.searchFields = [
            Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('DescriptionSearchValue'),
            Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('DesintationSearchValue'),
            Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('DateSearchValue'),
            Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('PriorityDescription'),
            Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('OrderId'),
        ];
        this.sequencePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('SequenceOrder');
        this.orderPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('OrderId');
        this.typePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('PriorityDescription');
        this.descriptionPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('DescriptionSearchValue');
        this.destinationPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('DesintationSearchValue');
        this.datePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_4__["nameof"])('CompletedDate');
    }
    set picklists(value) {
        this._picklists = value;
        if (this.windowService.nativeWindow) {
            this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
    }
    get picklists() {
        return this._picklists;
    }
    ngAfterViewInit() {
        this.searchElement.searchOutput$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])((searchData) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(searchData);
        }))
            .subscribe(data => {
            this.searchTextFilter = data;
            if (this.windowService.nativeWindow) {
                this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
            }
        });
    }
    navigate(orderId) {
        this.wpfActionControllerService.ExecuteContinueNavigationAction(`picklists/underfilled/picklistLines`, { orderId: orderId });
    }
    columnSelected(event) {
        this.currentSortPropertyName = event.ColumnPropertyName;
        this.picklists = lodash__WEBPACK_IMPORTED_MODULE_7__["orderBy"](this._picklists, x => x[this.currentSortPropertyName], event.SortDirection);
    }
};
UnderfilledPicklistsComponent.ctorParameters = () => [
    { type: _shared_services_window_service__WEBPACK_IMPORTED_MODULE_3__["WindowService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_2__["WpfActionControllerService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBox', {
        static: true
    })
], UnderfilledPicklistsComponent.prototype, "searchElement", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UnderfilledPicklistsComponent.prototype, "picklists", null);
UnderfilledPicklistsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-underfilled-picklists',
        template: __webpack_require__(/*! raw-loader!./underfilled-picklists.component.html */ "../../node_modules/raw-loader/index.js!./src/app/core/underfilled-picklists/underfilled-picklists.component.html"),
        styles: [__webpack_require__(/*! ./underfilled-picklists.component.scss */ "./src/app/core/underfilled-picklists/underfilled-picklists.component.scss")]
    })
], UnderfilledPicklistsComponent);



/***/ }),

/***/ "./src/app/core/utilities/picklist-description-helper.ts":
/*!***************************************************************!*\
  !*** ./src/app/core/utilities/picklist-description-helper.ts ***!
  \***************************************************************/
/*! exports provided: PicklistDescriptionHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistDescriptionHelper", function() { return PicklistDescriptionHelper; });
/* harmony import */ var _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./picklist-type-helper */ "./src/app/core/utilities/picklist-type-helper.ts");

class PicklistDescriptionHelper {
    static DisplayGenericName(itemCount, picklistTypeDb, priorityCode) {
        return (_picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount == 1) || _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsStockOut(picklistTypeDb);
    }
    static DisplayItemCount(itemCount, picklistTypeDb, priorityCode) {
        return _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount > 1;
    }
    static DisplayBrandName(itemCount, picklistTypeDb, priorityCode) {
        return _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount == 1;
    }
}


/***/ }),

/***/ "./src/app/core/utilities/picklist-destination-description-helper.ts":
/*!***************************************************************************!*\
  !*** ./src/app/core/utilities/picklist-destination-description-helper.ts ***!
  \***************************************************************************/
/*! exports provided: PicklistDestinationDescriptionHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistDestinationDescriptionHelper", function() { return PicklistDestinationDescriptionHelper; });
/* harmony import */ var _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./picklist-type-helper */ "./src/app/core/utilities/picklist-type-helper.ts");

class PicklistDestinationDescriptionHelper {
    static DisplayPatientCount(patientCount, picklistTypeDb) {
        return _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrder(picklistTypeDb) && patientCount > 1;
    }
    static DisplayPatientRoomAndArea(patientCount, picklistTypeDb, patientRoom, area) {
        return _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrder(picklistTypeDb) && patientCount == 1 && !!patientRoom && !!area;
    }
    static DisplayPatientRoom(patientCount, picklistTypeDb, patientRoom, area) {
        return _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrder(picklistTypeDb) && patientCount == 1 && !!patientRoom && !area;
    }
    static DisplayMultiDestination(destinationCount, picklistTypeDb) {
        return !_picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrder(picklistTypeDb) && this.IsMultiDestination(destinationCount);
    }
    static DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area) {
        return this.DisplayPatientArea(patientCount, picklistTypeDb, patientRoom, area) ||
            this.DisplayGenericArea(destinationCount, picklistTypeDb, priorityCode);
    }
    static DisplayOmniName(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area) {
        return this.DisplayOmniNameFirstLine(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area) ||
            this.DisplayOmniNameSecondLine(destinationCount, picklistTypeDb, priorityCode);
    }
    static DisplayPatientNameSecondLine(destinationCount, picklistTypeDb, priorityCode) {
        return destinationCount <= 1 && !_picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsManualDispense(picklistTypeDb, priorityCode);
    }
    static DisplayPatientArea(patientCount, picklistTypeDb, patientRoom, area) {
        return _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrder(picklistTypeDb) && patientCount == 1 && !patientRoom && !!area;
    }
    static DisplayGenericArea(destinationCount, picklistTypeDb, priorityCode) {
        return !_picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsPatientMedOrder(picklistTypeDb) && !this.IsMultiDestination(destinationCount) &&
            (_picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsStockOut(picklistTypeDb) || _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsManualDispense(picklistTypeDb, priorityCode) || _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsSelectiveRestock(picklistTypeDb, priorityCode));
    }
    static IsMultiDestination(destinationCount) {
        return destinationCount > 1;
    }
    static DisplayOmniNameFirstLine(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area) {
        return !this.DisplayPatientCount(patientCount, picklistTypeDb) &&
            !this.DisplayPatientRoomAndArea(patientCount, picklistTypeDb, patientRoom, area) &&
            !this.DisplayPatientRoom(patientCount, picklistTypeDb, patientRoom, area) &&
            !this.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area) &&
            !this.DisplayMultiDestination(destinationCount, picklistTypeDb);
    }
    static DisplayOmniNameSecondLine(destinationCount, picklistTypeDb, priorityCode) {
        return destinationCount <= 1 && _picklist_type_helper__WEBPACK_IMPORTED_MODULE_0__["PicklistTypeHelper"].IsManualDispense(picklistTypeDb, priorityCode);
    }
}


/***/ }),

/***/ "./src/app/core/utilities/picklist-type-helper.ts":
/*!********************************************************!*\
  !*** ./src/app/core/utilities/picklist-type-helper.ts ***!
  \********************************************************/
/*! exports provided: PicklistTypeHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistTypeHelper", function() { return PicklistTypeHelper; });
/* harmony import */ var _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/restock-types */ "./src/app/core/constants/restock-types.ts");
/* harmony import */ var _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/dispense-priority-codes */ "./src/app/core/constants/dispense-priority-codes.ts");


class PicklistTypeHelper {
    static IsManualDispense(picklistTypeDb, priorityCode) {
        return picklistTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].DispenseToDestination
            && (priorityCode == _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__["DispensePriorityCodes"].Area || priorityCode == _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__["DispensePriorityCodes"].Cabinet
                || priorityCode == _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__["DispensePriorityCodes"].Patient ||
                priorityCode == _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__["DispensePriorityCodes"].RemoteOrder);
    }
    static IsPatientMedOrderOrManualDispense(picklistTypeDb, priorityCode) {
        return this.IsPatientMedOrder(picklistTypeDb) || this.IsManualDispense(picklistTypeDb, priorityCode);
    }
    static IsPatientMedOrder(pickListTypeDb) {
        return pickListTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].PatientMedOrder;
    }
    static IsSelectiveRestock(picklistTypeDb, priorityCode) {
        return picklistTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].SelectiveRestock
            && priorityCode != _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__["DispensePriorityCodes"].Cabinet
            && priorityCode != _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__["DispensePriorityCodes"].Area;
    }
    static IsCabinetRestock(picklistTypeDb, priorityCode) {
        return picklistTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].NormalRestock
            || picklistTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].StockOut
            || picklistTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].CriticalLowRestock
            || this.IsSelectiveRestock(picklistTypeDb, priorityCode);
    }
    static IsNormalCabinetRestock(picklistTypeDb, priorityCode) {
        return picklistTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].NormalRestock && priorityCode == _constants_dispense_priority_codes__WEBPACK_IMPORTED_MODULE_1__["DispensePriorityCodes"].Normal;
    }
    static IsStockOut(picklistTypeDb) {
        return picklistTypeDb == _constants_restock_types__WEBPACK_IMPORTED_MODULE_0__["RestockTypes"].StockOut;
    }
}


/***/ }),

/***/ "./src/app/shared/components/col-header-sortable/col-header-sortable.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/col-header-sortable/col-header-sortable.component.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".headertext {\n  float: left;\n}\n\n.headericon {\n  position: relative;\n  left: 15px;\n  top: 3px;\n  float: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9jb2wtaGVhZGVyLXNvcnRhYmxlL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcc2hhcmVkXFxjb21wb25lbnRzXFxjb2wtaGVhZGVyLXNvcnRhYmxlXFxjb2wtaGVhZGVyLXNvcnRhYmxlLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2NvbC1oZWFkZXItc29ydGFibGUvY29sLWhlYWRlci1zb3J0YWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0FDQ0YiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2NvbC1oZWFkZXItc29ydGFibGUvY29sLWhlYWRlci1zb3J0YWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJ0ZXh0e1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4uaGVhZGVyaWNvbntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMTVweDtcclxuICB0b3A6IDNweDtcclxuICBmbG9hdDogbGVmdDtcclxufSIsIi5oZWFkZXJ0ZXh0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5oZWFkZXJpY29uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAxNXB4O1xuICB0b3A6IDNweDtcbiAgZmxvYXQ6IGxlZnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/shared/components/col-header-sortable/col-header-sortable.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/col-header-sortable/col-header-sortable.component.ts ***!
  \****************************************************************************************/
/*! exports provided: ColHeaderSortableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColHeaderSortableComponent", function() { return ColHeaderSortableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/sort-direction */ "./src/app/shared/constants/sort-direction.ts");




let ColHeaderSortableComponent = class ColHeaderSortableComponent {
    constructor() {
        this.columnSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.sortDirection = _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].ascending;
        this.sample = this.currentSortPropertyName;
    }
    get IsSortAscending() {
        this.sortDirection = this.customColumnSortOrder && this.customColumnSortOrder === _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].descending ? this.customColumnSortOrder : this.sortDirection;
        return this.sortDirection == _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].ascending;
    }
    get IsSortDescending() {
        this.sortDirection = this.customColumnSortOrder && this.customColumnSortOrder === _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].descending ? this.customColumnSortOrder : this.sortDirection;
        return this.sortDirection == _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].descending;
    }
    ngOnInit() {
    }
    headerClicked($event) {
        var targetClasses = $event.target.classList;
        if (targetClasses.contains('resize')) {
            return;
        }
        if (this.currentSortPropertyName == this.columnPropertyName) {
            this.sortDirection = this.sortDirection == _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].ascending ? _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].descending : _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].ascending;
        }
        else {
            this.sortDirection = _constants_sort_direction__WEBPACK_IMPORTED_MODULE_2__["SortDirection"].ascending;
        }
        this.columnSelected.emit({
            ColumnPropertyName: this.columnPropertyName,
            SortDirection: this.sortDirection
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ColHeaderSortableComponent.prototype, "currentSortPropertyName", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ColHeaderSortableComponent.prototype, "headerResourceKey", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ColHeaderSortableComponent.prototype, "columnPropertyName", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ColHeaderSortableComponent.prototype, "customColumnSortOrder", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ColHeaderSortableComponent.prototype, "columnSelected", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])("click", ['$event'])
], ColHeaderSortableComponent.prototype, "headerClicked", null);
ColHeaderSortableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: '[app-col-header-sortable]',
        template: __webpack_require__(/*! raw-loader!./col-header-sortable.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/col-header-sortable/col-header-sortable.component.html"),
        styles: [__webpack_require__(/*! ./col-header-sortable.component.scss */ "./src/app/shared/components/col-header-sortable/col-header-sortable.component.scss")]
    })
], ColHeaderSortableComponent);



/***/ }),

/***/ "./src/app/shared/components/confirm-popup/confirm-popup.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/confirm-popup/confirm-popup.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n:host ::ng-deep .ocwindowcontent {\n  padding: 15px;\n  font-size: 14pt;\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9jb25maXJtLXBvcHVwL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcc2hhcmVkXFxjb21wb25lbnRzXFxjb25maXJtLXBvcHVwXFxjb25maXJtLXBvcHVwLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2NvbmZpcm0tcG9wdXAvY29uZmlybS1wb3B1cC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVFQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDRUYiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2NvbmZpcm0tcG9wdXAvY29uZmlybS1wb3B1cC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0e1xyXG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsXCJIZWx2ZXRpY2EgTmV1ZVwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xyXG59XHJcbjpob3N0IDo6bmctZGVlcCAub2N3aW5kb3djb250ZW50IHtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIGZvbnQtc2l6ZTogMTRwdDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbiIsIjpob3N0IHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLm9jd2luZG93Y29udGVudCB7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGZvbnQtc2l6ZTogMTRwdDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/confirm-popup/confirm-popup.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/confirm-popup/confirm-popup.component.ts ***!
  \****************************************************************************/
/*! exports provided: ConfirmPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmPopupComponent", function() { return ConfirmPopupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");



let ConfirmPopupComponent = class ConfirmPopupComponent {
    constructor() {
        this.dismiss = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    ngOnInit() {
    }
    cancel() {
        this.dismiss.next(false);
    }
    continue() {
        this.dismiss.next(true);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ConfirmPopupComponent.prototype, "dismiss", void 0);
ConfirmPopupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-confirm-popup',
        template: __webpack_require__(/*! raw-loader!./confirm-popup.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/confirm-popup/confirm-popup.component.html"),
        styles: [__webpack_require__(/*! ./confirm-popup.component.scss */ "./src/app/shared/components/confirm-popup/confirm-popup.component.scss")]
    })
], ConfirmPopupComponent);



/***/ }),

/***/ "./src/app/shared/components/device-location-access/device-location-access.component.scss":
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/device-location-access/device-location-access.component.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\n::-webkit-input-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n:-moz-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n::-moz-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n:-ms-input-placeholder {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextboxwrapper {\n  position: relative;\n  display: block;\n}\n\n.octextboxwrapper span {\n  position: absolute;\n  top: 7px;\n  left: 7px;\n}\n\n.octextboxwrapper .ocinput {\n  position: relative;\n  box-sizing: border-box;\n  margin: 0;\n  overflow: visible;\n  display: block;\n  line-height: 1.5;\n  background-clip: padding-box;\n  border: 1px solid #5E6A71;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #333;\n  border-radius: 4px;\n  background-color: #fff;\n  height: 50px;\n  font-size: 18px;\n  padding: 0.375rem 0.375rem 0.375rem 9px;\n  width: 100%;\n}\n\n.octextboxwrapper .ocinput.ocinputmask {\n  font-family: \"omniasterisk\";\n  font-style: normal;\n  font-weight: normal;\n}\n\n.octextboxwrapper .ocinput.hasIcon {\n  padding: 0.375rem 9px 0.375rem 50px;\n}\n\n.octextboxwrapper .ocinput:focus {\n  background-color: #fff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.octextboxwrapper .ocinput:hover {\n  box-shadow: none;\n}\n\n.octextboxwrapper .ocinput:focus {\n  border-color: #5E6A71 !important;\n  box-shadow: none;\n}\n\n.octextboxwrapper .ocinput:disabled {\n  background-color: #f2f2f2;\n}\n\n.octextboxwrapper .ocinput.ng-invalid {\n  border: 1px solid red;\n}\n\n.octextboxwrapper .ocinput span {\n  position: absolute;\n  display: inline-block;\n  top: 7px;\n  background-color: #fff;\n}\n\n.octextboxwrapper .logon {\n  width: 400px;\n  height: 60px;\n  font-size: 22px;\n}\n\n@media only screen and (min-width: 768px) and (max-width: 1024px) {\n  .octextboxwrapper .ocinput {\n    font-size: 16px;\n  }\n}\n\n.octextareawrapper {\n  box-sizing: border-box;\n  display: block;\n  width: 100%;\n  padding: 1px;\n  line-height: 1.25;\n  color: #333;\n  background-color: #fff;\n  margin: 0;\n  overflow: auto;\n  outline: none;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\n.octextareawrapper .resize {\n  resize: none;\n}\n\n.octextareawrapper .octextarea {\n  resize: none;\n  box-sizing: border-box;\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 18px;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-family: inherit;\n  line-height: 1.25;\n  color: #333;\n  background-color: #fff;\n  margin: 0;\n  overflow: auto;\n  overflow-x: hidden;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  -ms-word-wrap: break-word;\n  word-break: break-all;\n  -ms-word-break: break-all;\n  border: 1px solid #5E6A71;\n  border-radius: 4px;\n  outline: none;\n}\n\n.octextareawrapper .octextarea:focus {\n  border-color: #5E6A71 !important;\n  box-shadow: none;\n}\n\n.octextareawrapper .octextarea:disabled {\n  cursor: default;\n  opacity: 1;\n  background-color: #f2f2f2;\n}\n\n.octextareawrapper .octextarea::-webkit-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-ms-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-webkit-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea:-ms-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea:-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.octextareawrapper .octextarea::-moz-placeholder {\n  font-style: italic;\n}\n\n.octextareawrapper .octextarea.ng-invalid {\n  border-color: red;\n}\n\n.action-button-container oc-button-action {\n  padding-right: 30px;\n}\n\n.flex-row .filter-control, .flex-row .filter-control-align-right {\n  padding-right: 30px;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n\n.flex-column .filter-control, .flex-column .filter-control-align-right {\n  padding-bottom: 20px;\n  flex-grow: 0;\n  flex-shrink: 0;\n  max-width: 100%;\n}\n\n.flex-column .filter-control.group-padding, .flex-column .filter-control-align-right.group-padding {\n  padding-bottom: 40px;\n}\n\n@media only screen and (max-width: 1024px) {\n  .action-button-container oc-button-action {\n    padding-right: 20px;\n  }\n\n  .filter-container .filter-control {\n    padding-right: 20px;\n  }\n}\n\n.daterangeinput {\n  display: inline-flex;\n  border: 1px solid #5E6A71;\n  background-clip: padding-box;\n  border-radius: 4px;\n  padding: 0.375rem 9px 0.375rem 9px;\n  color: #333;\n  background-color: #fff;\n  line-height: 1.5;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  width: 320px;\n}\n\n.daterangeinput *, .daterangeinput *::before, .daterangeinput *::after {\n  box-sizing: border-box;\n  zoom: 1;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.daterangeinput input:focus {\n  outline: none;\n}\n\n.daterangeinput input::-ms-clear {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n.daterangeinput ::-webkit-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput :-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput ::-moz-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput :-ms-input-placeholder {\n  font-style: italic;\n  color: #999 !important;\n}\n\n.daterangeinput [type=number]::-webkit-inner-spin-button,\n.daterangeinput [type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.daterangeinput .pointer {\n  cursor: pointer;\n}\n\n.daterangeinput [type=date]::-webkit-inner-spin-button {\n  display: none;\n}\n\n.daterangeinput [type=date]::-webkit-calendar-picker-indicator {\n  display: none;\n}\n\n.daterangeinput.invalid {\n  border-color: #C80819;\n}\n\n.daterangeinput input {\n  margin: 0;\n  padding: 0;\n  border: none;\n  font-size: 22px;\n  width: 100%;\n}\n\n.daterangeinput input.invalid {\n  color: #C70719;\n}\n\n.daterangeinput label {\n  font-size: 12px;\n}\n\n.daterangeinput .start, .daterangeinput .end {\n  display: flex;\n  flex: 1;\n}\n\n.daterangeinput .start .group, .daterangeinput .end .group {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n.oc-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  text-transform: none;\n  width: 1px;\n}\n\n.arrow-down {\n  position: relative;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-top: 8px solid #fff;\n  top: 16px;\n  left: 18px;\n}\n\n.arrow-up {\n  position: relative;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 8px solid #fff;\n  top: -15px;\n  left: 18px;\n}\n\n.flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.flex-col-center {\n  justify-content: center;\n}\n\n.flex-align-center {\n  align-items: center;\n}\n\n.column {\n  flex-direction: column;\n}\n\n.hidden {\n  display: none;\n}\n\n.ht-100 {\n  height: 100%;\n}\n\n:host {\n  display: block;\n}\n\n:host::ng-deep button {\n  border-radius: 5px !important;\n  min-width: 100px !important;\n}\n\n:host::ng-deep oc-svgicon {\n  left: auto !important;\n}\n\n.st0 {\n  fill: #FFFFFF;\n}\n\n.st1 {\n  fill: #6699CC;\n}\n\n.ocbtn:disabled {\n  pointer-events: none;\n}\n\n.ocbtn {\n  line-height: 1.5;\n  position: relative;\n  cursor: pointer;\n  box-sizing: border-box;\n  pointer-events: auto;\n  outline: none;\n  color: #fff;\n  border: none;\n  overflow: hidden;\n  min-width: 160px;\n  margin: 0;\n  height: 50px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-left: 25px;\n  padding-right: 25px;\n  display: inline-flex;\n  justify-content: center;\n  font-weight: 500;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 20px;\n  text-align: center;\n  white-space: nowrap;\n  align-items: center;\n  -webkit-appearance: none;\n}\n\n.ocbtn oc-svgicon {\n  display: inline-block;\n  position: absolute;\n  top: 13px;\n  line-height: 1;\n}\n\n.ocbtn:disabled {\n  cursor: default;\n  opacity: 0.4;\n  color: #cccccc;\n}\n\n.secondary {\n  border-radius: 5px;\n  background-color: #69c;\n}\n\n.secondary.iconOnly {\n  border-radius: 25px;\n  min-width: 50px;\n}\n\n.secondary oc-svgicon {\n  left: 10px;\n}\n\n.repositionicon {\n  height: 40px;\n  width: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9kZXZpY2UtbG9jYXRpb24tYWNjZXNzL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcc2hhcmVkXFxjb21wb25lbnRzXFxkZXZpY2UtbG9jYXRpb24tYWNjZXNzXFxkZXZpY2UtbG9jYXRpb24tYWNjZXNzLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2RldmljZS1sb2NhdGlvbi1hY2Nlc3MvZGV2aWNlLWxvY2F0aW9uLWFjY2Vzcy5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9kZXZpY2UtbG9jYXRpb24tYWNjZXNzL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L25vZGVfbW9kdWxlc1xcQG9tbmljZWxsXFx3ZWJjb3JlY29tcG9uZW50c1xcbGliXFxzdHlsZXNcXHRleHRib3guc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9kZXZpY2UtbG9jYXRpb24tYWNjZXNzL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L25vZGVfbW9kdWxlc1xcQG9tbmljZWxsXFx3ZWJjb3JlY29tcG9uZW50c1xcbGliXFxzdHlsZXNcXHRleHRhcmVhLnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZGV2aWNlLWxvY2F0aW9uLWFjY2Vzcy9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9ub2RlX21vZHVsZXNcXEBvbW5pY2VsbFxcd2ViY29yZWNvbXBvbmVudHNcXGxpYlxcc3R5bGVzXFxmaWx0ZXItYXJlYS5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2RldmljZS1sb2NhdGlvbi1hY2Nlc3MvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvbm9kZV9tb2R1bGVzXFxAb21uaWNlbGxcXHdlYmNvcmVjb21wb25lbnRzXFxsaWJcXHN0eWxlc1xcZGF0ZXJhbmdlLnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZGV2aWNlLWxvY2F0aW9uLWFjY2Vzcy9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9ub2RlX21vZHVsZXNcXEBvbW5pY2VsbFxcd2ViY29yZWNvbXBvbmVudHNcXGxpYlxcc3R5bGVzXFxzdHlsZXMuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9kZXZpY2UtbG9jYXRpb24tYWNjZXNzL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3N0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCQTtFQUNFLGFBQUE7QUM1QkY7O0FEOEJBO0VBQ0UsT0FBQTtBQzNCRjs7QUQ2QkE7RUFDRSxzQkFBQTtBQzFCRjs7QUNWQTtFQUNJLDZFQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBRGFKOztBQ1hDO0VBQ0csNkVBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FEY0o7O0FDWkM7RUFDRyw2RUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QURlSjs7QUNiQztFQUNHLDZFQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBRGdCSjs7QUNiQTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtBRGdCSjs7QUNkSTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QURnQlI7O0FDYkk7RUFDSSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBRUEsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSx5QkFBQTtFQUNBLHdFQUFBO0VBRUEsV0YxQks7RUUyQkwsa0JGNUNRO0VFNkNSLHNCQUFBO0VBRUEsWUFBQTtFQUNBLGVGeEJTO0VFeUJULHVDQUFBO0VBQ0EsV0FBQTtBRFlSOztBQ1ZJO0VBQ0ksMkJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FEWVI7O0FDVkk7RUFDSSxtQ0FBQTtBRFlSOztBQ1RJO0VBQ0ksc0JBQUE7RUFDQSxVQUFBO0VBQ0EsZ0RBQUE7QURXUjs7QUNUSTtFQUNJLGdCQUFBO0FEV1I7O0FDUkk7RUFDSSxnQ0FBQTtFQUNBLGdCQUFBO0FEVVI7O0FDUEk7RUFDSSx5QkZ0QmU7QUMrQnZCOztBQ05JO0VBQ0kscUJBQUE7QURRUjs7QUNMSTtFQUNJLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxRQUFBO0VBQ0Esc0JBQUE7QURPUjs7QUNKSTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZUZ2RVU7QUM2RWxCOztBQ0hJO0VBQ0k7SUFDSSxlRnpFTTtFQzhFaEI7QUFDRjs7QUV4R0E7RUFDRSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsV0hXVztFR1ZYLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0Esd0VBQUE7QUYyR0Y7O0FFekdFO0VBQ0UsWUFBQTtBRjJHSjs7QUV4R0U7RUFDRSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsZUhDYTtFR0FiLDZFSExxQjtFR01yQixvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0hWUztFR1dULHNCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCSHRDWTtFR3VDWixhQUFBO0FGMEdKOztBRXhHRTtFQUNFLGdDQUFBO0VBQ0EsZ0JBQUE7QUYwR0o7O0FFeEdFO0VBQ0UsZUFBQTtFQUNBLFVBQUE7RUFDQSx5QkhNbUI7QUNvR3ZCOztBRXhHRTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7QUYwR0o7O0FFNUdFO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtBRjBHSjs7QUU1R0U7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FGMEdKOztBRTVHRTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7QUYwR0o7O0FFeEdFO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtBRjBHSjs7QUV4R0U7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FGMEdKOztBRXhHRTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7QUYwR0o7O0FFeEdFO0VBQ0Usa0JBQUE7QUYwR0o7O0FFeEdFO0VBQ0UsaUJIZjRCO0FDeUhoQzs7QUcvS0U7RUFDRSxtQkFBQTtBSGtMSjs7QUc5S0E7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FIaUxKOztBRzFLQTtFQUNFLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FINktGOztBR3hLRTtFQUNFLG9CQUFBO0FIMEtKOztBR3JLQTtFQUVJO0lBQ0UsbUJBQUE7RUh1S0o7O0VHbktBO0lBQ0UsbUJBQUE7RUhzS0Y7QUFDRjs7QUk5TUE7RUE0Q0Usb0JBQUE7RUFDQSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQ0FBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNkVMakN1QjtFS2tDdkIsWUFBQTtBSnFLRjs7QUl6TkU7RUFDRSxzQkFBQTtFQUNBLE9BQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO01BQUEscUJBQUE7VUFBQSxpQkFBQTtBSjJOSjs7QUl6TkU7RUFDRSxhQUFBO0FKMk5KOztBSXpORTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtBSjJOSjs7QUl6TkU7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FKMk5KOztBSXpORTtFQUNJLGtCQUFBO0VBQ0Esc0JBQUE7QUoyTk47O0FJek5FO0VBQ0ksa0JBQUE7RUFDQSxzQkFBQTtBSjJOTjs7QUl6TkU7RUFDSSxrQkFBQTtFQUNBLHNCQUFBO0FKMk5OOztBSXpORTs7RUFFRSx3QkFBQTtFQUNBLFNBQUE7QUoyTko7O0FJek5FO0VBQ0UsZUFBQTtBSjJOSjs7QUl6TkU7RUFDRSxhQUFBO0FKMk5KOztBSXpORTtFQUNFLGFBQUE7QUoyTko7O0FJL01FO0VBQ0UscUJMOUNZO0FDK1BoQjs7QUkvTUU7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBSmlOSjs7QUloTkk7RUFDRSxjTHBDVTtBQ3NQaEI7O0FJL01FO0VBQ0UsZUFBQTtBSmlOSjs7QUkvTUU7RUFDRSxhQUFBO0VBQ0EsT0FBQTtBSmlOSjs7QUloTkk7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxPQUFBO0FKa05OOztBS3hSQTtFQUNFLFNBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLFVBQUE7QUwyUkY7O0FLeFJBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGtDQUFBO0VBQ0EsbUNBQUE7RUFFQSwwQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FMMFJGOztBS3hSQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBRUEsNkJBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtBTDBSRjs7QUt0UkE7RUFDRSxhQUFBO0FMeVJGOztBS3ZSQTtFQUNFLE9BQUE7QUwwUkY7O0FLeFJBO0VBQ0UsdUJBQUE7QUwyUkY7O0FLelJBO0VBQ0UsbUJBQUE7QUw0UkY7O0FLMVJBO0VBQ0Usc0JBQUE7QUw2UkY7O0FLM1JBO0VBQ0ksYUFBQTtBTDhSSjs7QUs1UkE7RUFDRSxZQUFBO0FMK1JGOztBTTNWQTtFQUNJLGNBQUE7QU44Vko7O0FNNVZBO0VBQ0ksNkJBQUE7RUFDQSwyQkFBQTtBTitWSjs7QU03VkE7RUFDSSxxQkFBQTtBTmdXSjs7QU05VkE7RUFDSSxhQUFBO0FOaVdKOztBTS9WQTtFQUNJLGFBQUE7QU5rV0o7O0FNaFdBO0VBQ0ksb0JBQUE7QU5tV0o7O0FNaldBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2RVByQnFCO0VPc0JyQixlUENlO0VPQWYsa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBT0Esd0JBQUE7QU44Vko7O0FNcFdJO0VBQ0UscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0FOc1dOOztBTWxXQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBTnFXSjs7QU1uV0E7RUFDRSxrQkFBQTtFQUNBLHNCUHREZ0I7QUM0WmxCOztBTXJXRTtFQUNJLG1CQUFBO0VBQ0EsZUFBQTtBTnVXTjs7QU1yV0U7RUFDSSxVQUFBO0FOdVdOOztBTXBXQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0FOdVdKIiwiZmlsZSI6InByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9kZXZpY2UtbG9jYXRpb24tYWNjZXNzL2RldmljZS1sb2NhdGlvbi1hY2Nlc3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYm9yZGVyLXJhZGl1czogNHB4O1xyXG4kYm9yZGVyLWNvbG9yOiAjYTBhMmE4O1xyXG4kc2xhdGUtZ3JleTogIzVFNkE3MTtcclxuJGJyYW5kLXByaW1hcnk6ICM2OUJFMjg7XHJcbiRicmFuZC1saWdodGJsdWU6ICM5N0MwRTY7XHJcbiRicmFuZC1tZWRpdW1ibHVlOiAjNjY5OUNDO1xyXG4kYnJhbmQtc2Vjb25kYXJ5OiAjNjljO1xyXG4kYnJhbmQtaW5mbzogIzAwNjY5OTtcclxuJGJyYW5kLXdhcm5pbmcgOiAjZjBhZDRlO1xyXG4kYnJhbmQtZGFuZ2VyIDogI0M4MDgxOTtcclxuJGxpZ2h0LWdyZXk6ICNkZGQ7XHJcbiRkYXJrLWdyZXk6ICM5OTk7XHJcbiRhY3Rpb24tYmx1ZTogIzY2OTljYztcclxuJGJhZGdlLWluZm86ICNGM0Y5RkY7XHJcbiRzY3JvbGwtYnV0dG9uLWNvbG9yOiAjYTBhMmE4O1xyXG4kc2Nyb2xsLWJhci1jb2xvcjogI0VERURFRTtcclxuXHJcbiR0ZXh0LWNvbG9yOiAjMzMzO1xyXG4kcGxhY2Vob2xkZXItdGV4dC1jb2xvcjogIzk5OTtcclxuJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsXCJIZWx2ZXRpY2FcIixcIkFyaWFsXCIsXCJzYW5zLXNlcmlmXCIgIWRlZmF1bHQ7XHJcbiRmb250LXNpemUteHhsYXJnZTogMjZweDtcclxuJGZvbnQtc2l6ZS14bGFyZ2U6IDI0cHg7XHJcbiRmb250LXNpemUtbGFyZ2U6IDIycHg7XHJcbiRmb250LXNpemUtbWVkaXVtOiAyMHB4O1xyXG4kZm9udC1zaXplLWJhc2U6IDE4cHg7XHJcbiRmb250LXNpemUtc21hbGw6IDE2cHg7XHJcbiRmb250LXNpemUteHNtYWxsOiAxNHB4O1xyXG4kZm9udC1zaXplLXh4c21hbGw6IDEycHg7XHJcbiRlcnJvci1tZXNzYWdlOiAjQzcwNzE5O1xyXG4uZmxleCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG4uZmxleC0xIHtcclxuICBmbGV4OiAxO1xyXG59XHJcbi5jb2x1bW4ge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuJGJvbGQ6IDYwMDtcclxuJHNlbWktYm9sZDogNTAwO1xyXG4kcmVndWxhcjogNDAwO1xyXG5cclxuJGJ1dHRvbi1mb250LXNpemU6IDIwcHg7XHJcblxyXG4vLyB6LWluZGV4XHJcbiRzZWFyY2hkcm9wZG93bi16aW5kZXg6IDk5ODtcclxuJGhlYWRlci1pbmRleDogOTk5ICFkZWZhdWx0OyAvLyBGb3IgdGhlIGhlYWRlclxyXG4kcG9wdXB3aW5kb3ctemluZGV4OiAxMDAwICFkZWZhdWx0OyAvLyBGb3IgdGhlIHBvcHVwd2luZG93XHJcbiRjYWxlbmRhci16aW5kZXg6IDEwMDEgIWRlZmF1bHQ7XHJcbiRwb3B1cGRpYWxvZy16aW5kZXg6IDEwMDIgIWRlZmF1bHQ7IC8vIEZvciB0aGUgcG9wdXB3aW5kb3dcclxuJHRvYXN0LXppbmRleDogMTAwMyAhZGVmYXVsdDsgLy8gRm9yIHRoZSB0b2FzdCBtZXNzYWdlXHJcbiRob3Zlci16aW5kZXg6IDEwMDQgIWRlZmF1bHQ7IC8vIEZvciB0aGUgaG92ZXJcclxuJGJhZGdlLXppbmRleDogMTAwNSAhZGVmYXVsdDsgLy8gRm9yIHRoZSB0b2FzdCBtZXNzYWdlXHJcbiRwcm9ncmVzc2Jhci16aW5kZXg6IDEwMDUgIWRlZmF1bHQ7XHJcbiRkaXNhYmxlZC1pbnB1dC1jb2xvcjogI2YyZjJmMjtcclxuJHZhbGlkYXRpb24tZXJyb3ItYm9yZGVyLWNvbG9yOiByZWQ7XHJcbiRzaWRlcGFuZWwtYnV0dG9uLXppbmRleDogOTk5ICFkZWZhdWx0O1xyXG4iLCIuZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5mbGV4LTEge1xuICBmbGV4OiAxO1xufVxuXG4uY29sdW1uIHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG5cbjotbW96LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG5cbjo6LW1vei1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xufVxuXG46LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5vY3RleHRib3h3cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5vY3RleHRib3h3cmFwcGVyIHNwYW4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogN3B4O1xuICBsZWZ0OiA3cHg7XG59XG4ub2N0ZXh0Ym94d3JhcHBlciAub2NpbnB1dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luOiAwO1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM1RTZBNzE7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dDtcbiAgY29sb3I6ICMzMzM7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgaGVpZ2h0OiA1MHB4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIHBhZGRpbmc6IDAuMzc1cmVtIDAuMzc1cmVtIDAuMzc1cmVtIDlweDtcbiAgd2lkdGg6IDEwMCU7XG59XG4ub2N0ZXh0Ym94d3JhcHBlciAub2NpbnB1dC5vY2lucHV0bWFzayB7XG4gIGZvbnQtZmFtaWx5OiBcIm9tbmlhc3Rlcmlza1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4ub2N0ZXh0Ym94d3JhcHBlciAub2NpbnB1dC5oYXNJY29uIHtcbiAgcGFkZGluZzogMC4zNzVyZW0gOXB4IDAuMzc1cmVtIDUwcHg7XG59XG4ub2N0ZXh0Ym94d3JhcHBlciAub2NpbnB1dDpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIG91dGxpbmU6IDA7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KTtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0OmhvdmVyIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0OmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNUU2QTcxICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG4ub2N0ZXh0Ym94d3JhcHBlciAub2NpbnB1dDpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XG59XG4ub2N0ZXh0Ym94d3JhcHBlciAub2NpbnB1dC5uZy1pbnZhbGlkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xufVxuLm9jdGV4dGJveHdyYXBwZXIgLm9jaW5wdXQgc3BhbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB0b3A6IDdweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cbi5vY3RleHRib3h3cmFwcGVyIC5sb2dvbiB7XG4gIHdpZHRoOiA0MDBweDtcbiAgaGVpZ2h0OiA2MHB4O1xuICBmb250LXNpemU6IDIycHg7XG59XG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gIC5vY3RleHRib3h3cmFwcGVyIC5vY2lucHV0IHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cblxuLm9jdGV4dGFyZWF3cmFwcGVyIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAxcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjI1O1xuICBjb2xvcjogIzMzMztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgbWFyZ2luOiAwO1xuICBvdmVyZmxvdzogYXV0bztcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0O1xufVxuLm9jdGV4dGFyZWF3cmFwcGVyIC5yZXNpemUge1xuICByZXNpemU6IG5vbmU7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLm9jdGV4dGFyZWEge1xuICByZXNpemU6IG5vbmU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC41cmVtIDAuNzVyZW07XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gIGNvbG9yOiAjMzMzO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgLW1zLXdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAtbXMtd29yZC1icmVhazogYnJlYWstYWxsO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNUU2QTcxO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLm9jdGV4dGFyZWE6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM1RTZBNzEgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYTpkaXNhYmxlZCB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgb3BhY2l0eTogMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbn1cbi5vY3RleHRhcmVhd3JhcHBlciAub2N0ZXh0YXJlYTo6cGxhY2Vob2xkZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLm9jdGV4dGFyZWE6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLm9jdGV4dGFyZWE6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xufVxuLm9jdGV4dGFyZWF3cmFwcGVyIC5vY3RleHRhcmVhOi1tb3otcGxhY2Vob2xkZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLm9jdGV4dGFyZWE6Oi1tb3otcGxhY2Vob2xkZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG4ub2N0ZXh0YXJlYXdyYXBwZXIgLm9jdGV4dGFyZWEubmctaW52YWxpZCB7XG4gIGJvcmRlci1jb2xvcjogcmVkO1xufVxuXG4uYWN0aW9uLWJ1dHRvbi1jb250YWluZXIgb2MtYnV0dG9uLWFjdGlvbiB7XG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XG59XG5cbi5mbGV4LXJvdyAuZmlsdGVyLWNvbnRyb2wsIC5mbGV4LXJvdyAuZmlsdGVyLWNvbnRyb2wtYWxpZ24tcmlnaHQge1xuICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xuICBmbGV4LWdyb3c6IDA7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uZmxleC1jb2x1bW4gLmZpbHRlci1jb250cm9sLCAuZmxleC1jb2x1bW4gLmZpbHRlci1jb250cm9sLWFsaWduLXJpZ2h0IHtcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gIGZsZXgtZ3JvdzogMDtcbiAgZmxleC1zaHJpbms6IDA7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbi5mbGV4LWNvbHVtbiAuZmlsdGVyLWNvbnRyb2wuZ3JvdXAtcGFkZGluZywgLmZsZXgtY29sdW1uIC5maWx0ZXItY29udHJvbC1hbGlnbi1yaWdodC5ncm91cC1wYWRkaW5nIHtcbiAgcGFkZGluZy1ib3R0b206IDQwcHg7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gIC5hY3Rpb24tYnV0dG9uLWNvbnRhaW5lciBvYy1idXR0b24tYWN0aW9uIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICB9XG5cbiAgLmZpbHRlci1jb250YWluZXIgLmZpbHRlci1jb250cm9sIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICB9XG59XG4uZGF0ZXJhbmdlaW5wdXQge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzVFNkE3MTtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwLjM3NXJlbSA5cHggMC4zNzVyZW0gOXB4O1xuICBjb2xvcjogIzMzMztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICB3aWR0aDogMzIwcHg7XG59XG4uZGF0ZXJhbmdlaW5wdXQgKiwgLmRhdGVyYW5nZWlucHV0ICo6OmJlZm9yZSwgLmRhdGVyYW5nZWlucHV0ICo6OmFmdGVyIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgem9vbTogMTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG4uZGF0ZXJhbmdlaW5wdXQgaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuLmRhdGVyYW5nZWlucHV0IGlucHV0OjotbXMtY2xlYXIge1xuICBkaXNwbGF5OiBub25lO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xufVxuLmRhdGVyYW5nZWlucHV0IDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cbi5kYXRlcmFuZ2VpbnB1dCA6LW1vei1wbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cbi5kYXRlcmFuZ2VpbnB1dCA6Oi1tb3otcGxhY2Vob2xkZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7XG59XG4uZGF0ZXJhbmdlaW5wdXQgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcbn1cbi5kYXRlcmFuZ2VpbnB1dCBbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuLmRhdGVyYW5nZWlucHV0IFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIG1hcmdpbjogMDtcbn1cbi5kYXRlcmFuZ2VpbnB1dCAucG9pbnRlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5kYXRlcmFuZ2VpbnB1dCBbdHlwZT1kYXRlXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uZGF0ZXJhbmdlaW5wdXQgW3R5cGU9ZGF0ZV06Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uZGF0ZXJhbmdlaW5wdXQuaW52YWxpZCB7XG4gIGJvcmRlci1jb2xvcjogI0M4MDgxOTtcbn1cbi5kYXRlcmFuZ2VpbnB1dCBpbnB1dCB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXNpemU6IDIycHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmRhdGVyYW5nZWlucHV0IGlucHV0LmludmFsaWQge1xuICBjb2xvcjogI0M3MDcxOTtcbn1cbi5kYXRlcmFuZ2VpbnB1dCBsYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cbi5kYXRlcmFuZ2VpbnB1dCAuc3RhcnQsIC5kYXRlcmFuZ2VpbnB1dCAuZW5kIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleDogMTtcbn1cbi5kYXRlcmFuZ2VpbnB1dCAuc3RhcnQgLmdyb3VwLCAuZGF0ZXJhbmdlaW5wdXQgLmVuZCAuZ3JvdXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4OiAxO1xufVxuXG4ub2MtdmlzdWFsbHktaGlkZGVuIHtcbiAgYm9yZGVyOiAwO1xuICBjbGlwOiByZWN0KDAgMCAwIDApO1xuICBoZWlnaHQ6IDFweDtcbiAgbWFyZ2luOiAtMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICB3aWR0aDogMXB4O1xufVxuXG4uYXJyb3ctZG93biB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci10b3A6IDhweCBzb2xpZCAjZmZmO1xuICB0b3A6IDE2cHg7XG4gIGxlZnQ6IDE4cHg7XG59XG5cbi5hcnJvdy11cCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCAjZmZmO1xuICB0b3A6IC0xNXB4O1xuICBsZWZ0OiAxOHB4O1xufVxuXG4uZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5mbGV4LTEge1xuICBmbGV4OiAxO1xufVxuXG4uZmxleC1jb2wtY2VudGVyIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5mbGV4LWFsaWduLWNlbnRlciB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5jb2x1bW4ge1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmh0LTEwMCB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuOmhvc3Q6Om5nLWRlZXAgYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogNXB4ICFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogMTAwcHggIWltcG9ydGFudDtcbn1cblxuOmhvc3Q6Om5nLWRlZXAgb2Mtc3ZnaWNvbiB7XG4gIGxlZnQ6IGF1dG8gIWltcG9ydGFudDtcbn1cblxuLnN0MCB7XG4gIGZpbGw6ICNGRkZGRkY7XG59XG5cbi5zdDEge1xuICBmaWxsOiAjNjY5OUNDO1xufVxuXG4ub2NidG46ZGlzYWJsZWQge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLm9jYnRuIHtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICBvdXRsaW5lOiBub25lO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtaW4td2lkdGg6IDE2MHB4O1xuICBtYXJnaW46IDA7XG4gIGhlaWdodDogNTBweDtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgcGFkZGluZy1ib3R0b206IDVweDtcbiAgcGFkZGluZy1sZWZ0OiAyNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAyNXB4O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC1zaXplOiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cbi5vY2J0biBvYy1zdmdpY29uIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTNweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cbi5vY2J0bjpkaXNhYmxlZCB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgb3BhY2l0eTogMC40O1xuICBjb2xvcjogI2NjY2NjYztcbn1cblxuLnNlY29uZGFyeSB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY5Yztcbn1cbi5zZWNvbmRhcnkuaWNvbk9ubHkge1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBtaW4td2lkdGg6IDUwcHg7XG59XG4uc2Vjb25kYXJ5IG9jLXN2Z2ljb24ge1xuICBsZWZ0OiAxMHB4O1xufVxuXG4ucmVwb3NpdGlvbmljb24ge1xuICBoZWlnaHQ6IDQwcHg7XG4gIHdpZHRoOiA0MHB4O1xufSIsIjo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLFwiSGVsdmV0aWNhIE5ldWVcIixcIkhlbHZldGljYVwiLFwiQXJpYWxcIixcInNhbnMtc2VyaWZcIjtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkcGxhY2Vob2xkZXItdGV4dC1jb2xvciAhaW1wb3J0YW50O1xyXG4gfVxyXG4gOi1tb3otcGxhY2Vob2xkZXIge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsXCJIZWx2ZXRpY2FcIixcIkFyaWFsXCIsXCJzYW5zLXNlcmlmXCI7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7ICBcclxuICAgIGNvbG9yOiAkcGxhY2Vob2xkZXItdGV4dC1jb2xvciAhaW1wb3J0YW50O1xyXG4gfVxyXG4gOjotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsXCJIZWx2ZXRpY2EgTmV1ZVwiLFwiSGVsdmV0aWNhXCIsXCJBcmlhbFwiLFwic2Fucy1zZXJpZlwiO1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljOyAgXHJcbiAgICBjb2xvcjogJHBsYWNlaG9sZGVyLXRleHQtY29sb3IgIWltcG9ydGFudDtcclxuIH1cclxuIDotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsXCJIZWx2ZXRpY2FcIixcIkFyaWFsXCIsXCJzYW5zLXNlcmlmXCI7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7IFxyXG4gICAgY29sb3I6ICRwbGFjZWhvbGRlci10ZXh0LWNvbG9yICFpbXBvcnRhbnQ7XHJcbiB9XHJcbiBcclxuLm9jdGV4dGJveHdyYXBwZXJ7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIFxyXG4gICAgc3BhbntcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiA3cHg7XHJcbiAgICAgICAgbGVmdDogN3B4O1xyXG4gICAgfVxyXG5cclxuICAgIC5vY2lucHV0IHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XHJcbiAgICBcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gICAgICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgJHNsYXRlLWdyZXk7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgLjE1cyBlYXNlLWluLW91dDtcclxuICAgIFxyXG4gICAgICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiRib3JkZXItcmFkaXVzO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgLy8gZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gICAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcclxuICAgICAgICBwYWRkaW5nOiAuMzc1cmVtIC4zNzVyZW0gLjM3NXJlbSA5cHg7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7ICAgICAgIFxyXG4gICAgfVxyXG4gICAgLm9jaW5wdXQub2NpbnB1dG1hc2sge1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIm9tbmlhc3Rlcmlza1wiO1xyXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgfVxyXG4gICAgLm9jaW5wdXQuaGFzSWNvbiB7XHJcbiAgICAgICAgcGFkZGluZzogLjM3NXJlbSA5cHggLjM3NXJlbSA1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5vY2lucHV0OmZvY3VzIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7XHJcbiAgICAgICAgb3V0bGluZTogMDtcclxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAwLjJyZW0gcmdiYSgwLDEyMywyNTUsLjI1KTtcclxuICAgIH1cclxuICAgIC5vY2lucHV0OmhvdmVyIHtcclxuICAgICAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgfVxyXG5cclxuICAgIC5vY2lucHV0OmZvY3VzIHtcclxuICAgICAgICBib3JkZXItY29sb3I6ICRzbGF0ZS1ncmV5ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAub2NpbnB1dDpkaXNhYmxlZCB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRpc2FibGVkLWlucHV0LWNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC5vY2lucHV0Lm5nLWludmFsaWQge1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR2YWxpZGF0aW9uLWVycm9yLWJvcmRlci1jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAub2NpbnB1dCBzcGFuIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHRvcDogN3B4O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7ICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmxvZ29uIHtcclxuICAgICAgICB3aWR0aDogNDAwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcclxuICAgIH1cclxuXHJcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiA3NjhweCkgYW5kIChtYXgtd2lkdGggOiAxMDI0cHgpICB7XHJcbiAgICAgICAgLm9jaW5wdXQge1xyXG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtc21hbGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLm9jdGV4dGFyZWF3cmFwcGVyIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDFweDtcclxuICBsaW5lLWhlaWdodDogMS4yNTtcclxuICBjb2xvcjogJHRleHQtY29sb3I7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBtYXJnaW46IDA7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXQ7XHJcblxyXG4gIC5yZXNpemUge1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gIH1cclxuXHJcbiAgLm9jdGV4dGFyZWEge1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAwLjVyZW0gMC43NXJlbTtcclxuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlO1xyXG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XHJcbiAgICBsaW5lLWhlaWdodDogMS4yNTtcclxuICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICAtbXMtd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gICAgd29yZC1icmVhazogYnJlYWstYWxsO1xyXG4gICAgLW1zLXdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRzbGF0ZS1ncmV5O1xyXG4gICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXM7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gIH1cclxuICAub2N0ZXh0YXJlYTpmb2N1cyB7XHJcbiAgICBib3JkZXItY29sb3I6ICRzbGF0ZS1ncmV5ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gIH1cclxuICAub2N0ZXh0YXJlYTpkaXNhYmxlZCB7XHJcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRpc2FibGVkLWlucHV0LWNvbG9yO1xyXG4gIH1cclxuICAub2N0ZXh0YXJlYTo6cGxhY2Vob2xkZXIge1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICRwbGFjZWhvbGRlci10ZXh0LWNvbG9yICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC5vY3RleHRhcmVhOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkcGxhY2Vob2xkZXItdGV4dC1jb2xvciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICAub2N0ZXh0YXJlYTotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICRwbGFjZWhvbGRlci10ZXh0LWNvbG9yICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC5vY3RleHRhcmVhOi1tb3otcGxhY2Vob2xkZXIge1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICRwbGFjZWhvbGRlci10ZXh0LWNvbG9yICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC5vY3RleHRhcmVhOjotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICB9XHJcbiAgLm9jdGV4dGFyZWEubmctaW52YWxpZCB7XHJcbiAgICBib3JkZXItY29sb3I6ICR2YWxpZGF0aW9uLWVycm9yLWJvcmRlci1jb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbiIsIi5hY3Rpb24tYnV0dG9uLWNvbnRhaW5lciB7XHJcbiAgb2MtYnV0dG9uLWFjdGlvbiB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmZsZXgtcm93IC5maWx0ZXItY29udHJvbCwgLmZsZXgtcm93IC5maWx0ZXItY29udHJvbC1hbGlnbi1yaWdodCB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xyXG4gICAgZmxleC1ncm93OiAwO1xyXG4gICAgZmxleC1zaHJpbms6IDA7XHJcblxyXG4gICAgLy8gJjpsYXN0LWNoaWxkIHtcclxuICAgIC8vICAgcGFkZGluZy1yaWdodDogMDtcclxuICAgIC8vIH1cclxufVxyXG5cclxuLmZsZXgtY29sdW1uIC5maWx0ZXItY29udHJvbCwgLmZsZXgtY29sdW1uIC5maWx0ZXItY29udHJvbC1hbGlnbi1yaWdodCB7XHJcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XHJcbiAgZmxleC1ncm93OiAwO1xyXG4gIGZsZXgtc2hyaW5rOiAwO1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxuICAvLyAmOmxhc3QtY2hpbGQge1xyXG4gIC8vICAgcGFkZGluZy1ib3R0b206IDA7XHJcbiAgLy8gfVxyXG5cclxuICAmLmdyb3VwLXBhZGRpbmcge1xyXG4gICAgcGFkZGluZy1ib3R0b206IDQwcHg7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogMTAyNHB4KSAge1xyXG4gIC5hY3Rpb24tYnV0dG9uLWNvbnRhaW5lciB7XHJcbiAgICBvYy1idXR0b24tYWN0aW9uIHtcclxuICAgICAgcGFkZGluZy1yaWdodDogMjBweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5maWx0ZXItY29udGFpbmVyIC5maWx0ZXItY29udHJvbCB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG5cclxuICAgIC8vICY6bGFzdC1jaGlsZCB7XHJcbiAgICAvLyAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsIi5kYXRlcmFuZ2VpbnB1dCB7XHJcbiAgKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgem9vbTogMTtcclxuICAgIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIH1cclxuICBpbnB1dDpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gIH1cclxuICBpbnB1dDo6LW1zLWNsZWFyIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB3aWR0aCA6IDA7XHJcbiAgICBoZWlnaHQ6IDA7XHJcbiAgfVxyXG4gIDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xyXG4gIH1cclxuICA6LW1vei1wbGFjZWhvbGRlciB7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgY29sb3I6ICM5OTkgIWltcG9ydGFudDtcclxuICB9XHJcbiAgOjotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xyXG4gIH1cclxuICA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICBjb2xvcjogIzk5OSAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxyXG4gIFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxuICAucG9pbnRlciB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG4gIFt0eXBlPVwiZGF0ZVwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuICBbdHlwZT1cImRhdGVcIl06Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvciB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAkc2xhdGUtZ3JleTtcclxuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBwYWRkaW5nOiAwLjM3NXJlbSA5cHggMC4zNzVyZW0gOXB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgd2lkdGg6IDMyMHB4O1xyXG4gICYuaW52YWxpZCB7XHJcbiAgICBib3JkZXItY29sb3I6ICRicmFuZC1kYW5nZXI7XHJcbiAgfVxyXG4gIGlucHV0IHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgICYuaW52YWxpZCB7XHJcbiAgICAgIGNvbG9yOiAkZXJyb3ItbWVzc2FnZTtcclxuICAgIH1cclxuICB9XHJcbiAgbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gIH1cclxuICAuc3RhcnQsIC5lbmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXg6IDE7XHJcbiAgICAuZ3JvdXAge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBmbGV4OiAxO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJAaW1wb3J0IFwidmFyaWFibGVzXCI7XHJcbkBpbXBvcnQgXCJ0ZXh0Ym94XCI7XHJcbkBpbXBvcnQgXCJ0ZXh0YXJlYVwiO1xyXG5AaW1wb3J0IFwiZmlsdGVyLWFyZWFcIjtcclxuQGltcG9ydCBcImRhdGVyYW5nZVwiO1xyXG5cclxuLm9jLXZpc3VhbGx5LWhpZGRlbiB7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGNsaXA6IHJlY3QoMCAwIDAgMCk7XHJcbiAgaGVpZ2h0OiAxcHg7XHJcbiAgbWFyZ2luOiAtMXB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgcGFkZGluZzogMDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XHJcbiAgd2lkdGg6IDFweDtcclxufVxyXG4vLz09PT09PT09PT09IHNvcnRpbmcgYXJyb3dzPT09PT09PT09PT09PVxyXG4uYXJyb3ctZG93biB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiAwO1xyXG4gIGhlaWdodDogMDtcclxuICBib3JkZXItbGVmdDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlci1yaWdodDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG5cclxuICBib3JkZXItdG9wOiA4cHggc29saWQgI2ZmZjtcclxuICB0b3A6IDE2cHg7XHJcbiAgbGVmdDogMThweDtcclxufVxyXG4uYXJyb3ctdXAge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMDtcclxuICBoZWlnaHQ6IDA7XHJcbiAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICBib3JkZXItcmlnaHQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuXHJcbiAgYm9yZGVyLWJvdHRvbTogOHB4IHNvbGlkICNmZmY7XHJcbiAgdG9wOiAtMTVweDtcclxuICBsZWZ0OiAxOHB4O1xyXG59XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLz09PT09PT09PT09PUFkZCBGbGV4IHN0eWxlcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLmZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuLmZsZXgtMSB7XHJcbiAgZmxleDogMTtcclxufVxyXG4uZmxleC1jb2wtY2VudGVyIHtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4uZmxleC1hbGlnbi1jZW50ZXIge1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLmNvbHVtbiB7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG4uaGlkZGVue1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uaHQtMTAwIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiIsIkBpbXBvcnQgXCIuL25vZGVfbW9kdWxlcy9Ab21uaWNlbGwvd2ViY29yZWNvbXBvbmVudHMvbGliL3N0eWxlcy9zdHlsZXNcIjtcclxuOmhvc3R7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxufVxyXG46aG9zdDo6bmctZGVlcCBidXR0b257XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDtcclxuICAgIG1pbi13aWR0aDogMTAwcHggIWltcG9ydGFudDtcclxufVxyXG46aG9zdDo6bmctZGVlcCBvYy1zdmdpY29ue1xyXG4gICAgbGVmdDogYXV0byAhaW1wb3J0YW50O1xyXG59XHJcbi5zdDAge1xyXG4gICAgZmlsbDogI0ZGRkZGRjtcclxufVxyXG4uc3QxIHtcclxuICAgIGZpbGw6ICM2Njk5Q0M7XHJcbn1cclxuLm9jYnRuOmRpc2FibGVkIHtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcbi5vY2J0biB7XHJcbiAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG1pbi13aWR0aDogMTYwcHg7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDVweDtcclxuICAgIHBhZGRpbmctbGVmdDogMjVweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDI1cHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6ICRzZW1pLWJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6ICRidXR0b24tZm9udC1zaXplO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBvYy1zdmdpY29uIHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMTNweDtcclxuICAgICAgbGluZS1oZWlnaHQ6MTtcclxuICAgIH1cclxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxufVxyXG4ub2NidG46ZGlzYWJsZWQge1xyXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgb3BhY2l0eTogMC40O1xyXG4gICAgY29sb3I6ICNjY2NjY2M7XHJcbn1cclxuLnNlY29uZGFyeSB7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRicmFuZC1zZWNvbmRhcnk7XHJcbiAgJi5pY29uT25seSB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgICAgIG1pbi13aWR0aDogNTBweDtcclxuICB9XHJcbiAgb2Mtc3ZnaWNvbiB7XHJcbiAgICAgIGxlZnQ6IDEwcHg7XHJcbiAgfVxyXG59XHJcbi5yZXBvc2l0aW9uaWNvbiB7XHJcbiAgICBoZWlnaHQ6NDBweDtcclxuICAgIHdpZHRoOjQwcHg7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/device-location-access/device-location-access.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/device-location-access/device-location-access.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: DeviceLocationAccessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceLocationAccessComponent", function() { return DeviceLocationAccessComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_devices_device_location_access_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/devices/device-location-access.service */ "./src/app/shared/services/devices/device-location-access.service.ts");
/* harmony import */ var _constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/device-location-type-id */ "./src/app/shared/constants/device-location-type-id.ts");
/* harmony import */ var _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../enums/device-location-access-result */ "./src/app/shared/enums/device-location-access-result.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _services_devices_device_lease_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/devices/device-lease.service */ "./src/app/shared/services/devices/device-lease.service.ts");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");










let DeviceLocationAccessComponent = class DeviceLocationAccessComponent {
    constructor(deviceLocationAccessService, deviceLeaseService, dialogService, translateService) {
        this.deviceLocationAccessService = deviceLocationAccessService;
        this.deviceLeaseService = deviceLeaseService;
        this.dialogService = dialogService;
        this.isAccessBusy = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isLeaseBusy = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.accessResult = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._requestLeaseTitle$ = translateService.get('DEVICE_ACCESS');
        this._requestLeaseMessage$ = translateService.get('REQUEST_LEASE_MESSAGE');
        this._errorDialogTitle$ = translateService.get('DEVICE_LOC_ACCESS_ERROR_TITLE');
        this._deviceOfflineMessage$ = translateService.get('DEVICE_OFFLINE_MESSAGE');
    }
    get deviceLocationAccessBusy() {
        return this._deviceLocationAccessBusy;
    }
    set deviceLocationAccessBusy(value) {
        this._deviceLocationAccessBusy = value;
        this.isAccessBusy.next(this._deviceLocationAccessBusy);
    }
    get deviceLeaseBusy() {
        return this._deviceLeaseBusy;
    }
    set deviceLeaseBusy(value) {
        this._deviceLeaseBusy = value;
        this.isLeaseBusy.next(this._deviceLeaseBusy);
    }
    set deviceLocationAccessData(value) {
        this._deviceLocationAccessData = value;
        this.displayButton = this._deviceLocationAccessData.DeviceLocationTypeId == _constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_3__["DeviceLocationTypeId"].Carousel;
        this.accessLocation();
    }
    get deviceLocationAccessData() {
        return this._deviceLocationAccessData;
    }
    accessLocation() {
        this.deviceLocationAccessBusy = true;
        var deviceId = this._deviceLocationAccessData.DeviceId;
        this.deviceLocationAccessService.accessLocation({
            deviceId: deviceId,
            deviceLocationId: this._deviceLocationAccessData.DeviceLocationId,
            deviceLocationTypeId: this._deviceLocationAccessData.DeviceLocationTypeId,
            shelfNumber: this._deviceLocationAccessData.ShelfNumber,
            binNumber: this._deviceLocationAccessData.BinNumber,
            slotNumber: this._deviceLocationAccessData.SlotNumber,
        }, {
            itemDescription: this._deviceLocationAccessData.ItemGenericNameFormatted,
            itemQuantity: this._deviceLocationAccessData.DeviceLocationAccessQuantity,
            itemUnits: this._deviceLocationAccessData.DeviceLocationAccessUnits,
        }).subscribe(x => this.handleDeviceLocationAccessResult(x, deviceId));
    }
    handleDeviceLocationAccessResult(result, deviceId) {
        if (result === _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_4__["DeviceLocationAccessResult"].LeaseNotAvailable) {
            this.handleLeaseNotAvailable(deviceId);
        }
        else {
            if (result === _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_4__["DeviceLocationAccessResult"].DeviceNotOnline) {
                Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["forkJoin"])(this._errorDialogTitle$, this._deviceOfflineMessage$).subscribe(r => this.displayError('Device-Offline', r[0], r[1]));
            }
            this.deviceLocationAccessBusy = false;
            this.accessResult.next(result);
        }
    }
    handleLeaseNotAvailable(deviceId) {
        this.promptRequestLease().subscribe(confirmed => {
            if (confirmed) {
                this.deviceLeaseBusy = true;
                let lease$ = this.deviceLeaseService.requestLease(deviceId);
                lease$.subscribe(leaseSucceeded => {
                    if (leaseSucceeded) {
                        this.accessLocation();
                    }
                    else {
                        this.accessResult.next(_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_4__["DeviceLocationAccessResult"].LeaseNotAvailable);
                    }
                    this.deviceLeaseBusy = false;
                });
            }
            else {
                this.accessResult.next(_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_4__["DeviceLocationAccessResult"].LeaseNotRequested);
            }
        });
    }
    displayError(uniqueId, title, message) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogProperties"](uniqueId);
        properties.titleElementText = title;
        properties.messageElementText = message;
        properties.showPrimaryButton = true;
        properties.primaryButtonText = 'Ok';
        properties.showSecondaryButton = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogType"].Error;
        properties.timeoutLength = 0;
        return this.dialogService.showOnce(properties);
    }
    promptRequestLease() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["forkJoin"])(this._requestLeaseTitle$, this._requestLeaseMessage$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["flatMap"])(x => this.displayRequestLeaseDialog(x[0], x[1])));
    }
    displayRequestLeaseDialog(title, message) {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogProperties"]('Request-Lease');
        properties.titleElementText = title;
        properties.messageElementText = message;
        properties.showPrimaryButton = true;
        properties.primaryButtonText = 'Yes';
        properties.showSecondaryButton = true;
        properties.secondaryButtonText = 'No';
        properties.primaryOnRight = false;
        properties.showCloseIcon = false;
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogType"].Info;
        properties.timeoutLength = 0;
        let component = this.dialogService.showOnce(properties);
        let primaryClick$ = component.didClickPrimaryButton.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(x => true));
        let secondaryClick$ = component.didClickSecondaryButton.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(x => false));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["merge"])(primaryClick$, secondaryClick$);
    }
};
DeviceLocationAccessComponent.ctorParameters = () => [
    { type: _services_devices_device_location_access_service__WEBPACK_IMPORTED_MODULE_2__["DeviceLocationAccessService"] },
    { type: _services_devices_device_lease_service__WEBPACK_IMPORTED_MODULE_6__["DeviceLeaseService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DeviceLocationAccessComponent.prototype, "disabled", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DeviceLocationAccessComponent.prototype, "deviceLocationAccessData", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], DeviceLocationAccessComponent.prototype, "isAccessBusy", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], DeviceLocationAccessComponent.prototype, "isLeaseBusy", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], DeviceLocationAccessComponent.prototype, "accessResult", void 0);
DeviceLocationAccessComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-device-location-access',
        template: __webpack_require__(/*! raw-loader!./device-location-access.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/device-location-access/device-location-access.component.html"),
        styles: [__webpack_require__(/*! ./device-location-access.component.scss */ "./src/app/shared/components/device-location-access/device-location-access.component.scss")]
    })
], DeviceLocationAccessComponent);



/***/ }),

/***/ "./src/app/shared/components/header-container/header-container.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/shared/components/header-container/header-container.component.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  flex: 1;\n}\n\n.cpmheadercontainer {\n  display: inline-flex;\n  flex-direction: column;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  padding: 0 15px;\n}\n\n.cpmheadertitle {\n  font-size: 14px;\n  margin-bottom: -4px;\n}\n\n.cpmheadervalue {\n  font-size: 22px;\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9oZWFkZXItY29udGFpbmVyL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcc2hhcmVkXFxjb21wb25lbnRzXFxoZWFkZXItY29udGFpbmVyXFxoZWFkZXItY29udGFpbmVyLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2hlYWRlci1jb250YWluZXIvaGVhZGVyLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLE9BQUE7QUNDSjs7QURDQTtFQUNJLG9CQUFBO0VBQ0Esc0JBQUE7RUFDQSx1RUFBQTtFQUNBLGVBQUE7QUNFSjs7QURBQTtFQUNJLGVBQUE7RUFDQSxtQkFBQTtBQ0dKOztBRERBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FDSUoiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2hlYWRlci1jb250YWluZXIvaGVhZGVyLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0e1xyXG4gICAgZmxleDogMTtcclxufVxyXG4uY3BtaGVhZGVyY29udGFpbmVye1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XHJcbiAgICBwYWRkaW5nOiAwIDE1cHg7XHJcbn1cclxuLmNwbWhlYWRlcnRpdGxle1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLTRweDtcclxufVxyXG4uY3BtaGVhZGVydmFsdWV7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59IiwiOmhvc3Qge1xuICBmbGV4OiAxO1xufVxuXG4uY3BtaGVhZGVyY29udGFpbmVyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgcGFkZGluZzogMCAxNXB4O1xufVxuXG4uY3BtaGVhZGVydGl0bGUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi1ib3R0b206IC00cHg7XG59XG5cbi5jcG1oZWFkZXJ2YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/header-container/header-container.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shared/components/header-container/header-container.component.ts ***!
  \**********************************************************************************/
/*! exports provided: HeaderContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderContainerComponent", function() { return HeaderContainerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let HeaderContainerComponent = class HeaderContainerComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], HeaderContainerComponent.prototype, "title", void 0);
HeaderContainerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header-container',
        template: __webpack_require__(/*! raw-loader!./header-container.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/header-container/header-container.component.html"),
        styles: [__webpack_require__(/*! ./header-container.component.scss */ "./src/app/shared/components/header-container/header-container.component.scss")]
    })
], HeaderContainerComponent);



/***/ }),

/***/ "./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.scss":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  flex: 1;\n}\n\n.cpmheadercontainer {\n  display: inline-flex;\n  flex-direction: column;\n  font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  padding: 0 15px;\n}\n\n.cpmheadertitle {\n  font-size: 14px;\n  margin-bottom: 0px;\n}\n\n.cpmheadervalue {\n  font-size: 22px;\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9oZWFkZXItdGl0bGUtYm90dG9tLW1hcmdpbi1jb250YWluZXIvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvcHJvamVjdHNcXGNwbS1hcHBcXHNyY1xcYXBwXFxzaGFyZWRcXGNvbXBvbmVudHNcXGhlYWRlci10aXRsZS1ib3R0b20tbWFyZ2luLWNvbnRhaW5lclxcaGVhZGVyLXRpdGxlLWJvdHRvbS1tYXJnaW4tY29udGFpbmVyLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2hlYWRlci10aXRsZS1ib3R0b20tbWFyZ2luLWNvbnRhaW5lci9oZWFkZXItdGl0bGUtYm90dG9tLW1hcmdpbi1jb250YWluZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUVBQUE7RUFDQSxlQUFBO0FDRUY7O0FEQUE7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUNHRjs7QUREQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQ0lGIiwiZmlsZSI6InByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9oZWFkZXItdGl0bGUtYm90dG9tLW1hcmdpbi1jb250YWluZXIvaGVhZGVyLXRpdGxlLWJvdHRvbS1tYXJnaW4tY29udGFpbmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3R7XHJcbiAgZmxleDogMTtcclxufVxyXG4uY3BtaGVhZGVyY29udGFpbmVye1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIixcIkhlbHZldGljYSBOZXVlXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XHJcbiAgcGFkZGluZzogMCAxNXB4O1xyXG59XHJcbi5jcG1oZWFkZXJ0aXRsZXtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG59XHJcbi5jcG1oZWFkZXJ2YWx1ZXtcclxuICBmb250LXNpemU6IDIycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG4iLCI6aG9zdCB7XG4gIGZsZXg6IDE7XG59XG5cbi5jcG1oZWFkZXJjb250YWluZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICBwYWRkaW5nOiAwIDE1cHg7XG59XG5cbi5jcG1oZWFkZXJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xufVxuXG4uY3BtaGVhZGVydmFsdWUge1xuICBmb250LXNpemU6IDIycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.ts":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.ts ***!
  \**************************************************************************************************************************/
/*! exports provided: HeaderTitleBottomMarginContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderTitleBottomMarginContainerComponent", function() { return HeaderTitleBottomMarginContainerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let HeaderTitleBottomMarginContainerComponent = class HeaderTitleBottomMarginContainerComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], HeaderTitleBottomMarginContainerComponent.prototype, "title", void 0);
HeaderTitleBottomMarginContainerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header-title-bottom-margin-container',
        template: __webpack_require__(/*! raw-loader!./header-title-bottom-margin-container.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.html"),
        styles: [__webpack_require__(/*! ./header-title-bottom-margin-container.component.scss */ "./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.scss")]
    })
], HeaderTitleBottomMarginContainerComponent);



/***/ }),

/***/ "./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: inline-flex;\n}\n\n:host::ng-deep button {\n  border-radius: 25px !important;\n  min-width: 0px !important;\n  padding-left: 25px !important;\n  padding-right: 25px !important;\n  height: 50px;\n}\n\n:host::ng-deep oc-button-action {\n  display: flex !important;\n  margin-right: 12px;\n}\n\n:host::ng-deep oc-svgicon {\n  left: 13px !important;\n}\n\n.reorderBtnLeft {\n  margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9yb3ctcmVvcmRlci1idXR0b25zL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxcc2hhcmVkXFxjb21wb25lbnRzXFxyb3ctcmVvcmRlci1idXR0b25zXFxyb3ctcmVvcmRlci1idXR0b25zLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3Jvdy1yZW9yZGVyLWJ1dHRvbnMvcm93LXJlb3JkZXItYnV0dG9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0FDQ0o7O0FEQ0E7RUFDSSw4QkFBQTtFQUNBLHlCQUFBO0VBQ0EsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLFlBQUE7QUNFSjs7QURBQTtFQUNJLHdCQUFBO0VBQ0Esa0JBQUE7QUNHSjs7QUREQTtFQUNJLHFCQUFBO0FDSUo7O0FERkE7RUFDSSxrQkFBQTtBQ0tKIiwiZmlsZSI6InByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9yb3ctcmVvcmRlci1idXR0b25zL3Jvdy1yZW9yZGVyLWJ1dHRvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxufVxyXG46aG9zdDo6bmctZGVlcCBidXR0b257XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICBtaW4td2lkdGg6IDBweCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAyNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6NTBweDtcclxufVxyXG46aG9zdDo6bmctZGVlcCBvYy1idXR0b24tYWN0aW9ue1xyXG4gICAgZGlzcGxheTogZmxleCAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xyXG59XHJcbjpob3N0OjpuZy1kZWVwICAgb2Mtc3ZnaWNvbiB7XHJcbiAgICBsZWZ0OiAxM3B4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLnJlb3JkZXJCdG5MZWZ0e1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59IiwiOmhvc3Qge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cblxuOmhvc3Q6Om5nLWRlZXAgYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogMjVweCAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IDBweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLWxlZnQ6IDI1cHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1yaWdodDogMjVweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDUwcHg7XG59XG5cbjpob3N0OjpuZy1kZWVwIG9jLWJ1dHRvbi1hY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1yaWdodDogMTJweDtcbn1cblxuOmhvc3Q6Om5nLWRlZXAgb2Mtc3ZnaWNvbiB7XG4gIGxlZnQ6IDEzcHggIWltcG9ydGFudDtcbn1cblxuLnJlb3JkZXJCdG5MZWZ0IHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.ts ***!
  \****************************************************************************************/
/*! exports provided: RowReorderButtonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowReorderButtonsComponent", function() { return RowReorderButtonsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let RowReorderButtonsComponent = class RowReorderButtonsComponent {
    constructor() {
        this.rowMovedUp = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.rowMovedDown = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
    }
    onUpClicked() {
        this.rowMovedUp.emit(this.value);
    }
    onDownClicked() {
        this.rowMovedDown.emit(this.value);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], RowReorderButtonsComponent.prototype, "rowMovedUp", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], RowReorderButtonsComponent.prototype, "rowMovedDown", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], RowReorderButtonsComponent.prototype, "value", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], RowReorderButtonsComponent.prototype, "upDisabled", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], RowReorderButtonsComponent.prototype, "downDisabled", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], RowReorderButtonsComponent.prototype, "disabled", void 0);
RowReorderButtonsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-row-reorder-buttons',
        template: __webpack_require__(/*! raw-loader!./row-reorder-buttons.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.html"),
        styles: [__webpack_require__(/*! ./row-reorder-buttons.component.scss */ "./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.scss")]
    })
], RowReorderButtonsComponent);



/***/ }),

/***/ "./src/app/shared/components/spinner-popup/spinner-popup.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/spinner-popup/spinner-popup.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvc3Bpbm5lci1wb3B1cC9zcGlubmVyLXBvcHVwLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/components/spinner-popup/spinner-popup.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/spinner-popup/spinner-popup.component.ts ***!
  \****************************************************************************/
/*! exports provided: SpinnerPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerPopupComponent", function() { return SpinnerPopupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let SpinnerPopupComponent = class SpinnerPopupComponent {
    constructor() { }
    ngOnInit() {
    }
};
SpinnerPopupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-spinner-popup',
        template: __webpack_require__(/*! raw-loader!./spinner-popup.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/spinner-popup/spinner-popup.component.html"),
        styles: [__webpack_require__(/*! ./spinner-popup.component.scss */ "./src/app/shared/components/spinner-popup/spinner-popup.component.scss")]
    })
], SpinnerPopupComponent);



/***/ }),

/***/ "./src/app/shared/components/text-result-popup/text-result-popup.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/shared/components/text-result-popup/text-result-popup.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n:host ::ng-deep .ocwindowcontent {\n  padding: 15px;\n  font-size: 14pt;\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy90ZXh0LXJlc3VsdC1wb3B1cC9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9wcm9qZWN0c1xcY3BtLWFwcFxcc3JjXFxhcHBcXHNoYXJlZFxcY29tcG9uZW50c1xcdGV4dC1yZXN1bHQtcG9wdXBcXHRleHQtcmVzdWx0LXBvcHVwLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3RleHQtcmVzdWx0LXBvcHVwL3RleHQtcmVzdWx0LXBvcHVwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksdUVBQUE7QUNDSjs7QURDQTtFQUNJLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUNFSiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvdGV4dC1yZXN1bHQtcG9wdXAvdGV4dC1yZXN1bHQtcG9wdXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdHtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsXCJIZWx2ZXRpY2EgTmV1ZVwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xyXG59XHJcbjpob3N0IDo6bmctZGVlcCAub2N3aW5kb3djb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBmb250LXNpemU6IDE0cHQ7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59IiwiOmhvc3Qge1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG59XG5cbjpob3N0IDo6bmctZGVlcCAub2N3aW5kb3djb250ZW50IHtcbiAgcGFkZGluZzogMTVweDtcbiAgZm9udC1zaXplOiAxNHB0O1xuICBmb250LXdlaWdodDogNjAwO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/shared/components/text-result-popup/text-result-popup.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/shared/components/text-result-popup/text-result-popup.component.ts ***!
  \************************************************************************************/
/*! exports provided: TextResultPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextResultPopupComponent", function() { return TextResultPopupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");



let TextResultPopupComponent = class TextResultPopupComponent {
    constructor() {
        this.dismiss = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    ngOnInit() {
        this.textValue = this.data.initialValue;
        this.placeholderTextResourceKey = this.data.placeholderTextResouceKey;
        this.beforeTextboxResourceKey = this.data.beforeTextboxResourceKey;
        this.afterTextboxResourceKey = this.data.afterTextboxResourceKey;
        var textInput = this.nameInput.inputView;
        this.intersectionObserver = new IntersectionObserver(entries => {
            if (textInput.nativeElement.offsetParent != null) {
                textInput.nativeElement.focus();
            }
        });
        this.intersectionObserver.observe(textInput.nativeElement);
    }
    ngOnDestroy() {
        this.intersectionObserver.disconnect();
    }
    cancel() {
        this.data.resultValue = null;
        this.dismiss.next(false);
    }
    continue() {
        this.data.resultValue = this.textValue;
        this.dismiss.next(true);
    }
    textValueChanged(newValue) {
        this.textValue = newValue;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], TextResultPopupComponent.prototype, "dismiss", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('nameInput', { static: true })
], TextResultPopupComponent.prototype, "nameInput", void 0);
TextResultPopupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-text-result-popup',
        template: __webpack_require__(/*! raw-loader!./text-result-popup.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shared/components/text-result-popup/text-result-popup.component.html"),
        styles: [__webpack_require__(/*! ./text-result-popup.component.scss */ "./src/app/shared/components/text-result-popup/text-result-popup.component.scss")]
    })
], TextResultPopupComponent);



/***/ }),

/***/ "./src/app/shared/constants/device-location-type-id.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/constants/device-location-type-id.ts ***!
  \*************************************************************/
/*! exports provided: DeviceLocationTypeId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceLocationTypeId", function() { return DeviceLocationTypeId; });
class DeviceLocationTypeId {
}
DeviceLocationTypeId.OpenStorage = '2002';
DeviceLocationTypeId.Carousel = '2023';
DeviceLocationTypeId.Canister = '2041';
DeviceLocationTypeId.Tray = '2042';
DeviceLocationTypeId.Xr2MedicationStorage = '2101';


/***/ }),

/***/ "./src/app/shared/constants/hub-configuration-constants.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/constants/hub-configuration-constants.ts ***!
  \*****************************************************************/
/*! exports provided: HubConfigurationConstants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubConfigurationConstants", function() { return HubConfigurationConstants; });
class HubConfigurationConstants {
}
HubConfigurationConstants.hubName = 'PubService';


/***/ }),

/***/ "./src/app/shared/constants/ocap-configuration-constants.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/constants/ocap-configuration-constants.ts ***!
  \******************************************************************/
/*! exports provided: OcapConfigurationConstants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OcapConfigurationConstants", function() { return OcapConfigurationConstants; });
class OcapConfigurationConstants {
}
OcapConfigurationConstants.storageKey = 'ocap';
OcapConfigurationConstants.apiKeyHeader = 'x-apikey';
OcapConfigurationConstants.machineNameHeader = 'x-machinename';
OcapConfigurationConstants.clientIdHeader = 'x-clientid';


/***/ }),

/***/ "./src/app/shared/constants/selection-change-type.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared/constants/selection-change-type.ts ***!
  \***********************************************************/
/*! exports provided: SelectionChangeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionChangeType", function() { return SelectionChangeType; });
class SelectionChangeType {
}
SelectionChangeType.selected = 'selected';
SelectionChangeType.unselected = 'unselected';


/***/ }),

/***/ "./src/app/shared/constants/sort-direction.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/constants/sort-direction.ts ***!
  \****************************************************/
/*! exports provided: SortDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortDirection", function() { return SortDirection; });
class SortDirection {
}
SortDirection.ascending = 'asc';
SortDirection.descending = 'desc';


/***/ }),

/***/ "./src/app/shared/directives/grid-multi-select.directive.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/directives/grid-multi-select.directive.ts ***!
  \******************************************************************/
/*! exports provided: GridMultiSelectDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridMultiSelectDirective", function() { return GridMultiSelectDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _constants_selection_change_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/selection-change-type */ "./src/app/shared/constants/selection-change-type.ts");




let GridMultiSelectDirective = class GridMultiSelectDirective {
    constructor() {
        this._selectedValues = [];
        this._subscriptions = [];
        this.selectionChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    set rows(values) {
        this._possibleValues = values.map(x => x.valueField);
        this._selectedValues = values.filter(x => x.selected).map(x => x.valueField);
        if (this._subscriptions.length) {
            this._subscriptions.forEach(x => x.unsubscribe());
        }
        values && values.forEach(x => this._subscriptions.push(x.selection && x.selection.subscribe(x => this.onRowCheckChanged(x))));
    }
    onRowCheckChanged(selectionEvent) {
        var checked = selectionEvent.selectedState;
        var value = selectionEvent.selectedValue;
        if (checked) {
            this._selectedValues.push(value);
        }
        else {
            this._selectedValues = this._selectedValues.filter(x => x != value);
        }
        this.selectionChanged.emit({
            changeType: checked ? _constants_selection_change_type__WEBPACK_IMPORTED_MODULE_3__["SelectionChangeType"].selected : _constants_selection_change_type__WEBPACK_IMPORTED_MODULE_3__["SelectionChangeType"].unselected,
            changedValue: value,
            selectedValues: this._selectedValues,
            unselectedValues: this._possibleValues.filter(x => this._selectedValues.indexOf(x) == -1)
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])('selectionChanged')
], GridMultiSelectDirective.prototype, "selectionChanged", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(_omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_2__["CheckboxComponent"])
], GridMultiSelectDirective.prototype, "rows", null);
GridMultiSelectDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[appGridMultiSelect]'
    })
], GridMultiSelectDirective);



/***/ }),

/***/ "./src/app/shared/directives/grid-reorder.directive.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/directives/grid-reorder.directive.ts ***!
  \*************************************************************/
/*! exports provided: GridReorderDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridReorderDirective", function() { return GridReorderDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _components_row_reorder_buttons_row_reorder_buttons_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/row-reorder-buttons/row-reorder-buttons.component */ "./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.ts");



let GridReorderDirective = class GridReorderDirective {
    constructor() {
        this._subscriptions = [];
        this.orderChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"];
    }
    set rows(values) {
        this._orderedValues = values.map(x => x.value);
        if (this._subscriptions.length) {
            this._subscriptions.forEach(x => x.unsubscribe());
        }
        values.forEach(x => {
            var subscription = x.rowMovedUp.subscribe(x => this.onRowMovedUp(x));
            this._subscriptions.push(subscription);
        });
        values.forEach(x => {
            var subscription = x.rowMovedDown.subscribe(x => this.onRowMovedDown(x));
            this._subscriptions.push(subscription);
        });
    }
    onRowMovedUp(rowValue) {
        var currentIndex = this._orderedValues.findIndex(v => v == rowValue);
        var swapValue = this._orderedValues[currentIndex - 1];
        this._orderedValues[currentIndex] = swapValue;
        this._orderedValues[currentIndex - 1] = rowValue;
        this.orderChanged.emit({ changedValue: rowValue, orderedValues: this._orderedValues });
    }
    onRowMovedDown(rowValue) {
        var currentIndex = this._orderedValues.findIndex(v => v == rowValue);
        var swapValue = this._orderedValues[currentIndex + 1];
        this._orderedValues[currentIndex] = swapValue;
        this._orderedValues[currentIndex + 1] = rowValue;
        this.orderChanged.emit({ changedValue: rowValue, orderedValues: this._orderedValues });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], GridReorderDirective.prototype, "orderChanged", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(_components_row_reorder_buttons_row_reorder_buttons_component__WEBPACK_IMPORTED_MODULE_2__["RowReorderButtonsComponent"])
], GridReorderDirective.prototype, "rows", null);
GridReorderDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[appGridReorder]'
    })
], GridReorderDirective);



/***/ }),

/***/ "./src/app/shared/enums/device-location-access-result.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/enums/device-location-access-result.ts ***!
  \***************************************************************/
/*! exports provided: DeviceLocationAccessResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceLocationAccessResult", function() { return DeviceLocationAccessResult; });
var DeviceLocationAccessResult;
(function (DeviceLocationAccessResult) {
    DeviceLocationAccessResult[DeviceLocationAccessResult["None"] = 0] = "None";
    DeviceLocationAccessResult[DeviceLocationAccessResult["Succeeded"] = 1] = "Succeeded";
    DeviceLocationAccessResult[DeviceLocationAccessResult["DeviceNotOnline"] = 2] = "DeviceNotOnline";
    DeviceLocationAccessResult[DeviceLocationAccessResult["DeviceInactive"] = 3] = "DeviceInactive";
    DeviceLocationAccessResult[DeviceLocationAccessResult["LeaseNotAvailable"] = 4] = "LeaseNotAvailable";
    DeviceLocationAccessResult[DeviceLocationAccessResult["Failed"] = 5] = "Failed";
    DeviceLocationAccessResult[DeviceLocationAccessResult["Expired"] = 6] = "Expired";
    DeviceLocationAccessResult[DeviceLocationAccessResult["TimedOut"] = 7] = "TimedOut";
    DeviceLocationAccessResult[DeviceLocationAccessResult["LeaseNotRequested"] = 8] = "LeaseNotRequested";
})(DeviceLocationAccessResult || (DeviceLocationAccessResult = {}));


/***/ }),

/***/ "./src/app/shared/enums/device-operation-outcome.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared/enums/device-operation-outcome.ts ***!
  \**********************************************************/
/*! exports provided: DeviceOperationOutcome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceOperationOutcome", function() { return DeviceOperationOutcome; });
var DeviceOperationOutcome;
(function (DeviceOperationOutcome) {
    DeviceOperationOutcome[DeviceOperationOutcome["Successful"] = 0] = "Successful";
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceNotLeasedToClient"] = 1] = "DeviceNotLeasedToClient";
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceOfflineOrNotFound"] = 2] = "DeviceOfflineOrNotFound";
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceInactive"] = 3] = "DeviceInactive";
    DeviceOperationOutcome[DeviceOperationOutcome["DeviceLeaseNotRequired"] = 4] = "DeviceLeaseNotRequired";
    DeviceOperationOutcome[DeviceOperationOutcome["PendingLeaseRequestExistsForDevice"] = 5] = "PendingLeaseRequestExistsForDevice";
    DeviceOperationOutcome[DeviceOperationOutcome["ItemsAssignedToDevice"] = 6] = "ItemsAssignedToDevice";
    DeviceOperationOutcome[DeviceOperationOutcome["Unsuccessful"] = 7] = "Unsuccessful";
})(DeviceOperationOutcome || (DeviceOperationOutcome = {}));


/***/ }),

/***/ "./src/app/shared/functions/nameof.ts":
/*!********************************************!*\
  !*** ./src/app/shared/functions/nameof.ts ***!
  \********************************************/
/*! exports provided: nameof */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nameof", function() { return nameof; });
function nameof(key, instance) {
    return key;
}


/***/ }),

/***/ "./src/app/shared/pipes/search.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/pipes/search.pipe.ts ***!
  \*********************************************/
/*! exports provided: SearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPipe", function() { return SearchPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let SearchPipe = class SearchPipe {
    transform(allSearchData, searchTxt, searchProperties) {
        if (!searchTxt || !searchTxt.trim() || allSearchData.length < 1) {
            return allSearchData;
        }
        if (!searchProperties) {
            searchProperties = Object.keys(allSearchData[0]);
        }
        return allSearchData.filter(searchItem => {
            let returnVal = false;
            searchProperties.forEach((key) => {
                if (String(searchItem[key]).toLocaleLowerCase().indexOf(searchTxt.toLocaleLowerCase()) > -1) {
                    returnVal = true;
                    return;
                }
            });
            return returnVal;
        });
    }
};
SearchPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'searchPipe' })
], SearchPipe);



/***/ }),

/***/ "./src/app/shared/services/devices/carousel-location-access.service.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/shared/services/devices/carousel-location-access.service.ts ***!
  \*****************************************************************************/
/*! exports provided: CarouselLocationAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselLocationAccessService", function() { return CarouselLocationAccessService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/device-location-type-id */ "./src/app/shared/constants/device-location-type-id.ts");
/* harmony import */ var _api_core_services_carousel_commands_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../api-core/services/carousel-commands.service */ "./src/app/api-core/services/carousel-commands.service.ts");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! guid-typescript */ "../../node_modules/guid-typescript/dist/guid.js");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(guid_typescript__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/device-location-access-result */ "./src/app/shared/enums/device-location-access-result.ts");
/* harmony import */ var _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../api-core/services/core-event-connection.service */ "./src/app/api-core/services/core-event-connection.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _device_operation_outcome_mapper_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./device-operation-outcome-mapper.service */ "./src/app/shared/services/devices/device-operation-outcome-mapper.service.ts");










let CarouselLocationAccessService = class CarouselLocationAccessService {
    constructor(carouselCommandsService, coreEventConnectionService, deviceOperationOutcomeMapperService) {
        this.carouselCommandsService = carouselCommandsService;
        this.coreEventConnectionService = coreEventConnectionService;
        this.deviceOperationOutcomeMapperService = deviceOperationOutcomeMapperService;
        this._deviceOperationResultSubjects = {};
        this.deviceLocationTypeId = _constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_2__["DeviceLocationTypeId"].Carousel;
        this.coreEventConnectionService.deviceOperationResultEventSubject.subscribe(x => this.handleDeviceOperationResultEvent(x));
    }
    accessLocation(deviceLocation, carouselDisplay) {
        return this.coreEventConnectionService.startedSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["flatMap"])(x => this.accessLocationConnected(deviceLocation, carouselDisplay)));
    }
    moveToShelf(deviceId, shelfNumber) {
        return this.coreEventConnectionService.startedSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["flatMap"])(x => this.moveToShelfConnected(deviceId, shelfNumber)));
    }
    clearLightbar(deviceId) {
        return this.coreEventConnectionService.startedSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["flatMap"])(x => this.clearLightbarConnected(deviceId)));
    }
    displayLocationLightbar(deviceLocation, carouselDisplay) {
        return this.coreEventConnectionService.startedSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["flatMap"])(x => this.displayLocationLightbarConnected(deviceLocation, carouselDisplay)));
    }
    accessLocationConnected(deviceLocation, carouselDisplay) {
        this.clearLightbar(deviceLocation.deviceId).subscribe(x => {
            this.displayLocationLightbar(deviceLocation, carouselDisplay).subscribe();
        });
        return this.moveToShelf(deviceLocation.deviceId, deviceLocation.shelfNumber);
    }
    moveToShelfConnected(deviceId, shelfNumber) {
        let requestCorrelationId = guid_typescript__WEBPACK_IMPORTED_MODULE_4__["Guid"].create();
        let resultSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this._deviceOperationResultSubjects[requestCorrelationId.toString()] = resultSubject;
        let deviceOperationResult$ = this.carouselCommandsService.moveToShelf(requestCorrelationId, deviceId, shelfNumber);
        deviceOperationResult$.subscribe((x => this.checkDeviceOperationResult(x, requestCorrelationId)));
        return resultSubject;
    }
    clearLightbarConnected(deviceId) {
        let requestCorrelationId = guid_typescript__WEBPACK_IMPORTED_MODULE_4__["Guid"].create();
        let resultSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this._deviceOperationResultSubjects[requestCorrelationId.toString()] = resultSubject;
        let deviceOperationResult$ = this.carouselCommandsService.clearLightbar(requestCorrelationId, deviceId);
        deviceOperationResult$.subscribe(x => this.checkDeviceOperationResult(x, requestCorrelationId));
        return resultSubject;
    }
    displayLocationLightbarConnected(deviceLocation, carouselDisplay) {
        let requestCorrelationId = guid_typescript__WEBPACK_IMPORTED_MODULE_4__["Guid"].create();
        let resultSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this._deviceOperationResultSubjects[requestCorrelationId.toString()] = resultSubject;
        let deviceOperationResult$ = this.carouselCommandsService.displayLightbar(requestCorrelationId, deviceLocation.deviceId, deviceLocation.binNumber, deviceLocation.slotNumber, carouselDisplay.itemDescription, carouselDisplay.itemQuantity, carouselDisplay.itemUnits);
        deviceOperationResult$.subscribe(x => this.checkDeviceOperationResult(x, requestCorrelationId));
        return resultSubject;
    }
    checkDeviceOperationResult(deviceOperationResult, requestCorrelationId) {
        if (!deviceOperationResult.IsSuccessful) {
            let result = this.deviceOperationOutcomeMapperService.mapOutcomeToAccessResult(deviceOperationResult.Outcome);
            let subject = this.popRequestSubject(requestCorrelationId.toString());
            subject.next(result);
        }
    }
    handleDeviceOperationResultEvent(event) {
        let subject = this.popRequestSubject(event.ResultId.toString());
        if (!subject) {
            return;
        }
        if (event.IsSuccessful) {
            subject.next(_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_6__["DeviceLocationAccessResult"].Succeeded);
            return;
        }
        if (event.IsExpired) {
            subject.next(_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_6__["DeviceLocationAccessResult"].Expired);
            return;
        }
        subject.next(_enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_6__["DeviceLocationAccessResult"].Failed);
    }
    popRequestSubject(requestId) {
        let subject = this._deviceOperationResultSubjects[requestId];
        if (!subject) {
            return;
        }
        delete this._deviceOperationResultSubjects[requestId];
        return subject;
    }
};
CarouselLocationAccessService.ctorParameters = () => [
    { type: _api_core_services_carousel_commands_service__WEBPACK_IMPORTED_MODULE_3__["CarouselCommandsService"] },
    { type: _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_7__["CoreEventConnectionService"] },
    { type: _device_operation_outcome_mapper_service__WEBPACK_IMPORTED_MODULE_9__["DeviceOperationOutcomeMapperService"] }
];
CarouselLocationAccessService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CarouselLocationAccessService);



/***/ }),

/***/ "./src/app/shared/services/devices/device-lease.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/services/devices/device-lease.service.ts ***!
  \*****************************************************************/
/*! exports provided: DeviceLeaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceLeaseService", function() { return DeviceLeaseService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../api-core/services/hardware-lease-service */ "./src/app/api-core/services/hardware-lease-service.ts");
/* harmony import */ var _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api-core/services/core-event-connection.service */ "./src/app/api-core/services/core-event-connection.service.ts");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! guid-typescript */ "../../node_modules/guid-typescript/dist/guid.js");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(guid_typescript__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");







let DeviceLeaseService = class DeviceLeaseService {
    constructor(hardwareLeaseService, coreEventConnectionService) {
        this.hardwareLeaseService = hardwareLeaseService;
        this.coreEventConnectionService = coreEventConnectionService;
        this._deviceLeaseRequestSubjects = {};
        this.coreEventConnectionService.deviceLeaseGrantedSubject.subscribe(x => this.handleGrantedEvent(x));
        this.coreEventConnectionService.deviceLeaseDeniedSubject.subscribe(x => this.handleDeniedEvent(x));
    }
    requestLease(deviceId) {
        return this.coreEventConnectionService.startedSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["flatMap"])(x => this.requestLeaseConnected(deviceId)));
    }
    requestLeaseConnected(deviceId) {
        let requestCorrelationId = guid_typescript__WEBPACK_IMPORTED_MODULE_5__["Guid"].create();
        let resultSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this._deviceLeaseRequestSubjects[requestCorrelationId.toString()] = resultSubject;
        this.hardwareLeaseService.RequestDeviceLeaseCorrelate(requestCorrelationId, deviceId).subscribe(x => this.checkDeviceOperationResult(x, requestCorrelationId));
        return resultSubject;
    }
    checkDeviceOperationResult(deviceOperationResult, requestCorrelationId) {
        if (!deviceOperationResult.IsSuccessful) {
            this.popRequestSubject(requestCorrelationId.toString()).next(false);
        }
    }
    handleGrantedEvent(event) {
        const requestId = event.RequestId.toString();
        let requestSubject = this.popRequestSubject(requestId);
        if (!requestSubject) {
            return;
        }
        requestSubject.next(true);
    }
    handleDeniedEvent(event) {
        const requestId = event.RequestId.toString();
        let requestSubject = this.popRequestSubject(requestId);
        if (!requestSubject) {
            return;
        }
        requestSubject.next(false);
    }
    popRequestSubject(requestId) {
        let subject = this._deviceLeaseRequestSubjects[requestId];
        if (!subject) {
            return;
        }
        delete this._deviceLeaseRequestSubjects[requestId];
        return subject;
    }
};
DeviceLeaseService.ctorParameters = () => [
    { type: _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_3__["HardwareLeaseService"] },
    { type: _api_core_services_core_event_connection_service__WEBPACK_IMPORTED_MODULE_4__["CoreEventConnectionService"] }
];
DeviceLeaseService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DeviceLeaseService);



/***/ }),

/***/ "./src/app/shared/services/devices/device-location-access.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/shared/services/devices/device-location-access.service.ts ***!
  \***************************************************************************/
/*! exports provided: DeviceLocationAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceLocationAccessService", function() { return DeviceLocationAccessService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _carousel_location_access_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel-location-access.service */ "./src/app/shared/services/devices/carousel-location-access.service.ts");
/* harmony import */ var _open_storage_location_access_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./open-storage-location-access.service */ "./src/app/shared/services/devices/open-storage-location-access.service.ts");




let DeviceLocationAccessService = class DeviceLocationAccessService {
    constructor(carouselLocationAccessService, openStorageLocationAccessService) {
        this._services = [];
        this._services.push(carouselLocationAccessService);
        this._services.push(openStorageLocationAccessService);
    }
    accessLocation(deviceLocation, displayData) {
        let service = this._services.find(x => x.deviceLocationTypeId == deviceLocation.deviceLocationTypeId);
        return service.accessLocation(deviceLocation, displayData);
    }
};
DeviceLocationAccessService.ctorParameters = () => [
    { type: _carousel_location_access_service__WEBPACK_IMPORTED_MODULE_2__["CarouselLocationAccessService"] },
    { type: _open_storage_location_access_service__WEBPACK_IMPORTED_MODULE_3__["OpenStorageLocationAccessService"] }
];
DeviceLocationAccessService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DeviceLocationAccessService);



/***/ }),

/***/ "./src/app/shared/services/devices/device-operation-outcome-mapper.service.ts":
/*!************************************************************************************!*\
  !*** ./src/app/shared/services/devices/device-operation-outcome-mapper.service.ts ***!
  \************************************************************************************/
/*! exports provided: DeviceOperationOutcomeMapperService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceOperationOutcomeMapperService", function() { return DeviceOperationOutcomeMapperService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _enums_device_operation_outcome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enums/device-operation-outcome */ "./src/app/shared/enums/device-operation-outcome.ts");
/* harmony import */ var _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/device-location-access-result */ "./src/app/shared/enums/device-location-access-result.ts");




let DeviceOperationOutcomeMapperService = class DeviceOperationOutcomeMapperService {
    constructor() { }
    mapOutcomeToAccessResult(outcome) {
        if (outcome === _enums_device_operation_outcome__WEBPACK_IMPORTED_MODULE_2__["DeviceOperationOutcome"].DeviceOfflineOrNotFound) {
            return _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__["DeviceLocationAccessResult"].DeviceNotOnline;
        }
        if (outcome === _enums_device_operation_outcome__WEBPACK_IMPORTED_MODULE_2__["DeviceOperationOutcome"].DeviceInactive) {
            return _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__["DeviceLocationAccessResult"].DeviceInactive;
        }
        if (outcome === _enums_device_operation_outcome__WEBPACK_IMPORTED_MODULE_2__["DeviceOperationOutcome"].DeviceNotLeasedToClient) {
            return _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__["DeviceLocationAccessResult"].LeaseNotAvailable;
        }
        return _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__["DeviceLocationAccessResult"].Failed;
    }
};
DeviceOperationOutcomeMapperService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DeviceOperationOutcomeMapperService);



/***/ }),

/***/ "./src/app/shared/services/devices/open-storage-location-access.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/shared/services/devices/open-storage-location-access.service.ts ***!
  \*********************************************************************************/
/*! exports provided: OpenStorageLocationAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenStorageLocationAccessService", function() { return OpenStorageLocationAccessService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/device-location-type-id */ "./src/app/shared/constants/device-location-type-id.ts");
/* harmony import */ var _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/device-location-access-result */ "./src/app/shared/enums/device-location-access-result.ts");
/* harmony import */ var _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api-core/services/hardware-lease-service */ "./src/app/api-core/services/hardware-lease-service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _api_core_data_contracts_lease_verification_result__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../api-core/data-contracts/lease-verification-result */ "./src/app/api-core/data-contracts/lease-verification-result.ts");







let OpenStorageLocationAccessService = class OpenStorageLocationAccessService {
    constructor(hardwareLeaseService) {
        this.hardwareLeaseService = hardwareLeaseService;
        this.deviceLocationTypeId = _constants_device_location_type_id__WEBPACK_IMPORTED_MODULE_2__["DeviceLocationTypeId"].OpenStorage;
    }
    accessLocation(deviceLocation, displayData) {
        let hasLease$ = this.hardwareLeaseService.HasDeviceLease(deviceLocation.deviceId);
        return hasLease$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(x => this.mapLeaseResult(x)));
    }
    mapLeaseResult(result) {
        if (result === _api_core_data_contracts_lease_verification_result__WEBPACK_IMPORTED_MODULE_6__["LeaseVerificationResult"].Success) {
            return _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__["DeviceLocationAccessResult"].Succeeded;
        }
        return _enums_device_location_access_result__WEBPACK_IMPORTED_MODULE_3__["DeviceLocationAccessResult"].LeaseNotAvailable;
    }
};
OpenStorageLocationAccessService.ctorParameters = () => [
    { type: _api_core_services_hardware_lease_service__WEBPACK_IMPORTED_MODULE_4__["HardwareLeaseService"] }
];
OpenStorageLocationAccessService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], OpenStorageLocationAccessService);



/***/ }),

/***/ "./src/app/shared/services/event-connection.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/services/event-connection.service.ts ***!
  \*************************************************************/
/*! exports provided: EventConnectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventConnectionService", function() { return EventConnectionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var oal_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! oal-core */ "../../node_modules/oal-core/fesm2015/oal-core.js");
/* harmony import */ var _ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _hub_configuration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hub-configuration.service */ "./src/app/shared/services/hub-configuration.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");






let EventConnectionService = class EventConnectionService extends oal_core__WEBPACK_IMPORTED_MODULE_2__["HubConnectionBase"] {
    constructor(loggerService, deferredUtility, configurationService, hubConfigurationService, ocapUrlBuilderService) {
        super(loggerService, deferredUtility, configurationService);
        this.loggerService = loggerService;
        this.hubConfigurationService = hubConfigurationService;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.startedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this.isConnectedStarted = false;
        this.SubscribeToConnectionEvents();
    }
    get isConnected() {
        return this.isConnectedStarted;
    }
    startUp() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('EventConnectionService.Startup called, current connection alive: ' + this.isConnectionAlive().toString());
            if (this.isConnectedStarted) {
                // Connection is already started - it will handle reconnections on it's own until disconnected.
                return;
            }
            yield this.start(this.ocapUrlBuilderService.buildUrl(''), this.hubConfigurationService.hubName);
            console.log('EventConnectionService.Startup complete, current connection alive: ' + this.isConnectionAlive().toString());
        });
    }
    /* istanbul ignore next */
    onReceived(message) {
        const refMap = {};
        const eventArgsAsAny = message;
        if (eventArgsAsAny.M === 'RegisterClientInfo') {
            // This is a registration message we will get when connecting, not always on each connection.
            // Instead of treating it like an event, stop it here, log it for tracking.
            console.log(message);
            return;
        }
        const serializedObject = eventArgsAsAny.A[0];
        // The function below resolves circular dependencies in JSON when using JSON.NET
        // PreserveReferencesHandling settings.  Angular JSON won't resolve these for you.
        const deserializedObject = JSON.parse(serializedObject, function (key, value) {
            if (key === '$id') {
                // Since we are in a separate function 'this' is local
                refMap[value] = this;
                return value;
            }
            if (value && value.$ref) {
                return refMap[value.$ref];
            }
            return value;
        });
        this.receivedSubject.next(deserializedObject);
        return;
    }
    SubscribeToConnectionEvents() {
        this.connectionStartedSubject.subscribe(() => { this.startedSubject.next(); this.isConnectedStarted = true; });
        this.disconnectedSubject.subscribe(() => { this.startedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1); this.isConnectedStarted = false; });
    }
};
EventConnectionService.ctorParameters = () => [
    { type: oal_core__WEBPACK_IMPORTED_MODULE_2__["LoggerService"] },
    { type: oal_core__WEBPACK_IMPORTED_MODULE_2__["DeferredUtility"] },
    { type: oal_core__WEBPACK_IMPORTED_MODULE_2__["ConfigurationService"] },
    { type: _hub_configuration_service__WEBPACK_IMPORTED_MODULE_4__["HubConfigurationService"] },
    { type: _ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] }
];
EventConnectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], EventConnectionService);



/***/ }),

/***/ "./src/app/shared/services/hub-configuration.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/services/hub-configuration.service.ts ***!
  \**************************************************************/
/*! exports provided: HubConfigurationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubConfigurationService", function() { return HubConfigurationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _constants_hub_configuration_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/hub-configuration-constants */ "./src/app/shared/constants/hub-configuration-constants.ts");



let HubConfigurationService = class HubConfigurationService {
    constructor() {
        this._hubName = _constants_hub_configuration_constants__WEBPACK_IMPORTED_MODULE_2__["HubConfigurationConstants"].hubName;
    }
    get hubName() {
        return this._hubName;
    }
};
HubConfigurationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], HubConfigurationService);



/***/ }),

/***/ "./src/app/shared/services/local-storage.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared/services/local-storage.service.ts ***!
  \**********************************************************/
/*! exports provided: LocalStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return LocalStorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _window_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./window-service */ "./src/app/shared/services/window-service.ts");



let LocalStorageService = class LocalStorageService {
    constructor(windowService) {
        if (windowService.nativeWindow) {
            this.localStorage = windowService.nativeWindow['localStorage'];
        }
    }
    get name() {
        return this.localStorage.name;
    }
    get length() {
        return this.localStorage.length;
    }
    clear() {
        if (!this.localStorage) {
            return;
        }
        this.localStorage.clear();
    }
    getItem(key) {
        if (!this.localStorage) {
            return;
        }
        return this.localStorage.getItem(key);
    }
    key(index) {
        if (!this.localStorage) {
            return;
        }
        return this.localStorage.key(index);
    }
    removeItem(key) {
        if (!this.localStorage) {
            return;
        }
        this.localStorage.removeItem(key);
    }
    setItemObject(key, value) {
        var valueString = JSON.stringify(value);
        this.setItem(key, valueString);
    }
    setItem(key, value) {
        if (!this.localStorage) {
            return;
        }
        this.localStorage.setItem(key, value);
    }
};
LocalStorageService.ctorParameters = () => [
    { type: _window_service__WEBPACK_IMPORTED_MODULE_2__["WindowService"] }
];
LocalStorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], LocalStorageService);



/***/ }),

/***/ "./src/app/shared/services/ocap-http-configuration.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/services/ocap-http-configuration.service.ts ***!
  \********************************************************************/
/*! exports provided: OcapHttpConfigurationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OcapHttpConfigurationService", function() { return OcapHttpConfigurationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var oal_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! oal-core */ "../../node_modules/oal-core/fesm2015/oal-core.js");



let OcapHttpConfigurationService = class OcapHttpConfigurationService {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    get() {
        if (!this.ocapHttpConfiguration) {
            this.setConfiguration();
        }
        return this.ocapHttpConfiguration;
    }
    setConfiguration() {
        const clientId = this.configurationService.getItem('clientid');
        const apiKey = this.configurationService.getItem('apiKey');
        const machineName = this.configurationService.getItem('machinename');
        const ocapclientName = this.configurationService.getItem('clientname');
        const ocapserverip = this.configurationService.getItem('ocapserverip');
        const ocapport = this.configurationService.getItem('port');
        const ocapsecured = this.configurationService.getItem('usesecured');
        const ocaplocale = this.configurationService.getItem('userlocale');
        if (!ocapserverip) {
            this.ocapHttpConfiguration = { apiKey: '', machineName: '', clientId: '', ocapServerIP: '', port: '',
                useSecured: 'true', userLocale: 'en-US', clientName: 'CpmAngular' };
            return;
        }
        this.ocapHttpConfiguration = { apiKey: apiKey, machineName: machineName, clientId: clientId, ocapServerIP: ocapserverip,
            port: ocapport, useSecured: ocapsecured, userLocale: ocaplocale,
            clientName: ocapclientName == null ? 'CpmAngular' : ocapclientName };
    }
};
OcapHttpConfigurationService.ctorParameters = () => [
    { type: oal_core__WEBPACK_IMPORTED_MODULE_2__["ConfigurationService"] }
];
OcapHttpConfigurationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], OcapHttpConfigurationService);



/***/ }),

/***/ "./src/app/shared/services/ocap-http-headers.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/services/ocap-http-headers.service.ts ***!
  \**************************************************************/
/*! exports provided: OcapHttpHeadersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OcapHttpHeadersService", function() { return OcapHttpHeadersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _constants_ocap_configuration_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/ocap-configuration-constants */ "./src/app/shared/constants/ocap-configuration-constants.ts");
/* harmony import */ var _ocap_http_configuration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ocap-http-configuration.service */ "./src/app/shared/services/ocap-http-configuration.service.ts");





let OcapHttpHeadersService = class OcapHttpHeadersService {
    constructor(ocapHttpConfigurationService) {
        this.ocapHttpConfigurationService = ocapHttpConfigurationService;
    }
    getHeaders() {
        var ocapHttpConfig = this.ocapHttpConfigurationService.get();
        var headers = {};
        headers[_constants_ocap_configuration_constants__WEBPACK_IMPORTED_MODULE_3__["OcapConfigurationConstants"].apiKeyHeader] = ocapHttpConfig.apiKey;
        headers[_constants_ocap_configuration_constants__WEBPACK_IMPORTED_MODULE_3__["OcapConfigurationConstants"].machineNameHeader] = ocapHttpConfig.machineName;
        headers[_constants_ocap_configuration_constants__WEBPACK_IMPORTED_MODULE_3__["OcapConfigurationConstants"].clientIdHeader] = ocapHttpConfig.clientId;
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"](headers);
    }
};
OcapHttpHeadersService.ctorParameters = () => [
    { type: _ocap_http_configuration_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpConfigurationService"] }
];
OcapHttpHeadersService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], OcapHttpHeadersService);



/***/ }),

/***/ "./src/app/shared/services/ocap-url-builder.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/services/ocap-url-builder.service.ts ***!
  \*************************************************************/
/*! exports provided: OcapUrlBuilderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OcapUrlBuilderService", function() { return OcapUrlBuilderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ocap_http_configuration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ocap-http-configuration.service */ "./src/app/shared/services/ocap-http-configuration.service.ts");



let OcapUrlBuilderService = class OcapUrlBuilderService {
    constructor(ocapHttpConfigurationService) {
        this.ocapHttpConfigurationService = ocapHttpConfigurationService;
    }
    buildUrl(fragment) {
        var config = this.ocapHttpConfigurationService.get();
        var ipAddress = config.ocapServerIP;
        var port = config.port;
        var protocol = config.useSecured ? 'https' : 'http';
        return `${protocol}://${ipAddress}:${port}${fragment}`;
    }
};
OcapUrlBuilderService.ctorParameters = () => [
    { type: _ocap_http_configuration_service__WEBPACK_IMPORTED_MODULE_2__["OcapHttpConfigurationService"] }
];
OcapUrlBuilderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], OcapUrlBuilderService);



/***/ }),

/***/ "./src/app/shared/services/system-configuration.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/services/system-configuration.service.ts ***!
  \*****************************************************************/
/*! exports provided: SystemConfigurationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemConfigurationService", function() { return SystemConfigurationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ocap-url-builder.service */ "./src/app/shared/services/ocap-url-builder.service.ts");
/* harmony import */ var _ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ocap-http-headers.service */ "./src/app/shared/services/ocap-http-headers.service.ts");





let SystemConfigurationService = class SystemConfigurationService {
    constructor(httpClient, ocapUrlBuilderService, ocapHttpHeadersService) {
        this.httpClient = httpClient;
        this.ocapUrlBuilderService = ocapUrlBuilderService;
        this.ocapHttpHeadersService = ocapHttpHeadersService;
    }
    GetConfigurationValues(categoryId, subCategoryId) {
        const url = this.ocapUrlBuilderService.buildUrl('/api/configuration/Get');
        const params = { category: categoryId, subCategory: subCategoryId };
        return this.httpClient.get(url, {
            headers: this.ocapHttpHeadersService.getHeaders(), params
        });
    }
};
SystemConfigurationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _ocap_url_builder_service__WEBPACK_IMPORTED_MODULE_3__["OcapUrlBuilderService"] },
    { type: _ocap_http_headers_service__WEBPACK_IMPORTED_MODULE_4__["OcapHttpHeadersService"] }
];
SystemConfigurationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], SystemConfigurationService);



/***/ }),

/***/ "./src/app/shared/services/window-service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/services/window-service.ts ***!
  \***************************************************/
/*! exports provided: WindowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return WindowService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");



let WindowService = class WindowService {
    constructor(platformId) {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(platformId)) {
            this.windowRef = window;
        }
        else {
            this.windowRef = null;
        }
    }
    get nativeWindow() {
        return this.windowRef;
    }
};
WindowService.ctorParameters = () => [
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"],] }] }
];
WindowService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]))
], WindowService);



/***/ }),

/***/ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts ***!
  \****************************************************************************************/
/*! exports provided: WpfActionControllerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WpfActionControllerService", function() { return WpfActionControllerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _window_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../window-service */ "./src/app/shared/services/window-service.ts");
/* harmony import */ var _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/services/event-connection.service */ "./src/app/shared/services/event-connection.service.ts");







let WpfActionControllerService = class WpfActionControllerService {
    constructor(windowService, location, router, eventConnectionService) {
        this.location = location;
        this.router = router;
        this.eventConnectionService = eventConnectionService;
        if (windowService.nativeWindow) {
            this.wpfActionController = windowService.nativeWindow['actionController'];
        }
    }
    ExecuteBackAction() {
        if (this.wpfActionController != null) {
            this.eventConnectionService.stop();
            this.wpfActionController.executeBackAction();
        }
        else {
            this.location.back();
        }
    }
    /* istanbul ignore next */
    ExecuteContinueAction() {
        if (this.wpfActionController != null) {
            this.eventConnectionService.stop();
            this.wpfActionController.executeContinueAction();
        }
    }
    ExecuteContinueNavigationWithDataAction(data) {
        this.wpfActionController.executeContinueNavigationWithDataAction(data);
    }
    ;
    ExecuteContinueNavigationAction(newRoute, queryParams) {
        if (this.wpfActionController != null) {
            var httpParamsObj = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]();
            for (var i in queryParams) {
                httpParamsObj = httpParamsObj.set(i, queryParams[i]);
            }
            var qs = httpParamsObj.toString();
            var fragment = queryParams ? `${newRoute}?${qs}` : newRoute;
            this.eventConnectionService.stop();
            this.wpfActionController.executeContinueNavigationAction(fragment);
        }
        else {
            this.router.navigate([newRoute], { queryParams: queryParams, preserveQueryParams: false });
        }
    }
    /* istanbul ignore next */
    ExecuteWpfContinueNavigationAction(action) {
        if (this.wpfActionController != null) {
            this.eventConnectionService.stop();
            this.wpfActionController.executeWpfContinueNavigationAction(action);
        }
    }
};
WpfActionControllerService.ctorParameters = () => [
    { type: _window_service__WEBPACK_IMPORTED_MODULE_5__["WindowService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_6__["EventConnectionService"] }
];
WpfActionControllerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], WpfActionControllerService);



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _components_header_container_header_container_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/header-container/header-container.component */ "./src/app/shared/components/header-container/header-container.component.ts");
/* harmony import */ var _pipes_search_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pipes/search.pipe */ "./src/app/shared/pipes/search.pipe.ts");
/* harmony import */ var _components_col_header_sortable_col_header_sortable_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/col-header-sortable/col-header-sortable.component */ "./src/app/shared/components/col-header-sortable/col-header-sortable.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _directives_grid_multi_select_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./directives/grid-multi-select.directive */ "./src/app/shared/directives/grid-multi-select.directive.ts");
/* harmony import */ var _directives_grid_reorder_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directives/grid-reorder.directive */ "./src/app/shared/directives/grid-reorder.directive.ts");
/* harmony import */ var _components_row_reorder_buttons_row_reorder_buttons_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/row-reorder-buttons/row-reorder-buttons.component */ "./src/app/shared/components/row-reorder-buttons/row-reorder-buttons.component.ts");
/* harmony import */ var _components_text_result_popup_text_result_popup_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/text-result-popup/text-result-popup.component */ "./src/app/shared/components/text-result-popup/text-result-popup.component.ts");
/* harmony import */ var _components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/confirm-popup/confirm-popup.component */ "./src/app/shared/components/confirm-popup/confirm-popup.component.ts");
/* harmony import */ var _components_header_title_bottom_margin_container_header_title_bottom_margin_container_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/header-title-bottom-margin-container/header-title-bottom-margin-container.component */ "./src/app/shared/components/header-title-bottom-margin-container/header-title-bottom-margin-container.component.ts");
/* harmony import */ var _components_device_location_access_device_location_access_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/device-location-access/device-location-access.component */ "./src/app/shared/components/device-location-access/device-location-access.component.ts");
/* harmony import */ var _components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/spinner-popup/spinner-popup.component */ "./src/app/shared/components/spinner-popup/spinner-popup.component.ts");

















let SharedModule = class SharedModule {
};
SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _components_header_container_header_container_component__WEBPACK_IMPORTED_MODULE_4__["HeaderContainerComponent"],
            _pipes_search_pipe__WEBPACK_IMPORTED_MODULE_5__["SearchPipe"],
            _components_col_header_sortable_col_header_sortable_component__WEBPACK_IMPORTED_MODULE_6__["ColHeaderSortableComponent"],
            _directives_grid_multi_select_directive__WEBPACK_IMPORTED_MODULE_9__["GridMultiSelectDirective"],
            _directives_grid_reorder_directive__WEBPACK_IMPORTED_MODULE_10__["GridReorderDirective"],
            _components_row_reorder_buttons_row_reorder_buttons_component__WEBPACK_IMPORTED_MODULE_11__["RowReorderButtonsComponent"],
            _components_text_result_popup_text_result_popup_component__WEBPACK_IMPORTED_MODULE_12__["TextResultPopupComponent"],
            _components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_13__["ConfirmPopupComponent"],
            _components_header_title_bottom_margin_container_header_title_bottom_margin_container_component__WEBPACK_IMPORTED_MODULE_14__["HeaderTitleBottomMarginContainerComponent"],
            _components_device_location_access_device_location_access_component__WEBPACK_IMPORTED_MODULE_15__["DeviceLocationAccessComponent"],
            _components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_16__["SpinnerPopupComponent"],
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["SvgIconModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["InputsModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["CheckboxModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["ButtonActionModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["PopupWindowModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_8__["FooterModule"],
        ],
        exports: [
            _components_header_container_header_container_component__WEBPACK_IMPORTED_MODULE_4__["HeaderContainerComponent"],
            _components_col_header_sortable_col_header_sortable_component__WEBPACK_IMPORTED_MODULE_6__["ColHeaderSortableComponent"],
            _pipes_search_pipe__WEBPACK_IMPORTED_MODULE_5__["SearchPipe"],
            _directives_grid_multi_select_directive__WEBPACK_IMPORTED_MODULE_9__["GridMultiSelectDirective"],
            _components_row_reorder_buttons_row_reorder_buttons_component__WEBPACK_IMPORTED_MODULE_11__["RowReorderButtonsComponent"],
            _directives_grid_reorder_directive__WEBPACK_IMPORTED_MODULE_10__["GridReorderDirective"],
            _components_text_result_popup_text_result_popup_component__WEBPACK_IMPORTED_MODULE_12__["TextResultPopupComponent"],
            _components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_16__["SpinnerPopupComponent"],
            _components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_13__["ConfirmPopupComponent"],
            _components_header_title_bottom_margin_container_header_title_bottom_margin_container_component__WEBPACK_IMPORTED_MODULE_14__["HeaderTitleBottomMarginContainerComponent"],
            _components_device_location_access_device_location_access_component__WEBPACK_IMPORTED_MODULE_15__["DeviceLocationAccessComponent"],
        ],
        entryComponents: [
            _components_text_result_popup_text_result_popup_component__WEBPACK_IMPORTED_MODULE_12__["TextResultPopupComponent"],
            _components_confirm_popup_confirm_popup_component__WEBPACK_IMPORTED_MODULE_13__["ConfirmPopupComponent"],
            _components_spinner_popup_spinner_popup_component__WEBPACK_IMPORTED_MODULE_16__["SpinnerPopupComponent"],
        ]
    })
], SharedModule);



/***/ }),

/***/ "./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "oc-grid {\n  height: 90%;\n}\n\n:host {\n  height: 100%;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n\n.searchbox {\n  width: 410px;\n  align-self: right;\n}\n\n.badge {\n  position: relative;\n  bottom: 10px;\n  right: -100px;\n}\n\n.cpmwarningtext {\n  font-size: 14px;\n  color: maroon;\n}\n\n.downarrow {\n  transform: rotate(45deg);\n  background-color: pink;\n}\n\n.uparrow {\n  transform: rotate(0deg);\n}\n\n.headertext {\n  float: left;\n}\n\n.headericon {\n  position: relative;\n  left: 15px;\n  top: 3px;\n  float: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIvWHIyLUV4Y2VwdGlvbnMtcGFnZS9DOlxcVXNlcnNcXDcxNzhcXHNvdXJjZVxccmVwb3NcXENQTS1Bbmd1bGFyTGlicmFyeS9wcm9qZWN0c1xcY3BtLWFwcFxcc3JjXFxhcHBcXHhyMlxcWHIyLUV4Y2VwdGlvbnMtcGFnZVxceHIyLWV4Y2VwdGlvbnMtcGFnZS5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIvWHIyLUV4Y2VwdGlvbnMtcGFnZS94cjItZXhjZXB0aW9ucy1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0VBQ0EsYUFBQTtBQ0NGOztBREVBO0VBQ0Usd0JBQUE7RUFDQSxzQkFBQTtBQ0NGOztBREVBO0VBQ0UsdUJBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0FDQ0YiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3hyMi9YcjItRXhjZXB0aW9ucy1wYWdlL3hyMi1leGNlcHRpb25zLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJvYy1ncmlke1xyXG4gIGhlaWdodDogOTAlO1xyXG59XHJcblxyXG46aG9zdHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbjpob3N0IDo6bmctZGVlcCBvYy1ncmlke1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxufVxyXG5cclxuLnNlYXJjaGJveHtcclxuICB3aWR0aDogNDEwcHg7IFxyXG4gIGFsaWduLXNlbGY6IHJpZ2h0O1xyXG59XHJcblxyXG4uYmFkZ2Uge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBib3R0b206IDEwcHg7XHJcbiAgcmlnaHQ6IC0xMDBweDtcclxufVxyXG5cclxuLmNwbXdhcm5pbmd0ZXh0e1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogbWFyb29uO1xyXG59XHJcblxyXG4uZG93bmFycm93e1xyXG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xyXG59XHJcblxyXG4udXBhcnJvd3tcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxufVxyXG5cclxuLmhlYWRlcnRleHR7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuXHJcbi5oZWFkZXJpY29ue1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBsZWZ0OiAxNXB4O1xyXG4gIHRvcDogM3B4O1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG59Iiwib2MtZ3JpZCB7XG4gIGhlaWdodDogOTAlO1xufVxuXG46aG9zdCB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIG9jLWdyaWQge1xuICBmb250LXNpemU6IDIycHg7XG59XG5cbi5zZWFyY2hib3gge1xuICB3aWR0aDogNDEwcHg7XG4gIGFsaWduLXNlbGY6IHJpZ2h0O1xufVxuXG4uYmFkZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvdHRvbTogMTBweDtcbiAgcmlnaHQ6IC0xMDBweDtcbn1cblxuLmNwbXdhcm5pbmd0ZXh0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogbWFyb29uO1xufVxuXG4uZG93bmFycm93IHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xufVxuXG4udXBhcnJvdyB7XG4gIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xufVxuXG4uaGVhZGVydGV4dCB7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG4uaGVhZGVyaWNvbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogMTVweDtcbiAgdG9wOiAzcHg7XG4gIGZsb2F0OiBsZWZ0O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.ts ***!
  \**************************************************************************/
/*! exports provided: Xr2ExceptionsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xr2ExceptionsPageComponent", function() { return Xr2ExceptionsPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _model_xr2_exceptions_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/xr2-exceptions-item */ "./src/app/xr2/model/xr2-exceptions-item.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/sort-direction */ "./src/app/shared/constants/sort-direction.ts");
/* harmony import */ var _api_xr2_services_xr2_exceptions_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../api-xr2/services/xr2-exceptions.service */ "./src/app/api-xr2/services/xr2-exceptions.service.ts");










let Xr2ExceptionsPageComponent = class Xr2ExceptionsPageComponent {
    constructor(exceptionsListService, wpfActionControllerService) {
        this.exceptionsListService = exceptionsListService;
        this.wpfActionControllerService = wpfActionControllerService;
        this.trayIDPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("TrayID");
        this.trayTypePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("TrayDescription");
        this.exceptionPocketsPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("ExceptionPockets");
        this.deviceNamePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("DeviceName");
        this.completedDatePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("CompletedDateTime");
        this.currentSortPropertyName = this.completedDatePropertyName;
        this.sortOrder = _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_8__["SortDirection"].descending;
        this.searchFields = [this.trayIDPropertyName, this.exceptionPocketsPropertyName, this.trayTypePropertyName, this.deviceNamePropertyName];
    }
    ngOnInit() {
        this.displayExceptionsList$ = this.exceptionsListService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(guidedDeviceListItems => {
            return this.sort(guidedDeviceListItems.map(p => new _model_xr2_exceptions_item__WEBPACK_IMPORTED_MODULE_2__["Xr2ExceptionsItem"](p)), _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_8__["SortDirection"].descending);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
    }
    ngAfterViewInit() {
        this.searchSub = this.searchElement.searchOutput$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((searchData) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(searchData);
        }))
            .subscribe(data => {
            this.searchTextFilter = data;
        });
    }
    columnSelected(event) {
        this.currentSortPropertyName = event.ColumnPropertyName;
        this.sortOrder = event.SortDirection;
        this.displayExceptionsList$ = this.displayExceptionsList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(exceptions => {
            return this.sort(exceptions, event.SortDirection);
        }));
    }
    sort(devices, sortDirection) {
        return lodash__WEBPACK_IMPORTED_MODULE_6__["orderBy"](devices, x => x[this.currentSortPropertyName], sortDirection);
    }
    ngOnDestroy() {
        if (this.searchSub) {
            this.searchSub.unsubscribe();
        }
    }
    navigatedetailspage(exceptions) {
        this.wpfActionControllerService.ExecuteContinueNavigationAction(`stocking/exceptiondetails`, { TrayID: exceptions.TrayID.toString(), DeviceID: exceptions.DeviceID, CompletedDateTime: exceptions.CompletedDateTime, DeviceName: exceptions.DeviceName, TrayDescription: exceptions.TrayDescription });
    }
};
Xr2ExceptionsPageComponent.ctorParameters = () => [
    { type: _api_xr2_services_xr2_exceptions_service__WEBPACK_IMPORTED_MODULE_9__["Xr2ExceptionsService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_5__["WpfActionControllerService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBox', null)
], Xr2ExceptionsPageComponent.prototype, "searchElement", void 0);
Xr2ExceptionsPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-xr2-exceptions-page',
        template: __webpack_require__(/*! raw-loader!./xr2-exceptions-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.html"),
        styles: [__webpack_require__(/*! ./xr2-exceptions-page.component.scss */ "./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.scss")]
    })
], Xr2ExceptionsPageComponent);



/***/ }),

/***/ "./src/app/xr2/model/picklist-queue-item.ts":
/*!**************************************************!*\
  !*** ./src/app/xr2/model/picklist-queue-item.ts ***!
  \**************************************************/
/*! exports provided: PicklistQueueItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistQueueItem", function() { return PicklistQueueItem; });
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! guid-typescript */ "../../node_modules/guid-typescript/dist/guid.js");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(guid_typescript__WEBPACK_IMPORTED_MODULE_0__);

class PicklistQueueItem {
    constructor(picklistQueueItem) {
        Object.assign(this, picklistQueueItem);
        this.TrackById = guid_typescript__WEBPACK_IMPORTED_MODULE_0__["Guid"].create();
    }
}
PicklistQueueItem.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/xr2/model/xr2-exception-details-item.ts":
/*!*********************************************************!*\
  !*** ./src/app/xr2/model/xr2-exception-details-item.ts ***!
  \*********************************************************/
/*! exports provided: Xr2ExceptionDetailsItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xr2ExceptionDetailsItem", function() { return Xr2ExceptionDetailsItem; });
class Xr2ExceptionDetailsItem {
    constructor(xr2ExceptiondetailsItem) {
        Object.assign(this, xr2ExceptiondetailsItem);
    }
}
Xr2ExceptionDetailsItem.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/xr2/model/xr2-exceptions-item.ts":
/*!**************************************************!*\
  !*** ./src/app/xr2/model/xr2-exceptions-item.ts ***!
  \**************************************************/
/*! exports provided: Xr2ExceptionsItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xr2ExceptionsItem", function() { return Xr2ExceptionsItem; });
class Xr2ExceptionsItem {
    constructor(xr2ExceptionsItem) {
        Object.assign(this, xr2ExceptionsItem);
    }
}
Xr2ExceptionsItem.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/xr2/picklists-queue-page/picklists-queue-page.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/xr2/picklists-queue-page/picklists-queue-page.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIvcGlja2xpc3RzLXF1ZXVlLXBhZ2UvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvcHJvamVjdHNcXGNwbS1hcHBcXHNyY1xcYXBwXFx4cjJcXHBpY2tsaXN0cy1xdWV1ZS1wYWdlXFxwaWNrbGlzdHMtcXVldWUtcGFnZS5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIvcGlja2xpc3RzLXF1ZXVlLXBhZ2UvcGlja2xpc3RzLXF1ZXVlLXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FDQ0YiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3hyMi9waWNrbGlzdHMtcXVldWUtcGFnZS9waWNrbGlzdHMtcXVldWUtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0e1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG4iLCI6aG9zdCB7XG4gIGhlaWdodDogMTAwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/xr2/picklists-queue-page/picklists-queue-page.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/xr2/picklists-queue-page/picklists-queue-page.component.ts ***!
  \****************************************************************************/
/*! exports provided: PicklistsQueuePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistsQueuePageComponent", function() { return PicklistsQueuePageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_xr2_services_picklists_queue_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api-xr2/services/picklists-queue.service */ "./src/app/api-xr2/services/picklists-queue.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _model_picklist_queue_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/picklist-queue-item */ "./src/app/xr2/model/picklist-queue-item.ts");
/* harmony import */ var _services_picklists_queue_event_connection_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/picklists-queue-event-connection.service */ "./src/app/xr2/services/picklists-queue-event-connection.service.ts");






let PicklistsQueuePageComponent = class PicklistsQueuePageComponent {
    constructor(picklistsQueueService, picklistQueueEventConnectionService) {
        this.picklistsQueueService = picklistsQueueService;
        this.picklistQueueEventConnectionService = picklistQueueEventConnectionService;
        this.configureEventHandlers();
    }
    ngOnInit() {
        this.loadPicklistsQueueItems();
    }
    configureEventHandlers() {
        if (!this.picklistQueueEventConnectionService) {
            return;
        }
        this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
            .subscribe(() => this.onReloadPicklistQueueItems());
    }
    onReloadPicklistQueueItems() {
        this.loadPicklistsQueueItems();
    }
    loadPicklistsQueueItems() {
        this.picklistsQueueItems = this.picklistsQueueService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(x => {
            const displayObjects = x.map(picklistQueueItem => new _model_picklist_queue_item__WEBPACK_IMPORTED_MODULE_4__["PicklistQueueItem"](picklistQueueItem));
            return displayObjects;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
    }
};
PicklistsQueuePageComponent.ctorParameters = () => [
    { type: _api_xr2_services_picklists_queue_service__WEBPACK_IMPORTED_MODULE_2__["PicklistsQueueService"] },
    { type: _services_picklists_queue_event_connection_service__WEBPACK_IMPORTED_MODULE_5__["PicklistsQueueEventConnectionService"] }
];
PicklistsQueuePageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-picklists-queue-page',
        template: __webpack_require__(/*! raw-loader!./picklists-queue-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/xr2/picklists-queue-page/picklists-queue-page.component.html"),
        styles: [__webpack_require__(/*! ./picklists-queue-page.component.scss */ "./src/app/xr2/picklists-queue-page/picklists-queue-page.component.scss")]
    })
], PicklistsQueuePageComponent);



/***/ }),

/***/ "./src/app/xr2/picklists-queue/picklists-queue.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/xr2/picklists-queue/picklists-queue.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n\n:host ::ng-deep oc-search-box {\n  width: 358px !important;\n  margin-right: 10px;\n}\n\n.skip-button {\n  float: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIvcGlja2xpc3RzLXF1ZXVlL0M6XFxVc2Vyc1xcNzE3OFxcc291cmNlXFxyZXBvc1xcQ1BNLUFuZ3VsYXJMaWJyYXJ5L3Byb2plY3RzXFxjcG0tYXBwXFxzcmNcXGFwcFxceHIyXFxwaWNrbGlzdHMtcXVldWVcXHBpY2tsaXN0cy1xdWV1ZS5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIvcGlja2xpc3RzLXF1ZXVlL3BpY2tsaXN0cy1xdWV1ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxPQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxlQUFBO0FDRUY7O0FEQUE7RUFDRSx1QkFBQTtFQUNBLGtCQUFBO0FDR0Y7O0FEREE7RUFDRSxZQUFBO0FDSUYiLCJmaWxlIjoicHJvamVjdHMvY3BtLWFwcC9zcmMvYXBwL3hyMi9waWNrbGlzdHMtcXVldWUvcGlja2xpc3RzLXF1ZXVlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3R7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBmbGV4OiAxO1xyXG59XHJcbjpob3N0IDo6bmctZGVlcCBvYy1ncmlke1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxufVxyXG46aG9zdCA6Om5nLWRlZXAgb2Mtc2VhcmNoLWJveHtcclxuICB3aWR0aDogMzU4cHggIWltcG9ydGFudDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuLnNraXAtYnV0dG9uIHtcclxuICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuIiwiOmhvc3Qge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXg6IDE7XG59XG5cbjpob3N0IDo6bmctZGVlcCBvYy1ncmlkIHtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuXG46aG9zdCA6Om5nLWRlZXAgb2Mtc2VhcmNoLWJveCB7XG4gIHdpZHRoOiAzNThweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5za2lwLWJ1dHRvbiB7XG4gIGZsb2F0OiByaWdodDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/xr2/picklists-queue/picklists-queue.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/xr2/picklists-queue/picklists-queue.component.ts ***!
  \******************************************************************/
/*! exports provided: PicklistsQueueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistsQueueComponent", function() { return PicklistsQueueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! guid-typescript */ "../../node_modules/guid-typescript/dist/guid.js");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(guid_typescript__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _api_xr2_data_contracts_global_dispense_sync_request__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../api-xr2/data-contracts/global-dispense-sync-request */ "./src/app/api-xr2/data-contracts/global-dispense-sync-request.ts");
/* harmony import */ var _api_xr2_data_contracts_robot_print_request__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../api-xr2/data-contracts/robot-print-request */ "./src/app/api-xr2/data-contracts/robot-print-request.ts");
/* harmony import */ var _api_xr2_data_contracts_pick_list_line_detail__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../api-xr2/data-contracts/pick-list-line-detail */ "./src/app/api-xr2/data-contracts/pick-list-line-detail.ts");
/* harmony import */ var _model_picklist_queue_item__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../model/picklist-queue-item */ "./src/app/xr2/model/picklist-queue-item.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _api_xr2_services_picklists_queue_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../api-xr2/services/picklists-queue.service */ "./src/app/api-xr2/services/picklists-queue.service.ts");
/* harmony import */ var _services_picklists_queue_event_connection_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../services/picklists-queue-event-connection.service */ "./src/app/xr2/services/picklists-queue-event-connection.service.ts");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../shared/services/window-service */ "./src/app/shared/services/window-service.ts");
/* harmony import */ var _api_xr2_data_contracts_reroute_pick_list_line__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../api-xr2/data-contracts/reroute-pick-list-line */ "./src/app/api-xr2/data-contracts/reroute-pick-list-line.ts");



















let PicklistsQueueComponent = class PicklistsQueueComponent {
    constructor(windowService, picklistsQueueService, dialogService, translateService, actr, picklistQueueEventConnectionService, wpfActionController) {
        this.windowService = windowService;
        this.picklistsQueueService = picklistsQueueService;
        this.dialogService = dialogService;
        this.translateService = translateService;
        this.actr = actr;
        this.picklistQueueEventConnectionService = picklistQueueEventConnectionService;
        this.wpfActionController = wpfActionController;
        this.searchFields = [Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_2__["nameof"])('Destination'), Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_2__["nameof"])('PriorityCodeDescription'),
            ,
            Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_2__["nameof"])('DeviceDescription')];
        this.configureEventHandlers();
    }
    set picklistQueueItems(value) {
        this._picklistQueueItems = value;
        if (this.windowService.nativeWindow) {
            this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
    }
    get picklistQueueItems() {
        return this._picklistQueueItems;
    }
    ngAfterViewInit() {
        this.searchElement.searchOutput$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])((searchData) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(searchData);
        }))
            .subscribe(data => {
            this.searchTextFilter = data;
            if (this.windowService.nativeWindow) {
                this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
            }
        });
    }
    ngOnDestroy() {
    }
    back() {
        this.wpfActionController.ExecuteContinueAction();
    }
    configureEventHandlers() {
        if (!this.picklistQueueEventConnectionService) {
            return;
        }
        this.picklistQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject
            .subscribe(message => this.onAddOrUpdatePicklistQueueItem(message));
        this.picklistQueueEventConnectionService.removePicklistQueueItemSubject
            .subscribe(message => this.onRemovePicklistQueueItem(message));
    }
    onAddOrUpdatePicklistQueueItem(addOrUpdatePicklistQueueItemMessage) {
        const picklistQueueItem = new _model_picklist_queue_item__WEBPACK_IMPORTED_MODULE_12__["PicklistQueueItem"](addOrUpdatePicklistQueueItemMessage.PicklistQueueItem);
        picklistQueueItem.ItemPicklistLines = addOrUpdatePicklistQueueItemMessage.PicklistQueueItem.ItemPicklistLines.$values;
        const matchingPicklistQueueItem = lodash__WEBPACK_IMPORTED_MODULE_6__["find"](this.picklistQueueItems, (x) => {
            return x.OrderId === picklistQueueItem.OrderId && x.Destination === picklistQueueItem.Destination &&
                x.DeviceLocationId === picklistQueueItem.DeviceLocationId;
        });
        if (matchingPicklistQueueItem == null) {
            this.picklistQueueItems.push(picklistQueueItem);
            this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
            return;
        }
        matchingPicklistQueueItem.ItemCount = picklistQueueItem.ItemCount;
        matchingPicklistQueueItem.Status = picklistQueueItem.Status;
        matchingPicklistQueueItem.FilledBoxCount = picklistQueueItem.FilledBoxCount;
        matchingPicklistQueueItem.BoxCount = picklistQueueItem.BoxCount;
        matchingPicklistQueueItem.ItemPicklistLines = picklistQueueItem.ItemPicklistLines;
        this.resyncPickListQueueItem(picklistQueueItem);
        this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
    onRemovePicklistQueueItem(addOrUpdatePicklistQueueItemMessage) {
        const orderDestinationPickLocationKey = addOrUpdatePicklistQueueItemMessage.OrderDestinationPickLocationKey;
        lodash__WEBPACK_IMPORTED_MODULE_6__["remove"](this.picklistQueueItems, (x) => {
            return x.OrderId === orderDestinationPickLocationKey.OrderId && x.DestinationId === orderDestinationPickLocationKey.DestinationId &&
                x.DeviceLocationId === orderDestinationPickLocationKey.DeviceLocationId;
        });
        this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
    resyncPickListQueueItem(picklistQueueItem) {
        picklistQueueItem.TrackById = guid_typescript__WEBPACK_IMPORTED_MODULE_5__["Guid"].create();
    }
    sendToRobot(picklistQueueItem) {
        picklistQueueItem.Saving = true;
        const globalDispenseSyncRequest = new _api_xr2_data_contracts_global_dispense_sync_request__WEBPACK_IMPORTED_MODULE_9__["GlobalDispenseSyncRequest"]();
        globalDispenseSyncRequest.PickListIdentifier = picklistQueueItem.PicklistId;
        globalDispenseSyncRequest.DestinationType = picklistQueueItem.DestinationType;
        globalDispenseSyncRequest.OutputDeviceId = picklistQueueItem.OutputDeviceId;
        lodash__WEBPACK_IMPORTED_MODULE_6__["forEach"](picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
            const pickListLineDetail = new _api_xr2_data_contracts_pick_list_line_detail__WEBPACK_IMPORTED_MODULE_11__["PickListLineDetail"]();
            pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
            pickListLineDetail.DestinationId = itemPicklistLine.DestinationId;
            pickListLineDetail.ItemId = itemPicklistLine.ItemId;
            pickListLineDetail.Quantity = itemPicklistLine.Qty;
            pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
            globalDispenseSyncRequest.PickListLineDetails.push(pickListLineDetail);
        });
        this.picklistsQueueService.sendToRobot(picklistQueueItem.DeviceId, globalDispenseSyncRequest).subscribe(result => {
            picklistQueueItem.Saving = false;
        }, result => {
            picklistQueueItem.Saving = false;
            this.displayFailedToSaveDialog();
        });
        this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
    printLabels(picklistQueueItem) {
        picklistQueueItem.Saving = true;
        const robotPrintRequest = new _api_xr2_data_contracts_robot_print_request__WEBPACK_IMPORTED_MODULE_10__["RobotPrintRequest"]();
        robotPrintRequest.PickListIdentifier = picklistQueueItem.PicklistId;
        lodash__WEBPACK_IMPORTED_MODULE_6__["forEach"](picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
            const pickListLineDetail = new _api_xr2_data_contracts_pick_list_line_detail__WEBPACK_IMPORTED_MODULE_11__["PickListLineDetail"]();
            pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
            pickListLineDetail.ItemId = itemPicklistLine.ItemId;
            pickListLineDetail.Quantity = itemPicklistLine.Qty;
            pickListLineDetail.DestinationType = picklistQueueItem.DestinationType;
            pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
            pickListLineDetail.PickLocationDescription = itemPicklistLine.PickLocationDescription;
            robotPrintRequest.PickListLineDetails.push(pickListLineDetail);
        });
        this.picklistsQueueService.printLabels(picklistQueueItem.DeviceId, robotPrintRequest).subscribe(result => {
            picklistQueueItem.Saving = false;
        }, result => {
            picklistQueueItem.Saving = false;
            this.displayFailedToSaveDialog();
        });
    }
    reroute(picklistQueueItem) {
        picklistQueueItem.Saving = true;
        const reroutePickListLine = new _api_xr2_data_contracts_reroute_pick_list_line__WEBPACK_IMPORTED_MODULE_18__["ReroutePickListLine"]();
        lodash__WEBPACK_IMPORTED_MODULE_6__["forEach"](picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
            reroutePickListLine.PickListLineIds.push(itemPicklistLine.PicklistLineId);
        });
        this.picklistsQueueService.reroute(reroutePickListLine).subscribe(result => {
            picklistQueueItem.Saving = false;
        });
    }
    displayFailedToSaveDialog() {
        const properties = new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogProperties"]('Role-Status-Warning');
        this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
        properties.showPrimaryButton = true;
        properties.showSecondaryButton = false;
        properties.primaryButtonText = 'Ok';
        properties.dialogDisplayType = _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogType"].Error;
        properties.timeoutLength = 60;
        this.dialogService.showOnce(properties);
    }
    trackByPickListQueueItemId(index, picklistQueueItem) {
        if (!picklistQueueItem) {
            return null;
        }
        return picklistQueueItem.TrackById;
    }
    getActiveOutputDeviceList(picklistQueueItem) {
        const outputDeviceDisplayList = [];
        lodash__WEBPACK_IMPORTED_MODULE_6__["forEach"](picklistQueueItem.AvailableOutputDeviceList, (outputDevice) => {
            if (outputDevice.IsActive) {
                let translatedLabel = '';
                this.translateService.get(outputDevice.Label).subscribe((res) => {
                    translatedLabel = res;
                });
                outputDeviceDisplayList.push(new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["SingleselectRowItem"](translatedLabel, outputDevice.DeviceId));
            }
        });
        return outputDeviceDisplayList;
    }
    getSelectedOutputDeviceRow(picklistQueueItem) {
        let selectedDevice = null;
        if (picklistQueueItem.Status === 1) {
            selectedDevice = picklistQueueItem.AvailableOutputDeviceList.find(x => x.DeviceId === picklistQueueItem.OutputDeviceId
                && x.IsActive);
        }
        else {
            selectedDevice = picklistQueueItem.AvailableOutputDeviceList.find(x => x.DeviceId === picklistQueueItem.OutputDeviceId);
        }
        if (!selectedDevice) {
            return null;
        }
        let translatedLabel = '';
        this.translateService.get(selectedDevice.Label).subscribe((res) => {
            translatedLabel = res;
        });
        return new _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["SingleselectRowItem"](translatedLabel, selectedDevice.DeviceId);
    }
    onOutputDeviceSelectionChanged($event, picklistQueueItem) {
        picklistQueueItem.OutputDeviceId = $event.value;
    }
};
PicklistsQueueComponent.ctorParameters = () => [
    { type: _shared_services_window_service__WEBPACK_IMPORTED_MODULE_17__["WindowService"] },
    { type: _api_xr2_services_picklists_queue_service__WEBPACK_IMPORTED_MODULE_14__["PicklistsQueueService"] },
    { type: _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_7__["PopupDialogService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
    { type: _services_picklists_queue_event_connection_service__WEBPACK_IMPORTED_MODULE_15__["PicklistsQueueEventConnectionService"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_16__["WpfActionControllerService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PicklistsQueueComponent.prototype, "picklistQueueItems", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBox', {
        static: true
    })
], PicklistsQueueComponent.prototype, "searchElement", void 0);
PicklistsQueueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-picklists-queue',
        template: __webpack_require__(/*! raw-loader!./picklists-queue.component.html */ "../../node_modules/raw-loader/index.js!./src/app/xr2/picklists-queue/picklists-queue.component.html"),
        styles: [__webpack_require__(/*! ./picklists-queue.component.scss */ "./src/app/xr2/picklists-queue/picklists-queue.component.scss")]
    })
], PicklistsQueueComponent);



/***/ }),

/***/ "./src/app/xr2/services/picklists-queue-event-connection.service.ts":
/*!**************************************************************************!*\
  !*** ./src/app/xr2/services/picklists-queue-event-connection.service.ts ***!
  \**************************************************************************/
/*! exports provided: PicklistsQueueEventConnectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicklistsQueueEventConnectionService", function() { return PicklistsQueueEventConnectionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/event-connection.service */ "./src/app/shared/services/event-connection.service.ts");




let PicklistsQueueEventConnectionService = class PicklistsQueueEventConnectionService {
    constructor(eventConnectionService) {
        this.eventConnectionService = eventConnectionService;
        this.addOrUpdatePicklistQueueItemSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.removePicklistQueueItemSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.reloadPicklistQueueItemsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.eventConnectionService.receivedSubject.subscribe(message => this.configurePicklistEventHandlers(message));
    }
    configurePicklistEventHandlers(message) {
        const messageTypeName = message.$type;
        if (message === undefined) {
            return;
        }
        if (message.EventId === undefined) {
            return;
        }
        if (message.EventId === 'AddOrUpdatePicklistQueueItemMessage') {
            console.log(message);
            this.addOrUpdatePicklistQueueItemSubject.next(message);
            return;
        }
        if (message.EventId === 'RemovePicklistQueueItemMessage') {
            console.log(message);
            this.removePicklistQueueItemSubject.next(message);
            return;
        }
        if (message.EventId === 'ReloadPicklistQueueItemsMessage') {
            console.log(message);
            this.reloadPicklistQueueItemsSubject.next(message);
            return;
        }
    }
};
PicklistsQueueEventConnectionService.ctorParameters = () => [
    { type: _shared_services_event_connection_service__WEBPACK_IMPORTED_MODULE_3__["EventConnectionService"] }
];
PicklistsQueueEventConnectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], PicklistsQueueEventConnectionService);



/***/ }),

/***/ "./src/app/xr2/xr2-exception-details-page/Xr2-Exceptions-details-page.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/xr2/xr2-exception-details-page/Xr2-Exceptions-details-page.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.column {\n  flex-direction: column;\n}\n\noc-grid {\n  height: 90%;\n}\n\n:host {\n  height: 100%;\n}\n\n:host ::ng-deep oc-grid {\n  font-size: 22px;\n}\n\n.badge {\n  position: relative;\n  bottom: 10px;\n  right: -100px;\n}\n\n.cpmwarningtext {\n  font-size: 14px;\n  color: maroon;\n}\n\n.cpmheaderrow {\n  height: 70px;\n}\n\n.downarrow {\n  transform: rotate(45deg);\n  background-color: pink;\n}\n\n.uparrow {\n  transform: rotate(0deg);\n}\n\n.headertext {\n  float: left;\n}\n\n.headericon {\n  position: relative;\n  left: 15px;\n  top: 3px;\n  float: left;\n}\n\n.trayidheader {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 14px;\n  font-weight: 400;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n  padding-right: 180px;\n}\n\n.traytypeheader {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-weight: 400;\n  font-size: 14px;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n  padding-right: 300px;\n}\n\n.devicenameheader {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 14px;\n  font-weight: 400;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n  padding-right: 180px;\n}\n\n.completeddateheader {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 14px;\n  font-weight: 400;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n  padding-right: 180px;\n}\n\n.trayidtext {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 22px;\n  font-weight: 600;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n}\n\n.traytypetext {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 22px;\n  font-weight: 600;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n}\n\n.devicenametext {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 22px;\n  font-weight: 600;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n}\n\n.completeddatetext {\n  font-family: \"Segoe UI\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  font-size: 22px;\n  font-weight: 600;\n  margin-left: 20px;\n  margin-right: 30px;\n  text-align: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIveHIyLWV4Y2VwdGlvbi1kZXRhaWxzLXBhZ2UvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvcHJvamVjdHNcXGNwbS1hcHBcXHNyY1xcYXBwXFx4cjJcXHhyMi1leGNlcHRpb24tZGV0YWlscy1wYWdlXFxYcjItRXhjZXB0aW9ucy1kZXRhaWxzLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAveHIyL3hyMi1leGNlcHRpb24tZGV0YWlscy1wYWdlL1hyMi1FeGNlcHRpb25zLWRldGFpbHMtcGFnZS5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2NwbS1hcHAvc3JjL2FwcC94cjIveHIyLWV4Y2VwdGlvbi1kZXRhaWxzLXBhZ2UvQzpcXFVzZXJzXFw3MTc4XFxzb3VyY2VcXHJlcG9zXFxDUE0tQW5ndWxhckxpYnJhcnkvc3RkaW4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkJBO0VBQ0UsYUFBQTtBQzVCRjs7QUQ4QkE7RUFDRSxPQUFBO0FDM0JGOztBRDZCQTtFQUNFLHNCQUFBO0FDMUJGOztBQ1RBO0VBQ0UsV0FBQTtBRFlGOztBQ1RBO0VBQ0UsWUFBQTtBRFlGOztBQ1RBO0VBQ0UsZUZZZ0I7QUNBbEI7O0FDVEE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FEWUY7O0FDVEE7RUFDRSxlRk1pQjtFRUxqQixhQUFBO0FEWUY7O0FDVEE7RUFFRSxZQUFBO0FEV0Y7O0FDVEE7RUFDRSx3QkFBQTtFQUNBLHNCQUFBO0FEWUY7O0FDVEE7RUFDRSx1QkFBQTtBRFlGOztBQ1RBO0VBQ0UsV0FBQTtBRFlGOztBQ1RBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7QURZRjs7QUNWQTtFQUNFLDZFRjdCdUI7RUU4QnZCLGVGdkJpQjtFRXdCakIsZ0JGVlE7RUVXUixpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBRGFGOztBQ1ZBO0VBQ0UsNkVGdkN1QjtFRXdDdkIsZ0JGbkJRO0VFb0JSLGVGbENpQjtFRW1DakIsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7QURhRjs7QUNYQTtFQUNFLDZFRmhEdUI7RUVpRHZCLGVGMUNpQjtFRTJDakIsZ0JGN0JRO0VFOEJSLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0FEY0Y7O0FDWkE7RUFDRSw2RUZ6RHVCO0VFMER2QixlRm5EaUI7RUVvRGpCLGdCRnRDUTtFRXVDUixpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBRGVGOztBQ2JBO0VBQ0UsNkVGbEV1QjtFRW1FdkIsZUZoRWdCO0VFaUVoQixnQkZqREs7RUVrREwsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FEZ0JGOztBQ2RBO0VBQ0UsNkVGMUV1QjtFRTJFdkIsZUZ4RWdCO0VFeUVoQixnQkZ6REs7RUUwREwsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FEaUJGOztBQ2ZBO0VBQ0UsNkVGbEZ1QjtFRW1GdkIsZUZoRmdCO0VFaUZoQixnQkZqRUs7RUVrRUwsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FEa0JGOztBQ2hCQTtFQUNFLDZFRjFGdUI7RUUyRnZCLGVGeEZnQjtFRXlGaEIsZ0JGekVLO0VFMEVMLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBRG1CRiIsImZpbGUiOiJwcm9qZWN0cy9jcG0tYXBwL3NyYy9hcHAveHIyL3hyMi1leGNlcHRpb24tZGV0YWlscy1wYWdlL1hyMi1FeGNlcHRpb25zLWRldGFpbHMtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRib3JkZXItcmFkaXVzOiA0cHg7XHJcbiRib3JkZXItY29sb3I6ICNhMGEyYTg7XHJcbiRzbGF0ZS1ncmV5OiAjNUU2QTcxO1xyXG4kYnJhbmQtcHJpbWFyeTogIzY5QkUyODtcclxuJGJyYW5kLWxpZ2h0Ymx1ZTogIzk3QzBFNjtcclxuJGJyYW5kLW1lZGl1bWJsdWU6ICM2Njk5Q0M7XHJcbiRicmFuZC1zZWNvbmRhcnk6ICM2OWM7XHJcbiRicmFuZC1pbmZvOiAjMDA2Njk5O1xyXG4kYnJhbmQtd2FybmluZyA6ICNmMGFkNGU7XHJcbiRicmFuZC1kYW5nZXIgOiAjQzgwODE5O1xyXG4kbGlnaHQtZ3JleTogI2RkZDtcclxuJGRhcmstZ3JleTogIzk5OTtcclxuJGFjdGlvbi1ibHVlOiAjNjY5OWNjO1xyXG4kYmFkZ2UtaW5mbzogI0YzRjlGRjtcclxuJHNjcm9sbC1idXR0b24tY29sb3I6ICNhMGEyYTg7XHJcbiRzY3JvbGwtYmFyLWNvbG9yOiAjRURFREVFO1xyXG5cclxuJHRleHQtY29sb3I6ICMzMzM7XHJcbiRwbGFjZWhvbGRlci10ZXh0LWNvbG9yOiAjOTk5O1xyXG4kZm9udC1mYW1pbHktc2Fucy1zZXJpZjogXCJTZWdvZSBVSVwiLFwiSGVsdmV0aWNhIE5ldWVcIixcIkhlbHZldGljYVwiLFwiQXJpYWxcIixcInNhbnMtc2VyaWZcIiAhZGVmYXVsdDtcclxuJGZvbnQtc2l6ZS14eGxhcmdlOiAyNnB4O1xyXG4kZm9udC1zaXplLXhsYXJnZTogMjRweDtcclxuJGZvbnQtc2l6ZS1sYXJnZTogMjJweDtcclxuJGZvbnQtc2l6ZS1tZWRpdW06IDIwcHg7XHJcbiRmb250LXNpemUtYmFzZTogMThweDtcclxuJGZvbnQtc2l6ZS1zbWFsbDogMTZweDtcclxuJGZvbnQtc2l6ZS14c21hbGw6IDE0cHg7XHJcbiRmb250LXNpemUteHhzbWFsbDogMTJweDtcclxuJGVycm9yLW1lc3NhZ2U6ICNDNzA3MTk7XHJcbi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5mbGV4LTEge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuLmNvbHVtbiB7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG4kYm9sZDogNjAwO1xyXG4kc2VtaS1ib2xkOiA1MDA7XHJcbiRyZWd1bGFyOiA0MDA7XHJcblxyXG4kYnV0dG9uLWZvbnQtc2l6ZTogMjBweDtcclxuXHJcbi8vIHotaW5kZXhcclxuJHNlYXJjaGRyb3Bkb3duLXppbmRleDogOTk4O1xyXG4kaGVhZGVyLWluZGV4OiA5OTkgIWRlZmF1bHQ7IC8vIEZvciB0aGUgaGVhZGVyXHJcbiRwb3B1cHdpbmRvdy16aW5kZXg6IDEwMDAgIWRlZmF1bHQ7IC8vIEZvciB0aGUgcG9wdXB3aW5kb3dcclxuJGNhbGVuZGFyLXppbmRleDogMTAwMSAhZGVmYXVsdDtcclxuJHBvcHVwZGlhbG9nLXppbmRleDogMTAwMiAhZGVmYXVsdDsgLy8gRm9yIHRoZSBwb3B1cHdpbmRvd1xyXG4kdG9hc3QtemluZGV4OiAxMDAzICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJGhvdmVyLXppbmRleDogMTAwNCAhZGVmYXVsdDsgLy8gRm9yIHRoZSBob3ZlclxyXG4kYmFkZ2UtemluZGV4OiAxMDA1ICFkZWZhdWx0OyAvLyBGb3IgdGhlIHRvYXN0IG1lc3NhZ2VcclxuJHByb2dyZXNzYmFyLXppbmRleDogMTAwNSAhZGVmYXVsdDtcclxuJGRpc2FibGVkLWlucHV0LWNvbG9yOiAjZjJmMmYyO1xyXG4kdmFsaWRhdGlvbi1lcnJvci1ib3JkZXItY29sb3I6IHJlZDtcclxuJHNpZGVwYW5lbC1idXR0b24temluZGV4OiA5OTkgIWRlZmF1bHQ7XHJcbiIsIi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmZsZXgtMSB7XG4gIGZsZXg6IDE7XG59XG5cbi5jb2x1bW4ge1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5vYy1ncmlkIHtcbiAgaGVpZ2h0OiA5MCU7XG59XG5cbjpob3N0IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgb2MtZ3JpZCB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cblxuLmJhZGdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3R0b206IDEwcHg7XG4gIHJpZ2h0OiAtMTAwcHg7XG59XG5cbi5jcG13YXJuaW5ndGV4dCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6IG1hcm9vbjtcbn1cblxuLmNwbWhlYWRlcnJvdyB7XG4gIGhlaWdodDogNzBweDtcbn1cblxuLmRvd25hcnJvdyB7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcbn1cblxuLnVwYXJyb3cge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbn1cblxuLmhlYWRlcnRleHQge1xuICBmbG9hdDogbGVmdDtcbn1cblxuLmhlYWRlcmljb24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IDE1cHg7XG4gIHRvcDogM3B4O1xuICBmbG9hdDogbGVmdDtcbn1cblxuLnRyYXlpZGhlYWRlciB7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBtYXJnaW4tbGVmdDogMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nLXJpZ2h0OiAxODBweDtcbn1cblxuLnRyYXl0eXBlaGVhZGVyIHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmctcmlnaHQ6IDMwMHB4O1xufVxuXG4uZGV2aWNlbmFtZWhlYWRlciB7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBtYXJnaW4tbGVmdDogMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nLXJpZ2h0OiAxODBweDtcbn1cblxuLmNvbXBsZXRlZGRhdGVoZWFkZXIge1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIG1hcmdpbi1yaWdodDogMzBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZy1yaWdodDogMTgwcHg7XG59XG5cbi50cmF5aWR0ZXh0IHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXNpemU6IDIycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi50cmF5dHlwZXRleHQge1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCI7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIG1hcmdpbi1yaWdodDogMzBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmRldmljZW5hbWV0ZXh0IHtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkhlbHZldGljYVwiLCBcIkFyaWFsXCIsIFwic2Fucy1zZXJpZlwiO1xuICBmb250LXNpemU6IDIycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5jb21wbGV0ZWRkYXRldGV4dCB7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBcInNhbnMtc2VyaWZcIjtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tbGVmdDogMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufSIsIkBpbXBvcnQgXCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQG9tbmljZWxsL3dlYmNvcmVjb21wb25lbnRzL2xpYi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtcclxub2MtZ3JpZHtcclxuICBoZWlnaHQ6IDkwJTtcclxufVxyXG5cclxuOmhvc3R7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgb2MtZ3JpZHtcclxuICBmb250LXNpemU6ICRmb250LXNpemUtbGFyZ2U7XHJcbn1cclxuXHJcbi5iYWRnZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJvdHRvbTogMTBweDtcclxuICByaWdodDogLTEwMHB4O1xyXG59XHJcblxyXG4uY3Btd2FybmluZ3RleHR7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLXhzbWFsbDtcclxuICBjb2xvcjogbWFyb29uO1xyXG59XHJcblxyXG4uY3BtaGVhZGVycm93XHJcbntcclxuICBoZWlnaHQ6IDcwcHg7XHJcbn1cclxuLmRvd25hcnJvd3tcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcclxufVxyXG5cclxuLnVwYXJyb3d7XHJcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XHJcbn1cclxuXHJcbi5oZWFkZXJ0ZXh0e1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4uaGVhZGVyaWNvbntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMTVweDtcclxuICB0b3A6IDNweDtcclxuICBmbG9hdDogbGVmdDtcclxufVxyXG4udHJheWlkaGVhZGVye1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6ICRmb250LXNpemUteHNtYWxsO1xyXG4gIGZvbnQtd2VpZ2h0OiAkcmVndWxhcjtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICBwYWRkaW5nLXJpZ2h0OiAxODBweDtcclxuXHJcbn1cclxuLnRyYXl0eXBlaGVhZGVye1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogJHJlZ3VsYXI7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLXhzbWFsbDtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICBwYWRkaW5nLXJpZ2h0OiAzMDBweDtcclxufVxyXG4uZGV2aWNlbmFtZWhlYWRlcntcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLXhzbWFsbDtcclxuICBmb250LXdlaWdodDogJHJlZ3VsYXI7XHJcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgcGFkZGluZy1yaWdodDogMTgwcHg7XHJcbn1cclxuLmNvbXBsZXRlZGRhdGVoZWFkZXJ7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS14c21hbGw7XHJcbiAgZm9udC13ZWlnaHQ6ICRyZWd1bGFyO1xyXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMzBweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE4MHB4O1xyXG59XHJcbi50cmF5aWR0ZXh0e1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6ICRmb250LXNpemUtbGFyZ2U7XHJcbiAgZm9udC13ZWlnaHQ6ICRib2xkO1xyXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMzBweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbi50cmF5dHlwZXRleHR7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1zYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcclxuICBmb250LXdlaWdodDogJGJvbGQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuLmRldmljZW5hbWV0ZXh0e1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6ICRmb250LXNpemUtbGFyZ2U7XHJcbiAgZm9udC13ZWlnaHQ6ICRib2xkO1xyXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMzBweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbi5jb21wbGV0ZWRkYXRldGV4dHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLWxhcmdlO1xyXG4gIGZvbnQtd2VpZ2h0OiAkYm9sZDtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/xr2/xr2-exception-details-page/xr2-exceptions-details-page.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/xr2/xr2-exception-details-page/xr2-exceptions-details-page.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: Xr2ExceptionDetailsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xr2ExceptionDetailsPageComponent", function() { return Xr2ExceptionDetailsPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _model_xr2_exception_details_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/xr2-exception-details-item */ "./src/app/xr2/model/xr2-exception-details-item.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/services/wpf-action-controller/wpf-action-controller.service */ "./src/app/shared/services/wpf-action-controller/wpf-action-controller.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/functions/nameof */ "./src/app/shared/functions/nameof.ts");
/* harmony import */ var _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/sort-direction */ "./src/app/shared/constants/sort-direction.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _api_xr2_services_xr2_exceptiondetails_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../api-xr2/services/xr2-exceptiondetails.service */ "./src/app/api-xr2/services/xr2-exceptiondetails.service.ts");
/* harmony import */ var _model_xr2_exceptions_item__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../model/xr2-exceptions-item */ "./src/app/xr2/model/xr2-exceptions-item.ts");












let Xr2ExceptionDetailsPageComponent = class Xr2ExceptionDetailsPageComponent {
    constructor(activatedRoute, wpfActionController, exceptionDetailsListService, translateService) {
        this.activatedRoute = activatedRoute;
        this.wpfActionController = wpfActionController;
        this.exceptionDetailsListService = exceptionDetailsListService;
        this.translateService = translateService;
        this.PropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("TrayID");
        this.trayTypePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("TrayDescription");
        this.deviceNamePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("DeviceName");
        this.completedDatePropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("CompletedDateTime");
        this.reasonPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("Reason");
        this.columnPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("PocketColumn");
        this.rowProperyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("PocketRow");
        this.itemDescriptionPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("ItemDescription");
        this.itemIDPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("ItemID");
        this.barcodeNDCPropertyName = Object(_shared_functions_nameof__WEBPACK_IMPORTED_MODULE_7__["nameof"])("BarCode");
        this.firstTime = true;
        this.currentSortPropertyName = this.reasonPropertyName;
        this.sortOrder = _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_8__["SortDirection"].ascending;
        this.alphaValues = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        this.translateService.get('XR2_EXCEPTIONS_TRAY_ID').subscribe(result => { this.trayIDHeader$ = result; });
        this.translateService.get('XR2_EXCEPTIONS_TRAY_TYPE').subscribe(result => { this.trayTypeHeader$ = result; });
        this.translateService.get('XR2_EXCEPTIONS_DEVICE_NAME').subscribe(result => { this.deviceNameHeader$ = result; });
        this.translateService.get('XR2_EXCEPTIONS_COMPLETED_DATE').subscribe(result => { this.completedDateHeader$ = result; });
    }
    ngOnInit() {
        let selectedItem = {
            TrayID: this.activatedRoute.snapshot.queryParamMap.get('TrayID'),
            DeviceID: this.activatedRoute.snapshot.queryParamMap.get('DeviceID'),
            CompletedDateTime: this.activatedRoute.snapshot.queryParamMap.get('CompletedDateTime'),
            DeviceName: "",
            ExceptionPockets: "",
            TrayDescription: ""
        };
        this.selectedItem = new _model_xr2_exceptions_item__WEBPACK_IMPORTED_MODULE_11__["Xr2ExceptionsItem"](selectedItem);
        this.trayID = this.activatedRoute.snapshot.queryParamMap.get('TrayID');
        this.trayType = this.activatedRoute.snapshot.queryParamMap.get('TrayDescription');
        this.deviceName = this.activatedRoute.snapshot.queryParamMap.get('DeviceName');
        this.completedDate = this.activatedRoute.snapshot.queryParamMap.get('CompletedDateTime');
        this.displayExceptionDetailList$ = this.exceptionDetailsListService.get(this.selectedItem).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(guidedDeviceListItems => {
            return this.sort(guidedDeviceListItems.map(p => new _model_xr2_exception_details_item__WEBPACK_IMPORTED_MODULE_3__["Xr2ExceptionDetailsItem"](p)), _shared_constants_sort_direction__WEBPACK_IMPORTED_MODULE_8__["SortDirection"].ascending);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
    }
    ngOnDestroy() {
    }
    sort(devices, sortDirection) {
        this.parseRowsData(devices);
        return lodash__WEBPACK_IMPORTED_MODULE_6__["orderBy"](devices, x => x[this.currentSortPropertyName], sortDirection);
    }
    columnSelected(event) {
        this.currentSortPropertyName = event.ColumnPropertyName;
        this.sortOrder = event.SortDirection;
        this.displayExceptionDetailList$ = this.displayExceptionDetailList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(exceptions => {
            return this.sort(exceptions, event.SortDirection);
        }));
    }
    navigateBack() {
        this.wpfActionController.ExecuteBackAction();
    }
    parseRowsData(items) {
        if (this.firstTime) {
            for (let item of items) {
                item.PocketRow = this.alphaValues[Number(item.PocketRow)];
            }
            this.firstTime = false;
        }
    }
};
Xr2ExceptionDetailsPageComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _shared_services_wpf_action_controller_wpf_action_controller_service__WEBPACK_IMPORTED_MODULE_5__["WpfActionControllerService"] },
    { type: _api_xr2_services_xr2_exceptiondetails_service__WEBPACK_IMPORTED_MODULE_10__["Xr2ExceptionDetailsService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"] }
];
Xr2ExceptionDetailsPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-xr2-exception-details-page',
        template: __webpack_require__(/*! raw-loader!./Xr2-Exception-details-page.component.html */ "../../node_modules/raw-loader/index.js!./src/app/xr2/xr2-exception-details-page/Xr2-Exception-details-page.component.html"),
        styles: [__webpack_require__(/*! ./Xr2-Exceptions-details-page.component.scss */ "./src/app/xr2/xr2-exception-details-page/Xr2-Exceptions-details-page.component.scss")]
    })
], Xr2ExceptionDetailsPageComponent);



/***/ }),

/***/ "./src/app/xr2/xr2.module.ts":
/*!***********************************!*\
  !*** ./src/app/xr2/xr2.module.ts ***!
  \***********************************/
/*! exports provided: Xr2Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xr2Module", function() { return Xr2Module; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _picklists_queue_picklists_queue_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./picklists-queue/picklists-queue.component */ "./src/app/xr2/picklists-queue/picklists-queue.component.ts");
/* harmony import */ var _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @omnicell/webcorecomponents */ "../../node_modules/@omnicell/webcorecomponents/fesm2015/omnicell-webcorecomponents.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _picklists_queue_page_picklists_queue_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./picklists-queue-page/picklists-queue-page.component */ "./src/app/xr2/picklists-queue-page/picklists-queue-page.component.ts");
/* harmony import */ var _Xr2_Exceptions_page_xr2_exceptions_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Xr2-Exceptions-page/xr2-exceptions-page.component */ "./src/app/xr2/Xr2-Exceptions-page/xr2-exceptions-page.component.ts");
/* harmony import */ var _xr2_exception_details_page_xr2_exceptions_details_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./xr2-exception-details-page/xr2-exceptions-details-page.component */ "./src/app/xr2/xr2-exception-details-page/xr2-exceptions-details-page.component.ts");











let Xr2Module = class Xr2Module {
};
Xr2Module = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_picklists_queue_picklists_queue_component__WEBPACK_IMPORTED_MODULE_3__["PicklistsQueueComponent"], _picklists_queue_page_picklists_queue_page_component__WEBPACK_IMPORTED_MODULE_8__["PicklistsQueuePageComponent"], _Xr2_Exceptions_page_xr2_exceptions_page_component__WEBPACK_IMPORTED_MODULE_9__["Xr2ExceptionsPageComponent"], _xr2_exception_details_page_xr2_exceptions_details_page_component__WEBPACK_IMPORTED_MODULE_10__["Xr2ExceptionDetailsPageComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["GridModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["ButtonActionModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["SingleselectDropdownModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["LayoutModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["FooterModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["InputsModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["SearchModule"],
            _omnicell_webcorecomponents__WEBPACK_IMPORTED_MODULE_4__["PopupDialogModule"]
        ]
    })
], Xr2Module);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    interopType: 'console'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
document.addEventListener('DOMContentLoaded', () => {
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(err => {
        console.error(err);
    });
});


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\7178\source\repos\CPM-AngularLibrary\projects\cpm-app\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map