import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as $ from 'jquery';
import { MasterDataModule } from '@app/modules/master-data/master-data.module';
import { UserModule } from '@app/modules/user/user.module';
import { CoreModule } from '@app/core/core.module';
import { HomeModule } from './modules/home/home.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MasterDataModule,
        UserModule,
        CoreModule.forRoot(),
        HomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
