/// <reference types="jquery"/>
// Type definitions for ace ui

interface AceInterface {
    sidebar: AceSidebarInterface;
    setting: AceSettingInterface;
}

interface AceSidebarInterface {
    loadSetting(): any;
    saveSetting(): any;
    minimized: boolean;
    toggle: boolean;
    reset: boolean;
}

interface AceSettingInterface {
    loadSetting(): any;
    saveSetting(): any;
    skinIndex: number;
    getBodySkin(): string;
    is_open: boolean;
    open(): void;
    navbar: boolean;
    sidebar: boolean;
    breadcrumbs: boolean;
    container: boolean;
    hover: boolean;
    compact: boolean;
    highlight: boolean;
    rtl: boolean;
    skinColor: string;
}

interface AceScrollOptionsInterface {
    size?: number;
    mouseWheelLock?: boolean;
    reset?: boolean;
}

interface AceWidgetBoxOptionsInterface {
    reloading?: boolean;
    fullscreen?: boolean;
    close?: boolean;
    hidden?: boolean;
    toggle?: boolean;
    save?: boolean;
    saveName?: any;
}

interface AceWidgetHeaderOptionsInterface {
    fullscreen?: boolean;
    reload?: boolean;
    toggle?: boolean;
    close?: boolean;
}

interface JQuery {
    // iCheck(options?: string): JQuery;
    ace_sidebar(options?: any): void;
    ace_sidebar_scroll(options?: any): void;
    ace_sidebar_hover(options?: any): void;
    ace_scroll(options?: AceScrollOptionsInterface | string): JQuery;
    widget_box(options?: any): void;
    widget_box(options?: any, value?: any): void;
}
