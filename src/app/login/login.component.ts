import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx'; 

import { AlertService } from '../_services/alertservice';
import { AuthenticationService } from '../_services/AuthenticationService';
import { User } from '../_models/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new User('','','','','','');
  _dataobj : User;
  loading = false;
  public showNav : any;
  currentUser: any;

  constructor(private fb: FormBuilder,private _alertService : AlertService, 
    private _authenticationService : AuthenticationService,
    private router: Router) {
      this._authenticationService.isAuthenticated('login');
     }

  ngOnInit() {
    this._authenticationService.logout();
    
  }


  //Method to check User Ceredentials and Redirect to Home Page
  login(forms:any)
  {
        this.loading =  true;
        this._dataobj = forms.value;
        console.log(JSON.stringify(this._dataobj));
        this._authenticationService.loginUser(this._dataobj).subscribe(user => {
        this._alertService.clear();
          if(user.length != 0)
          {
            //this._alertService.success('Login !!!'); 
            localStorage.setItem("loggedinUser", JSON.stringify(user));
            // console.log("This is from loaclstorage" + localStorage.getItem("loggedinUser"));
            this.refresh();
          }
          else
          {
            this._alertService.error('Incorrect Username or Password !!!');
            this.loading =  false;
          }
          
      },
      error =>  this._alertService.error(error));
  }

  //Method to refresh the page
  refresh(): void {
    window.location.reload();
}

}
