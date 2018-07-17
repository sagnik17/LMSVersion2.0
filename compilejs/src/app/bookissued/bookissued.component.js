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
var books_1 = require("../_models/books");
var bookIssued_1 = require("../_models/bookIssued");
var BookissuedComponent = /** @class */ (function () {
    function BookissuedComponent(_authenticationService, _alertService, router, _bookservice) {
        this._authenticationService = _authenticationService;
        this._alertService = _alertService;
        this.router = router;
        this._bookservice = _bookservice;
        this.book = new books_1.Book('', '', '', '', 0, 0, '', '', '');
        this.bookissued = new bookIssued_1.BookIssued('', '', '', 0, 0, false, false);
        this.bookList = [];
        this.bookIssuedList = [];
        this.isReturn = true;
        this.dispalybook = new books_1.Book('', '', '', '', 0, 0, '', '', '');
        this.categories = ['All', 'Nonfiction', 'Technology', 'Economics', 'Politics'];
        this._authenticationService.isAuthenticated('bookissuesd');
    }
    //Method to show all the books
    BookissuedComponent.prototype.getAllBooks = function () {
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
            else
                _this.resetData();
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to show all books which can be issued
    BookissuedComponent.prototype.showAllBooks = function () {
        var _this = this;
        this.resetData();
        this.templist.forEach(function (element) {
            element = Object.assign({}, element);
            if (element.isReturn === true) {
                _this.bookList.push(element);
            }
        });
    };
    //Method to join the data of table i.e. books and booksissued
    BookissuedComponent.prototype.joinArray = function () {
        var _this = this;
        this.templist = this.bookList.map(function (val) {
            return Object.assign({}, val, _this.bookIssuedList.filter(function (v) { return v.bookid === val.id; })[0]);
        });
        this.showAllBooks();
        //console.log(this.templist);
    };
    //Method to return the book
    BookissuedComponent.prototype.ReturnBook = function (bookissued) {
        var _this = this;
        this.Mapping(bookissued);
        this._alertService.clear();
        this._bookservice.returnBook(bookissued.id).then(function (res) {
            _this._alertService.clear();
            _this.updateBookDetails(_this.book);
            _this._alertService.success("Book Returned Successfully", true);
            _this.router.navigate(['/home']);
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to show the book details in Modal
    BookissuedComponent.prototype.viewBook = function (book) {
        this.dispalybook = book;
    };
    BookissuedComponent.prototype.Mapping = function (bookissued) {
        this.book.id = bookissued.bookid;
        this.book.Author = bookissued.Author;
        this.book.Bookname = bookissued.Bookname;
        this.book.category = bookissued.category;
        this.book.description = bookissued.description;
        this.book.imageurl = bookissued.imageurl;
        this.book.ISBN = bookissued.ISBN;
        this.book.NumberOfCopies = bookissued.NumberOfCopies;
    };
    BookissuedComponent.prototype.updateBookDetails = function (book) {
        var _this = this;
        book.NumberOfCopies = book.NumberOfCopies + 1;
        this._alertService.clear();
        this._bookservice.updateBook(book).then(function (res) {
            // this.ngOnInit();
            // this._alertService.success('Profile Updated Sucessfully'); 
            // this.router.navigate(['/profile']);
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to get the books list issues by the logged in User
    BookissuedComponent.prototype.getBookIssued = function () {
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
    BookissuedComponent.prototype.ngOnInit = function () {
        this.getBookIssued();
        this.getAllBooks();
        if (this.bookIssuedList.length > 0)
            this.showAllBooks();
        if (this.bookIssuedList.length === 0)
            this.resetData();
    };
    BookissuedComponent.prototype.resetData = function () {
        this.bookList = [];
    };
    BookissuedComponent = __decorate([
        core_1.Component({
            selector: 'app-bookissued',
            templateUrl: './bookissued.component.html',
            styleUrls: ['./bookissued.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [AuthenticationService_1.AuthenticationService, alertservice_1.AlertService,
            router_1.Router, BookService_1.BookService])
    ], BookissuedComponent);
    return BookissuedComponent;
}());
exports.BookissuedComponent = BookissuedComponent;
//# sourceMappingURL=bookissued.component.js.map