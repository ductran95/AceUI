import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[aceScroll]'
})
export class ScrollDirective implements OnChanges {


    //#region Inputs, Outputs

    @Input() scrollOptions: AceScrollOptionsInterface;

    //#endregion

    //#region Properties

    private scroller: any;

    //#endregion

    //#region Constructors

    constructor(private el: ElementRef) { }

    //#endregion

    //#region OnInit, OnChange

    ngOnChanges(changes: SimpleChanges): void {
        if (this.scroller == null) {
            this.scroller = jQuery(this.el.nativeElement).ace_scroll(this.scrollOptions).ace_scroll('ref');
        } else {
            this.scroller.update(this.scrollOptions);
            this.scroller.reset();
        }
    }

    //#endregion

    //#region Funtions

    //#endregion

}
