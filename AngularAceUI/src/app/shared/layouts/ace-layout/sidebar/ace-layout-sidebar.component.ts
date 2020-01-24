import { Component, ElementRef, OnDestroy, OnInit, HostListener } from '@angular/core';
import { AceService } from '@app/core/services/ace/ace.service';
import { SidebarItem } from '@app/core/models/ace/sidebar-item';
import { AceLayoutService } from '@app/core/services/ace/ace-layout.service';

@Component({
    selector: 'ace-layout-sidebar, [aceLayoutSidebar]',
    templateUrl: './ace-layout-sidebar.component.html',
    styleUrls: ['./ace-layout-sidebar.component.scss']
})
export class AceLayoutSidebarComponent implements OnInit, OnDestroy {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    sidebarMenu: SidebarItem[];

    scroll = false;
    hover = false;
    loopUpdate = {
        minimized: false,
        toggle: false
    };
    $element: JQuery;

    //#endregion

    //#region Constructors

    constructor(
        protected ace: AceService,
        private hostElement: ElementRef,
        private aceLayoutService: AceLayoutService
    ) { }

    //#endregion

    //#region OnInit, OnDestroy

    ngOnInit() {

        this.aceLayoutService.getSidebarMenu().subscribe(
            (sidebarMenu: SidebarItem[]) => {
                this.sidebarMenu = sidebarMenu;
            }
        );

        this.$element = jQuery(this.hostElement.nativeElement);
        this.$element.ace_sidebar(this.ace.sidebar);

        if (this.scroll) {
            this.$element.ace_sidebar_scroll(this.scroll);
        }

        if (this.hover) {
            this.$element.ace_sidebar_hover(this.hover);
        }

        this.ace.sidebar.minimizedChange.subscribe((newValue: boolean) => {
            if (!this.loopUpdate.minimized) {
                this.loopUpdate.minimized = true;

                if (newValue == true) {
                    this.$element.ace_sidebar('collapse');
                } else {
                    this.$element.ace_sidebar('expand');
                }
            } else {
                this.loopUpdate.minimized = false;
            }
        });

        this.ace.sidebar.toggleChange.subscribe((newValue: boolean) => {
            if (!this.loopUpdate.toggle) {
                this.loopUpdate.toggle = true;

                if (newValue == true) {
                    this.$element.ace_sidebar('mobileShow');
                } else {
                    this.$element.ace_sidebar('mobileHide');
                }
            } else {
                this.loopUpdate.toggle = false;
            }
        });

        this.ace.sidebar.resetChange.subscribe((newValue: boolean) => {
            if (newValue == true) {
                this.$element.ace_sidebar_scroll('reset');
            } else {
                this.$element.ace_sidebar_hover('reset');
            }
        });

    }

    ngOnDestroy() {
        this.ace.sidebar.minimizedChange.unsubscribe();
        this.ace.sidebar.toggleChange.unsubscribe();
        this.ace.sidebar.resetChange.unsubscribe();
    }

    //#endregion

    //#region Funtions, Events

    @HostListener('mobileShow.ace.sidebar', ['$event'])
    onMobileShow() {
        setTimeout(() => { this.ace.sidebar.toggle = true; });
    }

    @HostListener('mobileHide.ace.sidebar', ['$event'])
    onMobileHide() {
        setTimeout(() => { this.ace.sidebar.toggle = false; });
    }

    @HostListener('collapse.ace.sidebar', ['$event'])
    onCollapse() {
        setTimeout(() => { this.ace.sidebar.minimized = true; });
    }

    @HostListener('expand.ace.sidebar', ['$event'])
    onExpand() {
        setTimeout(() => { this.ace.sidebar.minimized = false; });
    }

    onSubMenuShow(event: any) {
        this.ace.sidebar.subMenuOpen[jQuery(event).attr('data-name')] = true;
    }

    onSubMenuHide(event: any) {
        this.ace.sidebar.subMenuOpen[jQuery(event).attr('data-name')] = false;
    }

    //#endregion
}
