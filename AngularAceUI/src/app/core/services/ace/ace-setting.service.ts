import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';
import { AceSidebarService } from '@app/core/services/ace/ace-sidebar.service';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AceSettingService implements AceSettingInterface {

    //#region Properties

    readonly skinList = [
        {
            id: 0,
            color: '#438EB9'
        },
        {
            id: 1,
            color: '#222A2D'
        },
        {
            id: 2,
            color: '#C6487E'
        },
        {
            id: 3,
            color: '#D0D0D0'
        },
    ];

    readonly colorPickerOption = {
        pull_right: false,
        caret: false
    };

    private _skinIndex = 0;
    private _navbar = false;
    private _sidebar = false;
    private _breadcrumbs = false;
    private _container: boolean;
    private _hover = false;
    private _compact = false;
    private _highlight = false;
    private _skinColor = '#438EB9';

    rtl = false;
    is_open = false;

    skinIndexChange = new BehaviorSubject<number>(this._skinIndex);


    //#endregion

    //#region Constructors

    constructor(private localStorageService: LocalStorageService, private sidebarService: AceSidebarService) { }

    //#endregion

    //#region Funtions

    loadSetting() {
        const setting = this.localStorageService.getLocal('ace.settings');
        _.merge(this, setting);
    }

    saveSetting() {
        // TODO: filter properties of setting, sidebar which is not a function
        const setting = {
            skinIndex: this.skinIndex,
            is_open: this.is_open,
            navbar: this.navbar,
            sidebar: this.sidebar,
            breadcrumbs: this.breadcrumbs,
            container: this.container,
            hover: this.hover,
            compact: this.compact,
            highlight: this.highlight,
            rtl: this.rtl,
            skinColor: this.skinColor,
        };
        this.localStorageService.saveLocal('ace.settings', setting);
    }

    getBodySkin(): string {
        const skin = this.skinIndex;
        if (skin == 1 || skin == 2) { return 'skin-' + skin; } else if (skin == 3) { return 'no-skin skin-3'; }
        return 'no-skin';
    }

    open(): void {
        this.is_open = !this.is_open;
    }

    get navbar(): boolean {
        return this._navbar;
    }

    set navbar(newValue: boolean) {
        this._navbar = newValue;

        if (this.navbar == false) {
            // if navbar is unfixed, so should be sidebar and breadcrumbs
            this.sidebar = this.breadcrumbs = false;
        }
        setTimeout(() => {
            if (jQuery) { jQuery(document).trigger('settings.ace', ['navbar_fixed', this.navbar]); }
        });

        this.localStorageService.saveLocal('ace.settings.navbar', this.navbar);
    }

    get sidebar(): boolean {
        return this._sidebar;
    }

    set sidebar(newValue: boolean) {
        this._sidebar = newValue;

        if (this.sidebar == true) {
            // if sidebar is fixed, so should be navbar
            this.navbar = true;
        } else if (this.sidebar == false) {
            // if sidebar is unfixed, so should be breadcrumbs
            this.breadcrumbs = false;
        }
        setTimeout(() => {
            if (jQuery) { jQuery(document).trigger('settings.ace', ['sidebar_fixed', this.sidebar]); }
        });

        this.localStorageService.saveLocal('ace.settings.sidebar', this.sidebar);
    }

    get breadcrumbs(): boolean {
        return this._breadcrumbs;
    }

    set breadcrumbs(newValue: boolean) {
        this._breadcrumbs = newValue;

        if (this.breadcrumbs == true) {
            // if breadcrumbs is fixed, so should be sidebar
            this.sidebar = true;
        }
        setTimeout(() => {
            if (jQuery) { jQuery(document).trigger('settings.ace', ['breadcrumbs_fixed', this.breadcrumbs]); }
        });

        this.localStorageService.saveLocal('ace.settings.breadcrumbs', this.breadcrumbs);
    }

    get container(): boolean {
        return this._container;
    }

    set container(newValue: boolean) {
        this._container = newValue;

        setTimeout(() => {
            if (jQuery) { jQuery(document).trigger('settings.ace', ['main_container_fixed', this.container]); }
        });

        this.localStorageService.saveLocal('ace.settings.container', this.container);
    }

    get hover(): boolean {
        return this._hover;
    }

    set hover(newValue: boolean) {
        this._hover = newValue;

        if (this.hover === false) {
            // if sidebar is not 'hover' , it should not be compact
            this.compact = false;
        }

        setTimeout(() => {
            // reset sidebar scrollbars and submenu hover
            this.sidebarService.reset = true;
        }, 500);

        this.localStorageService.saveLocal('ace.settings.hover', this.hover);
    }

    get compact(): boolean {
        return this._compact;
    }

    set compact(newValue: boolean) {
        this._compact = newValue;

        if (this.compact === true) {
            // if sidebar is compact, it should be in 'hover' mode as well
            this.hover = true;
        }

        setTimeout(() => {
            // reset sidebar scrollbars and submenu hover
            this.sidebarService.reset = true;
        }, 500);

        this.localStorageService.saveLocal('ace.settings.compact', this.compact);
    }

    get highlight(): boolean {
        return this._highlight;
    }

    set highlight(newValue: boolean) {
        this._highlight = newValue;

        this.localStorageService.saveLocal('ace.settings.highlight', this.highlight);
    }

    get skinIndex(): number {
        return this._skinIndex;
    }

    set skinIndex(newValue: number) {
        this._skinIndex = newValue;

        this.localStorageService.saveLocal('ace.settings.skinIndex', this.skinIndex);

        const skin = _.find(this.skinList, { id: this._skinIndex });
        this.skinColor = skin.color;

        this.skinIndexChange.next(this._skinIndex);
    }

    get skinColor(): string {
        return this._skinColor;
    }

    set skinColor(newValue: string) {
        this._skinColor = newValue;

    }

    //#endregion
}
