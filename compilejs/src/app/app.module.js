"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var forms_1 = require("@angular/forms");
var angular2_image_upload_1 = require("angular2-image-upload");
var common_1 = require("@angular/common");
//Import All the compenents
var app_component_1 = require("./app.component");
var registration_component_1 = require("./registration/registration.component");
var navbar_component_1 = require("./navbar/navbar.component");
var about_component_1 = require("./about/about.component");
var alertcomponent_component_1 = require("./alertcomponent/alertcomponent.component");
var login_component_1 = require("./login/login.component");
var home_component_1 = require("./home/home.component");
var admin_component_1 = require("./admin/admin.component");
var profile_component_1 = require("./profile/profile.component");
var BookCategoryPipe_1 = require("./_filter/BookCategoryPipe");
var BookSearchPipe_1 = require("./_filter/BookSearchPipe");
//Import All the Services
var AuthenticationService_1 = require("./_services/AuthenticationService");
var alertservice_1 = require("./_services/alertservice");
var BookService_1 = require("./_services/BookService");
var bookissued_component_1 = require("./bookissued/bookissued.component");
var adminview_component_1 = require("./adminview/adminview.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                registration_component_1.RegistrationComponent,
                navbar_component_1.NavbarComponent,
                about_component_1.AboutComponent,
                alertcomponent_component_1.AlertComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                admin_component_1.AdminComponent,
                BookCategoryPipe_1.BookCategoryPipe,
                profile_component_1.ProfileComponent,
                bookissued_component_1.BookissuedComponent,
                adminview_component_1.AdminviewComponent,
                BookSearchPipe_1.BookSearchPipe
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_1.routingModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                angular2_image_upload_1.ImageUploadModule.forRoot(),
                common_1.CommonModule
            ],
            providers: [alertservice_1.AlertService, AuthenticationService_1.AuthenticationService, BookService_1.BookService, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map