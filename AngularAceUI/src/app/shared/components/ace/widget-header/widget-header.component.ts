import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-widget-header',
    templateUrl: './widget-header.component.html',
    styleUrls: ['./widget-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetHeaderComponent implements OnInit {

    //#region Inputs, Outputs

    @Input() whOptions: AceWidgetHeaderOptionsInterface;
    @Input() whHidden: boolean;
    @Input() whToggleIconUp: string;
    @Input() whToggleIconDown: string;

    //#endregion

    //#region Properties



    //#endregion

    //#region Constructors

    constructor() { }

    //#endregion

    //#region OnInit, OnChange

    ngOnInit(): void {
        this.whToggleIconUp = this.whToggleIconUp || 'fa-chevron-down';
        this.whToggleIconUp = this.whToggleIconUp || 'fa-chevron-up';

        this.whOptions = this.whOptions || {};
        this.whHidden = this.whHidden || false;
    }


    //#endregion

    //#region Funtions

    //#endregion

}
