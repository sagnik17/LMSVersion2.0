import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { NgControlStatus } from '@angular/forms';
import { AlertService } from '../_services/alertservice';
import { AuthenticationService  } from '../_services/AuthenticationService';
import { Observable } from 'rxjs/Rx'; 

import { User } from '../_models/Users';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  _dataobj : User;
  loading = false;
  duplicateUsername = true;
  
  model = new User(this.createUUID(),'','','','','');


  
  constructor(private fb: FormBuilder,private _alertService : AlertService, 
              private _authenticationService : AuthenticationService,
              private router: Router) 
              {
                this._authenticationService.isAuthenticated('register');
              }

  //Method to Register the User
  RegistrationProcess(model:any)
  {
    this.loading = true;
    //console.log(JSON.stringify(this._dataobj));
    this._alertService.clear();

    this._authenticationService.registerUser(this._dataobj).then(user => 
    {
      this._alertService.success('Registration Sucessfull',true); 
      this.router.navigate(['/login']);
      this.loading = false; 
    }, 
    error =>  this._alertService.error(error));
  }

  //Method to check Duplicate Username
  checkDuplicate(forms:any)
  {
      this._dataobj = forms.value;
      this._authenticationService.checkDuplicateUsername(this._dataobj).subscribe(user => {
      this._alertService.clear();
        
      if(user.length == 0)
      {
        this.RegistrationProcess(this._dataobj);
      }
      else
      {
        this._alertService.warn("Username already Exist. Please try a different One !!!");
        this.loading = false;
      }
    },
    error =>  this._alertService.error(error));
  }

  //Method to create unique id for each user
  createUUID()
  {
    let uuid = UUID.UUID();
    return uuid;
  }
  
  ngOnInit() {
  }

}
