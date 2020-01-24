import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties



    //#endregion

    //#region Constructors

    constructor(private localStorageService: LocalStorageService) { }

    //#endregion

    //#region OnInit, OnDestroy

    ngOnInit(): void {
        // Bypass login
        this.localStorageService.saveLocal('_jwtSecret', 'a');
    }

    //#endregion

    //#region Funtions

    //#endregion
}
