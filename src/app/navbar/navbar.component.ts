import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';
import { Router } from '@angular/router';
import { User } from '../_models/Users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  public showNav : any;
  public showAdminNav : any;

  constructor(private _authenticationService : AuthenticationService, private router : Router) { 
    this.isAuthenticated();
  }

  ngOnInit() {
    this._authenticationService.getAll();
  }

  isAuthenticated() 
  {
      //console.log(localStorage.getItem('loggedinUser'));
      if(localStorage.getItem('loggedinUser') == null)
      {
        this.showNav = false;
        this.showAdminNav = false;
      }
      else
      {
        this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
        if(this.currentUser[0]["username"] == "admin123" && this.currentUser[0]["password"] == "admin123")
        {
            this.showAdminNav = true;
            this.router.navigate(['admin']);
        }
        else
        {
            this.showNav = true;
            this.router.navigate(['home']);
        }
      }
  }

  logout()
  {
     var value = this._authenticationService.logout();
    //  if(value ==  true)
    //   this.router.navigate(['login']);
  }





}
