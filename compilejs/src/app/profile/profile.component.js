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
var router_1 = require("@angular/router");
var AuthenticationService_1 = require("../_services/AuthenticationService");
var alertservice_1 = require("../_services/alertservice");
var Users_1 = require("../_models/Users");
var http_1 = require("@angular/http");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(_authenticationService, _alertService, router, http) {
        this._authenticationService = _authenticationService;
        this._alertService = _alertService;
        this.router = router;
        this.http = http;
        this.model = new Users_1.User('', '', '', '', '', '');
        this._authenticationService.isAuthenticated('profile');
    }
    //Method to get the Logged in User Profile
    ProfileComponent.prototype.getProfile = function () {
        var _this = this;
        this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
        this._authenticationService.getProfile(this.currentUser).subscribe(function (user) {
            _this.currentUser = user;
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to update the User Data
    ProfileComponent.prototype.editProfile = function (forms) {
        var _this = this;
        this._alertService.clear();
        this._dataobj = forms.value;
        this._authenticationService.updateProfile(this._dataobj).then(function (user) {
            _this.ngOnInit();
            _this._alertService.success('Profile Updated Sucessfully');
            _this.router.navigate(['/profile']);
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to show the User data in Modal
    ProfileComponent.prototype.viewProfile = function () {
        this.model = new Users_1.User(this.currentUser[0]["id"], this.currentUser[0]["username"], this.currentUser[0]["password"], this.currentUser[0]["firstName"], this.currentUser[0]["lastName"], this.currentUser[0]["email"]);
    };
    ProfileComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", Object)
    ], ProfileComponent.prototype, "fileInput", void 0);
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [AuthenticationService_1.AuthenticationService, alertservice_1.AlertService,
            router_1.Router, http_1.Http])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map