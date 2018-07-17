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
var angular2_uuid_1 = require("angular2-uuid");
var books_1 = require("../_models/books");
var bookIssued_1 = require("../_models/bookIssued");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_authenticationService, _alertService, router, _bookservice) {
        this._authenticationService = _authenticationService;
        this._alertService = _alertService;
        this.router = router;
        this._bookservice = _bookservice;
        this.bookissued = new bookIssued_1.BookIssued('', '', '', 0, 0, false, false);
        this.bookList = [];
        this.bookIssuedList = [];
        this.isReturn = true;
        this.dispalybook = new books_1.Book('', '', '', '', 0, 0, '', '', '');
        this.categories = ['All', 'Nonfiction', 'Technology', 'Economics', 'Politics'];
        this.flag = true;
        this._authenticationService.isAuthenticated('home');
    }
    //Method to show all the books
    HomeComponent.prototype.getAllBooks = function () {
        var _this = this;
        this.resetData();
        this._bookservice.getAllBooks().subscribe(function (res) {
            _this.localBookList = res;
            _this.localBookList.forEach(function (x) {
                x = Object.assign({}, x);
                _this.bookList.push(x);
            });
            if (_this.bookIssuedList.length > 0)
                _this.joinArray();
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to show all books which can be issued
    HomeComponent.prototype.showAllBooks = function () {
        var _this = this;
        this.resetData();
        this.templist.forEach(function (element) {
            element = Object.assign({}, element);
            if (element.isReturn === true) { }
            else
                _this.bookList.push(element);
        });
    };
    //Method to join the data of table i.e. books and booksissued
    HomeComponent.prototype.joinArray = function () {
        var _this = this;
        this.templist = this.bookList.map(function (val) {
            return Object.assign({}, val, _this.bookIssuedList.filter(function (v) { return v.bookid === val.id; })[0]);
        });
        this.showAllBooks();
        //console.log(this.templist);
    };
    //Method to issue the book
    HomeComponent.prototype.IssueBook = function (book) {
        var _this = this;
        if (this.bookIssuedList.length < 5) {
            this.date = new Date();
            this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
            this.bookissued.bookid = book.id;
            this.bookissued.userid = this.currentUser[0]["id"];
            this.bookissued.id = angular2_uuid_1.UUID.UUID();
            this.bookissued.DateOfIssue = Date.now();
            this.bookissued.DateOfReturn = this.date.setDate(this.date.getDate() + 10);
            this.bookissued.isReturn = true;
            this.bookissued.isIssue = false;
            this._bookservice.issueBook(this.bookissued).then(function (bookisse) {
                _this._alertService.clear();
                _this.updateBookDetails(book);
                _this._alertService.success('Book Issued Successfully');
                _this.ngOnInit();
            }, function (error) { return _this._alertService.error(error); });
        }
        else {
            this._alertService.clear();
            this._alertService.warn("Book Issue Limit Exceeded !!!");
        }
    };
    //Method to show the book details in Modal
    HomeComponent.prototype.viewBook = function (book) {
        this.dispalybook = book;
    };
    HomeComponent.prototype.updateBookDetails = function (book) {
        var _this = this;
        book.NumberOfCopies = book.NumberOfCopies - 1;
        this._alertService.clear();
        this._bookservice.updateBook(book).then(function (res) {
            // this.ngOnInit();
            // this._alertService.success('Profile Updated Sucessfully'); 
            // this.router.navigate(['/profile']);
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to get the books list issues by the logged in User
    HomeComponent.prototype.getBookIssued = function () {
        var _this = this;
        this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
        this._bookservice.getBooksIssues(this.currentUser[0]["id"]).subscribe(function (list) {
            _this.localBookList = list;
            _this.localBookList.forEach(function (element) {
                element = Object.assign({}, element);
                _this.bookIssuedList.push(element);
            });
        }, function (error) { return _this._alertService.error(error); });
    };
    HomeComponent.prototype.ngOnInit = function () {
        if (this.flag === true) {
            this.getBookIssued();
            this.getAllBooks();
        }
        if (this.bookIssuedList.length > 0 && this.flag === false) {
            this.resetData();
            this.showAllBooks();
        }
    };
    HomeComponent.prototype.resetData = function () {
        this.bookList = [];
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [AuthenticationService_1.AuthenticationService, alertservice_1.AlertService,
            router_1.Router, BookService_1.BookService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map