import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//importing all the components
import { RegistrationComponent } from './registration/registration.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { BookissuedComponent } from './bookissued/bookissued.component';
import { AdminviewComponent } from './adminview/adminview.component';



//Routing Configuration

export const appRoutes: Routes =
[
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'bookissuesd', component: BookissuedComponent},
    { path: 'adminview', component: AdminviewComponent},
    { path: '**', redirectTo: '/login' }
];


export const routingModule : ModuleWithProviders = RouterModule.forRoot(appRoutes);
