import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrls } from '@app/core/constants/apiUrls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';
import { LoginModel } from '@app/core/models/data/login-model';

@Injectable()
export class AuthenticationService {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    private baseUrl = environment.baseUrl;
    private apiUrl = apiUrls.user;
    private _jwtSecret: string;

    //#endregion

    //#region Constructors

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
        const jwtSecret = this.localStorageService.getLocal('_jwtSecret');
        if (jwtSecret) {
            this._jwtSecret = jwtSecret;
        }
    }

    //#endregion

    //#region Funtions

    logIn(loginParam: LoginModel): Observable<boolean> {
        return this.http.post<LoginModel>(this.baseUrl + this.apiUrl.login, loginParam).pipe(
            map(
                (resp: any) => {
                    this._jwtSecret = resp;
                    if (loginParam.remember) {
                        this.localStorageService.saveLocal('_jwtSecret', this._jwtSecret);
                    }
                    return true;
                },
                error => {
                    this._jwtSecret = null;
                    return false;
                })
        );
    }

    logOut() {
        this._jwtSecret = null;
        this.localStorageService.clearLocal('_jwtSecret');
    }

    isAuthenticated(): boolean {
        return this._jwtSecret != null;
    }

    getJwt(): string {
        return this._jwtSecret;
    }

    //#endregion
}
