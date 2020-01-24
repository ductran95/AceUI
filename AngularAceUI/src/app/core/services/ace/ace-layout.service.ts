import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { apiUrls } from '@app/core/constants/apiUrls';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AceLayoutService {

    //#region Properties

    private baseUrl = environment.baseUrl;
    private apiUrl = apiUrls.layout;

    //#endregion

    //#region Constructors

    constructor(private http: HttpClient) { }

    //#endregion

    //#region Funtions

    getSidebarMenu() {
        return this.http.get(this.baseUrl + this.apiUrl.getSidebarMenu);
    }

    getMessages() {
        return this.http.get(this.baseUrl + this.apiUrl.getMessages);
    }

    getTasks() {
        return this.http.get(this.baseUrl + this.apiUrl.getTasks);
    }

    getNotifications() {
        return this.http.get(this.baseUrl + this.apiUrl.getNotifications);
    }


    //#endregion
}
