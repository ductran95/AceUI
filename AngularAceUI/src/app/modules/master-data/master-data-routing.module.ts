import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AceLayoutComponent } from '@app/shared/layouts/ace-layout/ace-layout.component';


const routes: Routes = [
    {
        path: '',
        component: AceLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterDataRoutingModule { }
