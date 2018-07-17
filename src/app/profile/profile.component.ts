import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService  } from '../_services/AuthenticationService';
import { AlertService } from '../_services/alertservice';
import { User } from '../_models/Users';

import { Http, RequestOptions, Headers, Response } from '@angular/http';  
import { Observable } from 'rxjs/Rx'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  currentUser: User;
  _dataobj : User;
  model = new User('','','','','','');

  constructor(private _authenticationService : AuthenticationService,private _alertService : AlertService,
    private router: Router,private http: Http) { this._authenticationService.isAuthenticated('profile'); 
  }

  //Method to get the Logged in User Profile
  getProfile()
  {
    this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
    this._authenticationService.getProfile(this.currentUser).subscribe(user=>
      {
        this.currentUser = user;
      }, error=> this._alertService.error(error));
  }

  //Method to update the User Data
  editProfile(forms:any)
  {
    this._alertService.clear(); 
    this._dataobj = forms.value;
    this._authenticationService.updateProfile(this._dataobj).then(user => 
      {
        this.ngOnInit();
        this._alertService.success('Profile Updated Sucessfully'); 
        this.router.navigate(['/profile']);
      }, 
      error =>  this._alertService.error(error));
  }

  //Method to show the User data in Modal
  viewProfile()
  {
    this.model = new User(this.currentUser[0]["id"],this.currentUser[0]["username"],this.currentUser[0]["password"],this.currentUser[0]["firstName"],this.currentUser[0]["lastName"],this.currentUser[0]["email"]);
  }

    
  ngOnInit() {
    this.getProfile();
  }
  

      
}
