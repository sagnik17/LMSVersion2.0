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
var BookService = /** @class */ (function () {
    function BookService(_http, router) {
        this._http = _http;
        this.router = router;
        this.url = 'http://localhost:3000/books/';
        this.bookissueurl = 'http://localhost:3000/booksIssued/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    BookService.prototype.getAllBooks = function () {
        return this._http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    };
    // extract the response data to json
    BookService.prototype.extractData = function (res) {
        //console.log(res.json());
        return res.json() || [];
    };
    BookService.prototype.issueBook = function (bookissue) {
        return this._http.post(this.bookissueurl, bookissue, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    BookService.prototype.getBooksIssues = function (userid) {
        var newurl = this.bookissueurl + '?userid=' + userid;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    };
    BookService.prototype.getAllBooksIssues = function () {
        return this._http.get(this.bookissueurl, this.options).map(this.extractData).catch(this.handleError);
    };
    BookService.prototype.returnBook = function (bookissueid) {
        var url = this.bookissueurl + bookissueid;
        return this._http.delete(url, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    BookService.prototype.updateBook = function (book) {
        var newurl = this.url + book.id;
        return this._http.put(newurl, book, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    BookService.prototype.AddBook = function (book) {
        book.NumberOfCopies = book.TotalCopies;
        book.imageurl = "../../assets/bookcover.jpg";
        return this._http.post(this.url, book, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    BookService.prototype.deleteBook = function (book) {
        var newurl = this.url + book.id;
        return this._http.delete(newurl, this.options).toPromise().then(this.extractData).catch(this.handleError);
    };
    // error handling
    BookService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.message || error);
    };
    BookService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=BookService.js.map