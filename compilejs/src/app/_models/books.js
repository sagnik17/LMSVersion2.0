"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Book = /** @class */ (function () {
    function Book(id, Bookname, Author, ISBN, NumberOfCopies, TotalCopies, category, description, imageurl) {
        this.id = id;
        this.Bookname = Bookname;
        this.Author = Author;
        this.ISBN = ISBN;
        this.NumberOfCopies = NumberOfCopies;
        this.TotalCopies = TotalCopies;
        this.category = category;
        this.description = description;
        this.imageurl = imageurl;
    }
    return Book;
}());
exports.Book = Book;
//# sourceMappingURL=books.js.map