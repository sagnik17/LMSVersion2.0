import { Injectable } from '@angular/core';  
import { Http, Headers, RequestOptions, Response } from '@angular/http';  
import { User } from '../_models/Users';
import { Observable, Subject } from 'rxjs/Rx';  
import { Router } from '@angular/router';
import 'rxjs/Rx'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  

@Injectable()
export class AuthenticationService
{
    public showNav : any;
    public showAdminNav : any;
    currentUser : any;
    headers: Headers;
    options: RequestOptions;
    private url = 'http://localhost:3000/users/';

    constructor(private _http: Http, private router : Router) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
     }  


    //Service Method To Register the User
    registerUser(model : User)
    {
        return this._http.post(this.url, model, this.options).toPromise().then(this.extractData).catch(this.handleError);
    }

    //Service Method To Log the User in their account
    loginUser(model : User)
    {
        const newurl = this.url + '?username=' + model.username + '&&password=' + model.password;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    }

    //Service Method To Log the User in their account
    getProfile(model : User)
    {
        const newurl = this.url + '?id=' + model[0]["id"];
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    }

     //Service Method To check for duplicate username during registration
    checkDuplicateUsername(model : User)
    {
        const newurl = this.url + '?username=' + model.username;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    }

     //Service Method To logout the User
    logout() {
        localStorage.removeItem("loggedinUser");
        return true;
      }

    //Service Method To get the list of all the User
    getAll() {
        return this._http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    }

    //Service Method To check if the user authenticated to login
    isAuthenticated(pagename:string) 
    {
        //console.log(localStorage.getItem('loggedinUser'));
        if(localStorage.getItem('loggedinUser') == null)
        {
          this.showNav = false;
          this.showAdminNav = false;
          this.router.navigate([pagename]);
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
                this.router.navigate([pagename]);
            }
        }
    }
  
     
    updateProfile(model : User)
    {
        const newurl = this.url + model.id;
        return this._http.put(newurl, model, this.options).toPromise().then(this.extractData).catch(this.handleError);
    }
    
    // extract the response data to json
    private extractData(res: Response) 
    {
    //console.log(res.json());
        return res.json() || [];
    }


    // error handling
    private handleError (error: Response | any) 
    {
        return Observable.throw(error.message || error);
    }
}