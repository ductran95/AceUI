import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Component({
    selector: 'ace-layout-page-header, [aceLayoutPageHeader]',
    templateUrl: './ace-layout-page-header.component.html',
    styleUrls: ['./ace-layout-page-header.component.scss']
})
export class AceLayoutPageHeaderComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    routerTree: {
        url: string;
        name: string;
        isActive: boolean;
    }[];

    //#endregion

    //#region Constructors

    constructor(private router: Router, private activeRoute: ActivatedRoute) {
        this.routerTree = [];
    }

    //#endregion

    //#region OnInit

    ngOnInit() {
        this.getRouterTree();
        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationEnd) {
                    this.getRouterTree();
                }
            }
        );
    }

    //#endregion

    //#region Funtions

    getRouterTree() {
        this.routerTree = [];
        let routerState = this.router.routerState.root;
        let url = null;
        while (routerState) {
            const name = routerState.snapshot.data.name;
            if (name != null && name != undefined) {
                if (url == null || url == undefined) {
                    url = routerState.snapshot.url.join('');
                } else {
                    url += '/' + routerState.snapshot.url.join('');
                }
                this.routerTree.push({
                    url,
                    name,
                    isActive: false
                });
            }
            routerState = routerState.firstChild;
        }
        if (this.routerTree.length > 0) {
            this.routerTree[this.routerTree.length - 1].isActive = true;
        }
    }

    //#endregion

}
