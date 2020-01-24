import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import * as _ from 'lodash';

@Component({
    selector: 'ace-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent implements ControlValueAccessor, OnInit {

    //#region Inputs, Outputs

    @Input() cpColorList: { id: any; color: string; selected?: boolean }[];
    @Input() cpOptions: { pull_right: boolean; caret: boolean };
    protected selectedColor = { id: null, color: '' };

    //#endregion

    //#region Properties

    // Placeholders for the callbacks which are later providesd
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (value: any) => void = noop;

    //#endregion

    //#region Constructors

    constructor(private changeDetector: ChangeDetectorRef) { }

    //#endregion

    //#region OnInit

    ngOnInit() {
        for (const colorItem of this.cpColorList) {
            colorItem.selected = false;
        }
    }

    //#endregion

    //#region Funtions

    chooseColor(item) {
        if (this.selectedColor.id != item.id) {
            this.selectedColor = _.pick(item, ['id', 'color']);
            this.onChangeCallback(this.selectedColor.id);

            for (const colorItem of this.cpColorList) {
                colorItem.selected = false;
            }
            item.selected = true;
        }
    }
    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    writeValue(obj: any): void {
        if (obj !== this.selectedColor.id) {
            const color = _.find(this.cpColorList, { id: obj });
            this.selectedColor = _.pick(color, ['id', 'color']);
            color.selected = true;
            console.log(this.selectedColor);
            this.changeDetector.markForCheck();
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

    //#endregion

}
