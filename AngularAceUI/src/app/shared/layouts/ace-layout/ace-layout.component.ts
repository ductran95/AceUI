import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { AceService } from '@app/core/services/ace/ace.service';
import { aceConst } from '@app/core/constants/aceConst';

@Component({
    selector: 'ace-layout, [aceLayout]',
    templateUrl: './ace-layout.component.html',
    styleUrls: ['./ace-layout.component.scss']
})
export class AceLayoutComponent implements OnInit, OnDestroy {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    private bodyClass: string;

    protected viewContentLoading = false;

    //#endregion

    //#region Constructors

    constructor(private renderer2: Renderer2, protected ace: AceService) { }

    //#endregion

    //#region OnInit, OnDestroy

    ngOnInit() {
        if (aceConst.saveSetting) {
            this.ace.loadSetting();
        }
        this.bodyClass = this.ace.setting.getBodySkin();
        this.renderer2.setAttribute(document.body, 'class', this.bodyClass);

        this.ace.setting.skinIndexChange.subscribe(() => {
            this.bodyClass = this.ace.setting.getBodySkin();
            this.renderer2.setAttribute(document.body, 'class', this.bodyClass);
        });
    }

    ngOnDestroy() {
        if (aceConst.saveSetting) {
            this.ace.saveSetting();
        }

        this.renderer2.removeClass(document.body, this.bodyClass);
    }

    //#endregion

    //#region Funtions

    //#endregion

}
