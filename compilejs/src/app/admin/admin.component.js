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
var alertservice_1 = require("../_services/alertservice");
var angular2_uuid_1 = require("angular2-uuid");
var AuthenticationService_1 = require("../_services/AuthenticationService");
var router_1 = require("@angular/router");
var BookService_1 = require("../_services/BookService");
var books_1 = require("../_models/books");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(_alertService, _authenticationService, router, _bookservice) {
        this._alertService = _alertService;
        this._authenticationService = _authenticationService;
        this.router = router;
        this._bookservice = _bookservice;
        this.bookList = [];
        this.dispalybook = new books_1.Book('', '', '', '', 0, 0, '', '', '');
        this.model = new books_1.Book('', '', '', '', 0, 0, '', '', '');
        this.addbookmodel = new books_1.Book(this.createUUID(), '', '', '', 0, 0, '', '', '');
        this.categories = ['All', 'Nonfiction', 'Technology', 'Economics', 'Politics'];
        this.addcategories = ['Nonfiction', 'Technology', 'Economics', 'Politics'];
        this._authenticationService.isAuthenticated('login');
    }
    //Method to show all the books
    AdminComponent.prototype.getAllBooks = function () {
        var _this = this;
        this.resetData();
        this._bookservice.getAllBooks().subscribe(function (res) {
            _this.localBookList = res;
            _this.localBookList.forEach(function (x) {
                x = Object.assign({}, x);
                _this.bookList.push(x);
            });
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to update the Book Details
    AdminComponent.prototype.editBook = function (forms) {
        var _this = this;
        this._alertService.clear();
        this._dataobj = forms.value;
        if (this._dataobj.TotalCopies >= this._dataobj.NumberOfCopies) {
            this._bookservice.updateBook(this._dataobj).then(function (user) {
                _this.ngOnInit();
                _this._alertService.success('Book Details Updated Sucessfully');
                //this.router.navigate(['/admin']);
            }, function (error) { return _this._alertService.error(error); });
        }
        else {
            this._alertService.warn("Update Failed ! Total Copies Cannot be less than Available Copies !!!");
            this.ngOnInit();
        }
    };
    //Method to show the book details in Modal
    AdminComponent.prototype.viewBook = function (book) {
        this.dispalybook = book;
    };
    AdminComponent.prototype.viewBookForEdit = function (book) {
        this.model = book;
    };
    AdminComponent.prototype.AddBook = function (forms) {
        var _this = this;
        this._dataobj = forms.value;
        this._alertService.clear();
        this._bookservice.AddBook(this._dataobj).then(function (user) {
            _this.ngOnInit();
            _this._alertService.success('Book Added Sucessfull', true);
            _this.router.navigate(['/admin']);
        }, function (error) { return _this._alertService.error(error); });
    };
    AdminComponent.prototype.DeleteBook = function (book) {
        var _this = this;
        this._alertService.clear();
        this._bookservice.deleteBook(book).then(function (res) {
            _this.ngOnInit();
            _this._alertService.success("Book Deleted Successfully", true);
            _this.router.navigate(['/admin']);
        }, function (error) { return _this._alertService.error(error); });
    };
    //Method to create unique id for each book
    AdminComponent.prototype.createUUID = function () {
        var uuid = angular2_uuid_1.UUID.UUID();
        return uuid;
    };
    AdminComponent.prototype.ngOnInit = function () {
        this.getAllBooks();
    };
    AdminComponent.prototype.resetAddBookForm = function () {
        this.addbookmodel = new books_1.Book(this.createUUID(), '', '', '', 0, 0, '', '', '');
    };
    AdminComponent.prototype.resetData = function () {
        this.bookList = [];
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [alertservice_1.AlertService,
            AuthenticationService_1.AuthenticationService, router_1.Router, BookService_1.BookService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map