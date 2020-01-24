import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AceLayoutComponent } from '@app/shared/layouts/ace-layout/ace-layout.component';
import { HomeComponent } from '@app/modules/home/home/home.component';


const routes: Routes = [
    {
        path: '',
        component: AceLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
