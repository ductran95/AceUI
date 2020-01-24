import { Component, OnInit } from '@angular/core';
import { Notification } from '@app/core/models/ace/notification';
import { AceLayoutService } from '@app/core/services/ace/ace-layout.service';

@Component({
    selector: 'ace-layout-header-notifications, [aceLayoutHeaderNotifications]',
    templateUrl: './ace-layout-header-notifications.component.html',
    styleUrls: ['./ace-layout-header-notifications.component.scss']
})
export class AceLayoutHeaderNotificationsComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    notificationList: Notification[];
    scrollOptions: AceScrollOptionsInterface;

    //#endregion

    //#region Constructors

    constructor(private aceLayoutService: AceLayoutService) {
        this.notificationList = [];
        this.scrollOptions = {
            size: 200,
            mouseWheelLock: true,
            reset: false
        };
    }

    //#endregion

    //#region OnInit

    ngOnInit() {
        this.aceLayoutService.getNotifications().subscribe(
            (notificationList: Notification[]) => {
                this.notificationList = notificationList;
            }
        );
    }

    //#endregion

    //#region Funtions

    //#endregion

}
