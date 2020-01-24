import { Component, OnInit } from '@angular/core';
import { AceService } from '@app/core/services/ace/ace.service';

@Component({
    selector: 'ace-layout-setting, [aceLayoutSetting]',
    templateUrl: './ace-layout-setting.component.html',
    styleUrls: ['./ace-layout-setting.component.scss']
})
export class AceLayoutSettingComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties


    //#endregion

    //#region Constructors

    constructor(protected ace: AceService) { }

    //#endregion

    //#region OnInit

    ngOnInit() {
    }

    //#endregion

    //#region Funtions


    //#endregion

}
