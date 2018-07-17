"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
//importing all the components
var registration_component_1 = require("./registration/registration.component");
var about_component_1 = require("./about/about.component");
var login_component_1 = require("./login/login.component");
var home_component_1 = require("./home/home.component");
var admin_component_1 = require("./admin/admin.component");
var profile_component_1 = require("./profile/profile.component");
var bookissued_component_1 = require("./bookissued/bookissued.component");
var adminview_component_1 = require("./adminview/adminview.component");
//Routing Configuration
exports.appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'register', component: registration_component_1.RegistrationComponent },
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'bookissuesd', component: bookissued_component_1.BookissuedComponent },
    { path: 'adminview', component: adminview_component_1.AdminviewComponent },
    { path: '**', redirectTo: '/login' }
];
exports.routingModule = router_1.RouterModule.forRoot(exports.appRoutes);
//# sourceMappingURL=app.routing.js.map