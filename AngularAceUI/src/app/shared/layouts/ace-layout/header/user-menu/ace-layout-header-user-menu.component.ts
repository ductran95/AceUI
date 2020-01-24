import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';

@Component({
    selector: 'ace-layout-header-user-menu, [aceLayoutHeaderUserMenu]',
    templateUrl: './ace-layout-header-user-menu.component.html',
    styleUrls: ['./ace-layout-header-user-menu.component.scss']
})
export class AceLayoutHeaderUserMenuComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties


    //#endregion

    //#region Constructors

    constructor(private authService: AuthenticationService) { }

    //#endregion

    //#region OnInit

    ngOnInit() {

    }

    //#endregion

    //#region Funtions

    logOut() {
        this.authService.logOut();
        location.reload();
        // this.router.navigate(['']);
    }

    //#endregion

}
