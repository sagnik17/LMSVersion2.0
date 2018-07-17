"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var alertservice_1 = require("../_services/alertservice");
var AuthenticationService_1 = require("../_services/AuthenticationService");
var Users_1 = require("../_models/Users");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, _alertService, _authenticationService, router) {
        this.fb = fb;
        this._alertService = _alertService;
        this._authenticationService = _authenticationService;
        this.router = router;
        this.model = new Users_1.User('', '', '', '', '', '');
        this.loading = false;
        this._authenticationService.isAuthenticated('login');
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._authenticationService.logout();
    };
    //Method to check User Ceredentials and Redirect to Home Page
    LoginComponent.prototype.login = function (forms) {
        var _this = this;
        this.loading = true;
        this._dataobj = forms.value;
        console.log(JSON.stringify(this._dataobj));
        this._authenticationService.loginUser(this._dataobj).subscribe(function (user) {
            _this._alertService.clear();
            if (user.length != 0) {
                //this._alertService.success('Login !!!'); 
                localStorage.setItem("loggedinUser", JSON.stringify(user));
                // console.log("This is from loaclstorage" + localStorage.getItem("loggedinUser"));
                _this.refresh();
            }
            else {
                _this._alertService.error('Incorrect Username or Password !!!');
                _this.loading = false;
            }
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to refresh the page
    LoginComponent.prototype.refresh = function () {
        window.location.reload();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, alertservice_1.AlertService,
            AuthenticationService_1.AuthenticationService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map