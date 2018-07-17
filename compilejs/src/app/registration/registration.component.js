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
var angular2_uuid_1 = require("angular2-uuid");
var alertservice_1 = require("../_services/alertservice");
var AuthenticationService_1 = require("../_services/AuthenticationService");
var Users_1 = require("../_models/Users");
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(fb, _alertService, _authenticationService, router) {
        this.fb = fb;
        this._alertService = _alertService;
        this._authenticationService = _authenticationService;
        this.router = router;
        this.loading = false;
        this.duplicateUsername = true;
        this.model = new Users_1.User(this.createUUID(), '', '', '', '', '');
        this._authenticationService.isAuthenticated('register');
    }
    //Method to Register the User
    RegistrationComponent.prototype.RegistrationProcess = function (model) {
        var _this = this;
        this.loading = true;
        //console.log(JSON.stringify(this._dataobj));
        this._alertService.clear();
        this._authenticationService.registerUser(this._dataobj).then(function (user) {
            _this._alertService.success('Registration Sucessfull', true);
            _this.router.navigate(['/login']);
            _this.loading = false;
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to check Duplicate Username
    RegistrationComponent.prototype.checkDuplicate = function (forms) {
        var _this = this;
        this._dataobj = forms.value;
        this._authenticationService.checkDuplicateUsername(this._dataobj).subscribe(function (user) {
            _this._alertService.clear();
            if (user.length == 0) {
                _this.RegistrationProcess(_this._dataobj);
            }
            else {
                _this._alertService.warn("Username already Exist. Please try a different One !!!");
                _this.loading = false;
            }
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to create unique id for each user
    RegistrationComponent.prototype.createUUID = function () {
        var uuid = angular2_uuid_1.UUID.UUID();
        return uuid;
    };
    RegistrationComponent.prototype.ngOnInit = function () {
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-registration',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, alertservice_1.AlertService,
            AuthenticationService_1.AuthenticationService,
            router_1.Router])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map