import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AceSidebarService implements AceSidebarInterface {

    //#region Properties

    private _minimized = false;
    private _reset = false;
    private _toggle = false;
    subMenuOpen = {};

    minimizedChange = new BehaviorSubject<boolean>(this._minimized);
    resetChange = new BehaviorSubject<boolean>(this._reset);
    toggleChange = new BehaviorSubject<boolean>(this._toggle);

    //#endregion

    //#region Constructors

    constructor(private localStorageService: LocalStorageService) { }

    //#endregion

    //#region Funtions

    loadSetting() {
        const sidebar = this.localStorageService.getLocal('ace.sidebar');
        _.merge(this, sidebar);
    }

    saveSetting() {
        // TODO: filter properties of setting, sidebar which is not a function
        const sidebar = {
            minimized: this.minimized,
            toggle: this.toggle,
            reset: this.reset,
        };
        this.localStorageService.saveLocal('ace.sidebar', sidebar);
    }

    get minimized(): boolean {
        return this._minimized;
    }

    set minimized(newValue: boolean) {
        this._minimized = newValue;
        this.localStorageService.saveLocal('ace.sidebar.minimized', this.minimized);

        this.minimizedChange.next(this._minimized);
    }

    get reset(): boolean {
        return this._reset;
    }

    set reset(newValue: boolean) {
        this._reset = newValue;

        this.resetChange.next(this._reset);
    }

    get toggle(): boolean {
        return this._toggle;
    }

    set toggle(newValue: boolean) {
        this._toggle = newValue;

        this.toggleChange.next(this._toggle);
    }

    isSubOpen(name: string) {
        if (!(name in this.subMenuOpen)) {
            this.subMenuOpen[name] = false;
        }
        return this.subMenuOpen[name];
    }
    //#endregion
}
