import { Component, OnInit } from '@angular/core';
import { Message } from '@app/core/models/ace/message';
import { AceLayoutService } from '@app/core/services/ace/ace-layout.service';

@Component({
    selector: 'ace-layout-header-messages, [aceLayoutHeaderMessages]',
    templateUrl: './ace-layout-header-messages.component.html',
    styleUrls: ['./ace-layout-header-messages.component.scss']
})
export class AceLayoutHeaderMessagesComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    messageList: Message[];
    scrollOptions: AceScrollOptionsInterface;

    //#endregion

    //#region Constructors

    constructor(private aceLayoutSevice: AceLayoutService) {
        this.messageList = [];
        this.scrollOptions = {
            size: 200,
            mouseWheelLock: true,
            reset: false
        };
    }

    //#endregion

    //#region OnInit

    ngOnInit() {
        this.aceLayoutSevice.getMessages().subscribe(
            (messageList: Message[]) => {
                this.messageList = messageList;
            }
        );
    }

    //#endregion

    //#region Funtions

    //#endregion

}
