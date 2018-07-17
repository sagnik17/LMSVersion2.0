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
require("rxjs/Rx"); //get everything from Rx  
require("rxjs/add/operator/toPromise");
var registrationService = /** @class */ (function () {
    function registrationService(_http) {
        this._http = _http;
        this.url = 'http://localhost:3000/users/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    registrationService.prototype.registerUser = function (model) {
        return this._http.post(this.url, model, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    registrationService.prototype.loginUser = function (model) {
        var newurl = this.url + '?username=' + model.username + '&&password=' + model.password;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    };
    registrationService.prototype.checkDuplicateUsername = function (model) {
        var newurl = this.url + '?username=' + model.username;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    };
    // extract the response data to json
    registrationService.prototype.extractData = function (res) {
        console.log(res.json());
        return res.json() || [];
    };
    // error handling
    registrationService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.message || error);
    };
    registrationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], registrationService);
    return registrationService;
}());
exports.registrationService = registrationService;
//# sourceMappingURL=regustrationservice.js.map