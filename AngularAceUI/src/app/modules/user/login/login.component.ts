import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';
import { AlertService } from '@app/core/services/common/alert.service';
import { NgForm } from '@angular/forms';
import { LoginModel } from '@app/core/models/data/login-model';

@Component({
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    static readonly bodyClass: string = 'login-layout';
    loginModel: LoginModel;

    //#endregion

    //#region Constructors

    constructor(private renderer2: Renderer2, private route: ActivatedRoute, private router: Router,
        private authService: AuthenticationService, private alertService: AlertService) { }

    //#endregion

    //#region OnInit, OnDestroy

    ngOnInit() {
        this.renderer2.setAttribute(document.body, 'class', LoginComponent.bodyClass);

        this.loginModel = new LoginModel();
    }

    ngOnDestroy() {
        this.renderer2.removeClass(document.body, LoginComponent.bodyClass);
    }

    //#endregion

    //#region Funtions

    resetForm() {
        this.loginModel = new LoginModel();
    }

    onLogInFormSubmit(logInForm: NgForm) {
        if (logInForm.valid) {
            this.authService.logIn(this.loginModel).subscribe(
                (resp: boolean) => {
                    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
                    this.router.navigate([returnUrl]);
                },
                error => {
                    this.alertService.error('Login failed!');
                }
            );
        }
    }

    //#endregion

}
