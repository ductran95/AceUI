import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MasterDataRoutingModule,
        SharedModule,
        FormsModule,
        CoreModule.forRoot()
    ]
})
export class MasterDataModule { }
