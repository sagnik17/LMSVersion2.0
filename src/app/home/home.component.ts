import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService  } from '../_services/AuthenticationService';
import { BookService } from '../_services/BookService';
import { AlertService } from '../_services/alertservice';
import { BookCategoryPipe  } from '../_filter/BookCategoryPipe';
import { UUID } from 'angular2-uuid';

import { Book } from '../_models/books';
import { BookIssued } from '../_models/bookIssued';
import { User } from '../_models/Users';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  date : Date;
  currentUser: User;
  bookissued : BookIssued = new BookIssued('','','',0,0,false,false);
  bookList: Array<any> = [];
  bookIssuedList : Array<any> = [];
  templist : any;
  localBookList: any;
  isReturn = true;
  dispalybook : Book = new Book('','','','',0,0,'','','');
  categories = ['All','Nonfiction', 'Technology','Economics','Politics'];
  flag = true;

  constructor(private _authenticationService : AuthenticationService,private _alertService : AlertService,
              private router: Router, private _bookservice : BookService) {
    this._authenticationService.isAuthenticated('home');
   }

   //Method to show all the books
   getAllBooks()
   {
      this.resetData();
      this._bookservice.getAllBooks().subscribe(
      res => {
        this.localBookList = res;
        this.localBookList.forEach(x => { 
        x = Object.assign({}, x);
        this.bookList.push(x);
      });
      if(this.bookIssuedList.length > 0)
        this.joinArray();
    },
      error =>  this._alertService.error(error));
   }

   //Method to show all books which can be issued
   showAllBooks()
   {
      this.resetData();
      this.templist.forEach(element=>{
        element = Object.assign({}, element);
        if(element.isReturn === true)
        { }
        else
          this.bookList.push(element);
      });
   }
   
   //Method to join the data of table i.e. books and booksissued
   joinArray()
   {
      this.templist = this.bookList.map(val=>{
        return Object.assign({},val,this.bookIssuedList.filter(v=> v.bookid === val.id)[0]);
      });
      this.showAllBooks();
      //console.log(this.templist);
   }

   //Method to issue the book
   IssueBook(book)
   {
    
     if(this.bookIssuedList.length < 5)
     {
       this.date =  new Date();
        this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
        this.bookissued.bookid = book.id;
        this.bookissued.userid = this.currentUser[0]["id"];
        this.bookissued.id = UUID.UUID();
        this.bookissued.DateOfIssue = Date.now();
        this.bookissued.DateOfReturn = this.date.setDate( this.date.getDate() + 10 );
        this.bookissued.isReturn = true;
        this.bookissued.isIssue = false;

        this._bookservice.issueBook(this.bookissued).then(bookisse =>
        {
          this._alertService.clear();
          this.updateBookDetails(book);
          this._alertService.success('Book Issued Successfully');
          this.ngOnInit();
        }, error =>  this._alertService.error(error));
     }
     else
     {
      this._alertService.clear();
       this._alertService.warn("Book Issue Limit Exceeded !!!");
     }
      
   }

   //Method to show the book details in Modal
   viewBook(book)
   {
      this.dispalybook = book;
   }

   updateBookDetails(book)
   {
      book.NumberOfCopies = book.NumberOfCopies - 1;
      this._alertService.clear(); 
      this._bookservice.updateBook(book).then(res => 
        {
          // this.ngOnInit();
          // this._alertService.success('Profile Updated Sucessfully'); 
          // this.router.navigate(['/profile']);
        }, 
        error =>  this._alertService.error(error));
   }

   //Method to get the books list issues by the logged in User
   getBookIssued()
   {
      this.currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
      this._bookservice.getBooksIssues(this.currentUser[0]["id"]).subscribe(
        list=>{
          this.localBookList = list;
          this.localBookList.forEach(element=>
          {
            element = Object.assign({}, element);
            this.bookIssuedList.push(element);
          });
        }, error=> this._alertService.error(error));
   }
   
  ngOnInit() 
  {
    if(this.flag === true)
    {
      this.getBookIssued();
      this.getAllBooks();
    }
    if(this.bookIssuedList.length > 0 && this.flag === false)
    {
      this.resetData();
      this.showAllBooks();
    }
     
  }

  resetData()
  {
    this.bookList = [];
  }


}
