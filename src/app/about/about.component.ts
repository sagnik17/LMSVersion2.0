import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  constructor(private _authenticationService : AuthenticationService) {
    this._authenticationService.isAuthenticated('about');
   }

  ngOnInit() {
  }

}
