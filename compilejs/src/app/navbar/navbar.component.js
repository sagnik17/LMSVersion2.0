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
var AuthenticationService_1 = require("../_services/AuthenticationService");
var router_1 = require("@angular/router");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(_authenticationService, router) {
        this._authenticationService = _authenticationService;
        this.router = router;
        this.isAuthenticated();
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this._authenticationService.getAll();
    };
    NavbarComponent.prototype.isAuthenticated = function () {
        //console.log(localStorage.getItem('loggedinUser'));
        if (localStorage.getItem('loggedinUser') == null) {
            this.showNav = false;
            this.showAdminNav = false;
        }
        else {
            this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
            if (this.currentUser[0]["username"] == "admin123" && this.currentUser[0]["password"] == "admin123") {
                this.showAdminNav = true;
                this.router.navigate(['admin']);
            }
            else {
                this.showNav = true;
                this.router.navigate(['home']);
            }
        }
    };
    NavbarComponent.prototype.logout = function () {
        var value = this._authenticationService.logout();
        //  if(value ==  true)
        //   this.router.navigate(['login']);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [AuthenticationService_1.AuthenticationService, router_1.Router])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map