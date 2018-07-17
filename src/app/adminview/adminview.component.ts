import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService  } from '../_services/AuthenticationService';
import { BookService } from '../_services/BookService';
import { AlertService } from '../_services/alertservice';
import { BookCategoryPipe  } from '../_filter/BookCategoryPipe';
import { BookSearchPipe } from '../_filter/BookSearchPipe';

import { Book } from '../_models/books';
import { BookIssued } from '../_models/bookIssued';
import { User } from '../_models/Users';
import { element } from 'protractor';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AdminviewComponent implements OnInit {

  bookissued : BookIssued = new BookIssued('','','',0,0,false,false);
  bookList: Array<any> = [];
  bookIssuedList : Array<any> = [];
  templist : Array<any> = [];
  finalList : Array<any> = [];
  userList : Array<any> = [];
  usertempList : Array<any> = [];
  localBookList: any;

  constructor(private _authenticationService : AuthenticationService,private _alertService : AlertService,
    private router: Router, private _bookservice : BookService) { 
    }

  getAllBookIssued()
  {
     this._bookservice.getAllBooksIssues().subscribe(
       list=>{
         this.localBookList = list;
         this.localBookList.forEach(element=>
         {
           element = Object.assign({}, element);
           this.bookIssuedList.push(element);
         });
       }, error=> this._alertService.error(error));
  }

  getAllUser()
  {
    this._authenticationService.getAll().subscribe(
      res => {
         this.localBookList = res;
         this.localBookList.forEach(x => { 
         x = Object.assign({}, x);
         this.userList.push(x);
    });
  },
    error =>  this._alertService.error(error));
}


  getAllBooks()
  {
     this._bookservice.getAllBooks().subscribe(
       res => {
          this.localBookList = res;
          this.localBookList.forEach(x => { 
          x = Object.assign({}, x);
          this.bookList.push(x);
     });
     if(this.bookIssuedList.length > 0 && this.userList.length > 0)
        this.joinArray();
   },
     error =>  this._alertService.error(error));
  }


  joinArray()
  {
      this.templist = this.userList.map(val=>{
       return Object.assign({},val,this.bookIssuedList.filter(v=> v.userid === val.id)[0]);
     });

     this.usertempList = this.bookList.map(val=>{
      return Object.assign({},val,this.templist.filter(v=> v.bookid === val.id)[0]);
    });
     this.usertempList.forEach(element=>{
      element = Object.assign({}, element);
      if(element.isReturn === true)
      { 
        this.finalList.push(element);
      }
        
    });
  }

  ngOnInit() {
    this.getAllBookIssued();
    this.getAllUser();
    this.getAllBooks();
    this.joinArray();
    
  }

}
