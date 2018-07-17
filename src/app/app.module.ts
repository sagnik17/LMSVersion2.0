import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routingModule  } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { ImageUploadModule } from "angular2-image-upload";
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';  

//Import All the compenents
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './alertcomponent/alertcomponent.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { BookCategoryPipe  } from './_filter/BookCategoryPipe';
import { BookSearchPipe } from './_filter/BookSearchPipe';

//Import All the Services
import { AuthenticationService } from './_services/AuthenticationService';
import { AlertService } from './_services/alertservice';
import { BookService } from './_services/BookService';
import { BookissuedComponent } from './bookissued/bookissued.component';
import { AdminviewComponent } from './adminview/adminview.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    AboutComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    BookCategoryPipe,
    ProfileComponent,
    BookissuedComponent,
    AdminviewComponent,
    BookSearchPipe
  ],
  imports: [
    BrowserModule,
    routingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    ImageUploadModule.forRoot(),
    CommonModule
  ],
  providers: [AlertService,AuthenticationService,BookService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
