import { Component, OnInit } from '@angular/core';
import { AceService } from '@app/core/services/ace/ace.service';

@Component({
    selector: 'ace-layout-header, [aceLayoutHeader]',
    templateUrl: './ace-layout-header.component.html',
    styleUrls: ['./ace-layout-header.component.scss'],
})
export class AceLayoutHeaderComponent implements OnInit {

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
