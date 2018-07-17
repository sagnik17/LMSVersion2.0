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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var router_1 = require("@angular/router");
require("rxjs/Rx"); //get everything from Rx  
require("rxjs/add/operator/toPromise");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(_http, router) {
        this._http = _http;
        this.router = router;
        this.url = 'http://localhost:3000/users/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    //Service Method To Register the User
    AuthenticationService.prototype.registerUser = function (model) {
        return this._http.post(this.url, model, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    //Service Method To Log the User in their account
    AuthenticationService.prototype.loginUser = function (model) {
        var newurl = this.url + '?username=' + model.username + '&&password=' + model.password;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    };
    //Service Method To Log the User in their account
    AuthenticationService.prototype.getProfile = function (model) {
        var newurl = this.url + '?id=' + model[0]["id"];
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    };
    //Service Method To check for duplicate username during registration
    AuthenticationService.prototype.checkDuplicateUsername = function (model) {
        var newurl = this.url + '?username=' + model.username;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    };
    //Service Method To logout the User
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("loggedinUser");
        return true;
    };
    //Service Method To get the list of all the User
    AuthenticationService.prototype.getAll = function () {
        return this._http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    };
    //Service Method To check if the user authenticated to login
    AuthenticationService.prototype.isAuthenticated = function (pagename) {
        //console.log(localStorage.getItem('loggedinUser'));
        if (localStorage.getItem('loggedinUser') == null) {
            this.showNav = false;
            this.showAdminNav = false;
            this.router.navigate([pagename]);
        }
        else {
            this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
            if (this.currentUser[0]["username"] == "admin123" && this.currentUser[0]["password"] == "admin123") {
                this.showAdminNav = true;
                this.router.navigate(['admin']);
            }
            else {
                this.showNav = true;
                this.router.navigate([pagename]);
            }
        }
    };
    AuthenticationService.prototype.updateProfile = function (model) {
        var newurl = this.url + model.id;
        return this._http.put(newurl, model, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    // extract the response data to json
    AuthenticationService.prototype.extractData = function (res) {
        //console.log(res.json());
        return res.json() || [];
    };
    // error handling
    AuthenticationService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.message || error);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map