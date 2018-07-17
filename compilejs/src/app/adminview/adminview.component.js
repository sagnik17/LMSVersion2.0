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
var BookService_1 = require("../_services/BookService");
var alertservice_1 = require("../_services/alertservice");
var bookIssued_1 = require("../_models/bookIssued");
var AdminviewComponent = /** @class */ (function () {
    function AdminviewComponent(_authenticationService, _alertService, router, _bookservice) {
        this._authenticationService = _authenticationService;
        this._alertService = _alertService;
        this.router = router;
        this._bookservice = _bookservice;
        this.bookissued = new bookIssued_1.BookIssued('', '', '', 0, 0, false, false);
        this.bookList = [];
        this.bookIssuedList = [];
        this.templist = [];
        this.finalList = [];
        this.userList = [];
        this.usertempList = [];
    }
    AdminviewComponent.prototype.getAllBookIssued = function () {
        var _this = this;
        this._bookservice.getAllBooksIssues().subscribe(function (list) {
            _this.localBookList = list;
            _this.localBookList.forEach(function (element) {
                element = Object.assign({}, element);
                _this.bookIssuedList.push(element);
            });
        }, function (error) { return _this._alertService.error(error); });
    };
    AdminviewComponent.prototype.getAllUser = function () {
        var _this = this;
        this._authenticationService.getAll().subscribe(function (res) {
            _this.localBookList = res;
            _this.localBookList.forEach(function (x) {
                x = Object.assign({}, x);
                _this.userList.push(x);
            });
        }, function (error) { return _this._alertService.error(error); });
    };
    AdminviewComponent.prototype.getAllBooks = function () {
        var _this = this;
        this._bookservice.getAllBooks().subscribe(function (res) {
            _this.localBookList = res;
            _this.localBookList.forEach(function (x) {
                x = Object.assign({}, x);
                _this.bookList.push(x);
            });
            if (_this.bookIssuedList.length > 0 && _this.userList.length > 0)
                _this.joinArray();
        }, function (error) { return _this._alertService.error(error); });
    };
    AdminviewComponent.prototype.joinArray = function () {
        var _this = this;
        this.templist = this.userList.map(function (val) {
            return Object.assign({}, val, _this.bookIssuedList.filter(function (v) { return v.userid === val.id; })[0]);
        });
        this.usertempList = this.bookList.map(function (val) {
            return Object.assign({}, val, _this.templist.filter(function (v) { return v.bookid === val.id; })[0]);
        });
        this.usertempList.forEach(function (element) {
            element = Object.assign({}, element);
            if (element.isReturn === true) {
                _this.finalList.push(element);
            }
        });
    };
    AdminviewComponent.prototype.ngOnInit = function () {
        this.getAllBookIssued();
        this.getAllUser();
        this.getAllBooks();
        this.joinArray();
    };
    AdminviewComponent = __decorate([
        core_1.Component({
            selector: 'app-adminview',
            templateUrl: './adminview.component.html',
            styleUrls: ['./adminview.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [AuthenticationService_1.AuthenticationService, alertservice_1.AlertService,
            router_1.Router, BookService_1.BookService])
    ], AdminviewComponent);
    return AdminviewComponent;
}());
exports.AdminviewComponent = AdminviewComponent;
//# sourceMappingURL=adminview.component.js.map