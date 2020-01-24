import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '@app/core/core.module';



@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        SharedModule,
        CoreModule.forRoot()
    ]
})
export class UserModule { }
