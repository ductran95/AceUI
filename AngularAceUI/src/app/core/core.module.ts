import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from '@app/core/interceptors/authentication.interceptor';
import { AuthenticationGuard } from '@app/core/guards/authentication.guard';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';
import { AlertService } from '@app/core/services/common/alert.service';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';
import { AceLayoutService } from '@app/core/services/ace/ace-layout.service';
import { AceSettingService } from '@app/core/services/ace/ace-setting.service';
import { AceSidebarService } from '@app/core/services/ace/ace-sidebar.service';
import { AceService } from '@app/core/services/ace/ace.service';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthenticationInterceptor,
                    multi: true
                },
                AuthenticationGuard,
                AuthenticationService,
                AlertService,
                LocalStorageService,
                AceLayoutService,
                AceSettingService,
                AceSidebarService,
                AceService
            ]
        };
    }
}
