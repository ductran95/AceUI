import { Injectable } from '@angular/core';
import { AceSidebarService } from '@app/core/services/ace/ace-sidebar.service';
import { AceSettingService } from '@app/core/services/ace/ace-setting.service';


@Injectable()
export class AceService implements AceInterface {

    //#region Properties


    //#endregion

    //#region Constructors

    constructor(public sidebar: AceSidebarService, public setting: AceSettingService) {
    }

    //#endregion

    //#region Funtions

    loadSetting() {
        this.sidebar.loadSetting();
        this.setting.loadSetting();
    }

    saveSetting() {
        this.sidebar.saveSetting();
        this.setting.saveSetting();
    }

    //#endregion
}
