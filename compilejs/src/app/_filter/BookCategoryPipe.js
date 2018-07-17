"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BookCategoryPipe = /** @class */ (function () {
    function BookCategoryPipe() {
    }
    BookCategoryPipe.prototype.transform = function (items, category) {
        if (category === undefined) {
            return items;
        }
        else if (category === 'All') {
            return items;
        }
        else {
            return items.filter(function (item) {
                return item.category.toLowerCase().includes(category.toLowerCase());
            }); //item => item.category === category);
        }
    };
    BookCategoryPipe = __decorate([
        core_1.Pipe({
            name: 'bookCategoryFilter',
            pure: false
        }),
        core_1.Injectable()
    ], BookCategoryPipe);
    return BookCategoryPipe;
}());
exports.BookCategoryPipe = BookCategoryPipe;
//# sourceMappingURL=BookCategoryPipe.js.map