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
var hero_1 = require("../_models/hero");
var HeroComponent = /** @class */ (function () {
    function HeroComponent() {
        this.powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
        this.model = new hero_1.Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
        this.submitted = false;
    }
    HeroComponent.prototype.ngOnInit = function () {
    };
    HeroComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(HeroComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    HeroComponent.prototype.newHero = function () {
        this.model = new hero_1.Hero(42, '', '');
    };
    HeroComponent.prototype.skyDog = function () {
        var myHero = new hero_1.Hero(42, 'SkyDog', 'Fetch any object at any distance', 'Leslie Rollover');
        console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
        return myHero;
    };
    //////// NOT SHOWN IN DOCS ////////
    // Reveal in html:
    //   Name via form.controls = {{showFormControls(heroForm)}}
    HeroComponent.prototype.showFormControls = function (form) {
        return form && form.controls['name'] &&
            form.controls['name'].value; // Dr. IQ
    };
    HeroComponent = __decorate([
        core_1.Component({
            selector: 'app-hero',
            templateUrl: './hero.component.html',
            styleUrls: ['./hero.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], HeroComponent);
    return HeroComponent;
}());
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map