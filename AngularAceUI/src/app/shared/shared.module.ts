import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AceLayoutComponent } from './layouts/ace-layout/ace-layout.component';
import { AceLayoutHeaderComponent } from './layouts/ace-layout/header/ace-layout-header.component';
import { AceLayoutFooterComponent } from './layouts/ace-layout/footer/ace-layout-footer.component';
import { AceLayoutSidebarComponent } from './layouts/ace-layout/sidebar/ace-layout-sidebar.component';
import { AceLayoutSettingComponent } from './layouts/ace-layout/setting/ace-layout-setting.component';
import { AceLayoutPageHeaderComponent } from './layouts/ace-layout/page-header/ace-layout-page-header.component';
import { AceLayoutHeaderTasksComponent } from './layouts/ace-layout/header/tasks/ace-layout-header-tasks.component';
import { AceLayoutHeaderMessagesComponent } from './layouts/ace-layout/header/messages/ace-layout-header-messages.component';
import { AceLayoutHeaderNotificationsComponent } from './layouts/ace-layout/header/notifications/ace-layout-header-notifications.component';
import { AceLayoutHeaderUserMenuComponent } from './layouts/ace-layout/header/user-menu/ace-layout-header-user-menu.component';
import { ColorPickerComponent } from '@app/shared/components/ace/color-picker/color-picker.component';
import { ScrollDirective } from './directives/ace/scroll.directive';
import { WidgetBoxDirective } from './directives/ace/widget-box.directive';
import { WidgetHeaderComponent } from './components/ace/widget-header/widget-header.component';



@NgModule({
    declarations: [
        AceLayoutComponent,
        AceLayoutHeaderComponent,
        AceLayoutFooterComponent,
        AceLayoutSidebarComponent,
        AceLayoutSettingComponent,
        AceLayoutPageHeaderComponent,
        ColorPickerComponent,
        AceLayoutHeaderTasksComponent,
        AceLayoutHeaderMessagesComponent,
        AceLayoutHeaderNotificationsComponent,
        AceLayoutHeaderUserMenuComponent,
        ScrollDirective,
        WidgetBoxDirective,
        WidgetHeaderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        AceLayoutComponent,
        AceLayoutHeaderComponent,
        AceLayoutFooterComponent,
        AceLayoutSidebarComponent,
        AceLayoutSettingComponent,
        AceLayoutPageHeaderComponent,
        ColorPickerComponent,
        AceLayoutHeaderTasksComponent,
        AceLayoutHeaderMessagesComponent,
        AceLayoutHeaderNotificationsComponent,
        AceLayoutHeaderUserMenuComponent,
        ScrollDirective,
        WidgetBoxDirective,
        WidgetHeaderComponent,
    ]
})
export class SharedModule { }
