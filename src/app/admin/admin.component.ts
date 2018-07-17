import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AlertService } from '../_services/alertservice';
import { UUID } from 'angular2-uuid';
import { AuthenticationService } from '../_services/AuthenticationService';
import { Router } from '@angular/router';
import { BookService } from '../_services/BookService';
import { User } from '../_models/Users';
import { Book } from '../_models/books';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  localBookList: any;
  bookList: Array<any> = [];
  dispalybook : Book = new Book('','','','',0,0,'','','');
  model = new Book('','','','',0,0,'','','');
  addbookmodel = new Book(this.createUUID(),'','','',0,0,'','','');
  _dataobj : Book;
  categories = ['All','Nonfiction', 'Technology','Economics','Politics'];
  addcategories = ['Nonfiction', 'Technology','Economics','Politics'];

  constructor(private _alertService : AlertService, 
    private _authenticationService : AuthenticationService, private router: Router, private _bookservice : BookService) {
      this._authenticationService.isAuthenticated('login');
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
    },
      error =>  this._alertService.error(error));
   }


  //Method to update the Book Details
  editBook(forms:any)
  {
    this._alertService.clear();
    this._dataobj = forms.value;
    if(this._dataobj.TotalCopies >= this._dataobj.NumberOfCopies)
    {
      this._bookservice.updateBook(this._dataobj).then(user => 
        {
          this.ngOnInit();
          this._alertService.success('Book Details Updated Sucessfully'); 
          //this.router.navigate(['/admin']);
        }, 
        error =>  this._alertService.error(error));
    }
    else
    {
      this._alertService.warn("Update Failed ! Total Copies Cannot be less than Available Copies !!!");
      this.ngOnInit();
    }
    
   
  }

   //Method to show the book details in Modal
   viewBook(book)
   {
      this.dispalybook = book;
   }

   viewBookForEdit(book)
   {
      this.model = book;
   }

   AddBook(forms : any)
   {
     this._dataobj = forms.value;
     this._alertService.clear();

     this._bookservice.AddBook(this._dataobj).then(user => 
      {
        this.ngOnInit();
        this._alertService.success('Book Added Sucessfull',true); 
        this.router.navigate(['/admin']);
      }, 
      error =>  this._alertService.error(error));
   }


   DeleteBook(book : Book)
   {
    this._alertService.clear();
    this._bookservice.deleteBook(book).then(res =>{
      
              this.ngOnInit();
              this._alertService.success("Book Deleted Successfully", true);
              this.router.navigate(['/admin']);
            },
          error => this._alertService.error(error));
   }

   //Method to create unique id for each book
  createUUID()
  {
    let uuid = UUID.UUID();
    return uuid;
  }

  ngOnInit() {
    this.getAllBooks();
  }

  resetAddBookForm()
  {
    this.addbookmodel = new Book(this.createUUID(),'','','',0,0,'','','');
  }
  resetData()
  {
    this.bookList = [];
  }

}
