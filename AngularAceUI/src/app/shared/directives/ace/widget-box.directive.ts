import { Directive, ElementRef, SimpleChanges, OnChanges, Input, Output, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';

@Directive({
    selector: '[aceWidgetBox]'
})
export class WidgetBoxDirective implements OnInit, OnChanges {

    //#region Inputs, Outputs

    @Input() wbOptions: AceWidgetBoxOptionsInterface;

    @Output() wbReload = new EventEmitter<any>();
    @Output() wbClose = new EventEmitter<any>();
    @Output() wbFullscreen = new EventEmitter<any>();
    @Output() wbShow = new EventEmitter<any>();
    @Output() wbHide = new EventEmitter<any>();
    @Output() wbToggle = new EventEmitter<any>();
    @Output() wbReloaded = new EventEmitter<any>();
    @Output() wbClosed = new EventEmitter<any>();
    @Output() wbFullscreened = new EventEmitter<any>();
    @Output() wbShown = new EventEmitter<any>();
    @Output() wbHidden = new EventEmitter<any>();
    @Output() wbToggled = new EventEmitter<any>();

    //#endregion

    //#region Properties

    private _element: HTMLElement;

    private _loopUpdate: {
        reload: boolean,
        close: boolean,
        fullscreen: boolean,
        toggle: boolean
    };

    private _beforeEvents: {
        hide: number;
        reload(): any;
        close(): any;
        fullscreen(): any;
        show(): any;
        toggle(): any;
    };

    private _afterEvents: {
        reloaded: number;
        closed: number;
        fullscreened: number;
        shown: number;
        toggled: number;
        hidden(): any;
    };

    private _beforeCallback: any;
    private _afterCallback: any;

    //#endregion

    //#region Constructors

    constructor(private renderer2: Renderer2, private el: ElementRef, private localStorageService: LocalStorageService) { }

    //#endregion

    //#region OnInit, OnChange

    ngOnInit(): void {
        this._element = this.el.nativeElement;
        this.renderer2.addClass(this._element, 'widget-box');

        this.wbOptions.reloading = this.wbOptions.reloading || false;
        this.wbOptions.fullscreen = this.wbOptions.fullscreen || false;
        this.wbOptions.close = this.wbOptions.close || false;
        this.wbOptions.hidden = this.wbOptions.hidden || false;
        this.wbOptions.toggle = this.wbOptions.toggle || !this.wbOptions.hidden;

        this._loopUpdate = {
            reload: false,
            close: false,
            fullscreen: false,
            toggle: false
        };

        const that = this;

        this._beforeEvents = {
            reload() {
                // reset 'wbReloading' to 'true' before each reload
                that.wbOptions.reloading = true;
            },
            close() {
                that.wbOptions.close = true;
            },
            fullscreen() {
                that.wbOptions.fullscreen = !that.wbOptions.fullscreen;
            },
            show() {
                that.wbOptions.hidden = false;
            },
            hide: 1,
            toggle() {
                that.wbOptions.toggle = !that.wbOptions.toggle;
            }
        };

        this._afterEvents = {
            reloaded: 1,
            closed: 1,
            fullscreened: 1,
            shown: 1,
            toggled: 1,
            hidden() {
                that.wbOptions.hidden = true;
            }
        };

        for (const bev_name of Object.keys(this._beforeEvents)) {
            const beforeName = bev_name;
            const beforeCallback = 'wb' + beforeName.replace(/^[a-z]/, ($1) => $1.toUpperCase());
            this.renderer2.listen(this._element, beforeName + '.ace.widget', (ev) => {
                if (ev.namespace != 'ace.widget') { return; }

                if (this[beforeCallback] && this[beforeCallback]() === false) {
                    ev.preventDefault();
                    return;
                }

                if (typeof this._beforeEvents[beforeName] === 'function') {
                    this._loopUpdate[beforeName] = true;
                    this._beforeEvents[beforeName]();
                }
            });
        }

        for (const aev_name of Object.keys(this._afterEvents)) {
            const afterName = aev_name;
            const afterCallback = 'wb' + afterName.replace(/^[a-z]/, ($1) => $1.toUpperCase());

            this.renderer2.listen(this._element, afterName + '.ace.widget', (ev) => {
                if (ev.namespace != 'ace.widget') { return; }

                if (this[afterCallback] && this[afterCallback]() === false) {
                    ev.preventDefault();
                }
                if (typeof this._afterEvents[afterName] === 'function') {
                    this._afterEvents[afterName]();
                }
            });
        }

        const widget_id = this._element.id || '';

        const save = !!((this.wbOptions.save || false) && widget_id);
        let saveName = this.wbOptions.saveName || 'ace.widget-state';
        saveName += ('-' + widget_id);
        this.localStorageService.saveLocal(saveName, this.localStorageService.getLocal(saveName) || {});

        const storage = this.localStorageService.getLocal(saveName);
        if (save && storage) {
            if ('toggle' in storage) {
                this.wbOptions.toggle = storage.toggle;
                this.wbOptions.hidden = !this.wbOptions.toggle;
            }
            if ('fullscreen' in storage) { this.wbOptions.fullscreen = storage.fullscreen; }
            if ('close' in storage) { this.wbOptions.close = storage.close; }
        }

        if (this.wbOptions.close) {
            $(this._element).widget_box('close');
        } else if (this.wbOptions.hidden) {
            setTimeout(() => {
                $(this._element).widget_box('hideFast');
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const optionChange = changes.wbOptions;
        const currentValue = optionChange.currentValue;
        const previousValue = optionChange.previousValue;

        if (currentValue.reloading != previousValue.reloading) {
            if (this._loopUpdate.reload) {
                this._loopUpdate.reload = false;
                return;
            }
            if (previousValue.reloading === true && currentValue.reloading === false) {
                $(this._element).trigger('reloaded.ace.widget');
            } else if (previousValue.reloading === false && currentValue.reloading === true) {
                // don't trigger if called from widget toolbar
                $(this._element).widget_box('reload');
            }
        }

        if (currentValue.toggle != previousValue.toggle) {
            if (this.wbOptions.save && currentValue.toggle !== undefined) {
                this.localStorageService.saveLocal(this.wbOptions.saveName + '.toggle', currentValue.toggle);
            }

            if (this._loopUpdate.toggle) {
                this._loopUpdate.toggle = false;
                return;
            }

            if (currentValue.toggle === true) {
                this.wbOptions.hidden = false;
                $(this._element).widget_box('show');
            } else if (currentValue.toggle === false) {
                // $scope.wbHidden = true;
                $(this._element).widget_box('hide');
            }
        }

        if (currentValue.fullscreen != previousValue.fullscreen) {
            if (this.wbOptions.save && currentValue.fullscreen !== undefined) {
                this.localStorageService.saveLocal(this.wbOptions.saveName + '.fullscreen', currentValue.fullscreen);
            }

            if (this._loopUpdate.fullscreen) {
                this._loopUpdate.fullscreen = false;
                return;
            }

            $(this._element).widget_box('fullscreen', currentValue.fullscreen);
        }

        if (currentValue.close != previousValue.close) {
            if (this.wbOptions.save && currentValue.close !== undefined) {
                this.localStorageService.saveLocal(this.wbOptions.saveName + '.close', currentValue.close);
            }

            if (this._loopUpdate.close) {
                this._loopUpdate.close = false;
                return;
            }

            if (currentValue.close === true) {
                $(this._element).widget_box('close');
            }
        }
    }

    //#endregion

    //#region Funtions

    //#endregion

}
