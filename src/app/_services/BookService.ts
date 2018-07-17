import { Injectable } from '@angular/core';  
import { Http, Headers, RequestOptions, Response } from '@angular/http';  
import { User } from '../_models/Users';
import { Observable, Subject } from 'rxjs/Rx';  
import { Router } from '@angular/router';
import 'rxjs/Rx'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { BookIssued } from '../_models/bookIssued';
import { Book } from '../_models/books';

@Injectable()
export class BookService
{
    headers: Headers;
    options: RequestOptions;
    private url = 'http://localhost:3000/books/';
    private bookissueurl = 'http://localhost:3000/booksIssued/';

    constructor(private _http: Http, private router : Router) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
     }
     
     getAllBooks()
     {
        return this._http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
     }

     // extract the response data to json
    private extractData(res: Response) 
    {
        //console.log(res.json());
        return res.json() || [];
    }

    issueBook(bookissue : BookIssued)
    {
        return this._http.post(this.bookissueurl, bookissue, this.options).toPromise().then(this.extractData).catch(this.handleError);
    }

    getBooksIssues(userid : string)
    {
        const newurl = this.bookissueurl + '?userid=' + userid;
        return this._http.get(newurl, this.options).map(this.extractData).catch(this.handleError);
    }

    getAllBooksIssues()
    {
        return this._http.get(this.bookissueurl, this.options).map(this.extractData).catch(this.handleError);
    }


    returnBook(bookissueid : string)
    {
        const url = this.bookissueurl + bookissueid;
        return this._http.delete(url, this.options).toPromise().then(this.extractData).catch(this.handleError);
    }

    updateBook(book: Book)
    {
        const newurl = this.url + book.id;
        return this._http.put(newurl, book, this.options).toPromise().then(this.extractData).catch(this.handleError);
    }

    AddBook(book : Book)
    {
        book.NumberOfCopies = book.TotalCopies;
        book.imageurl = "../../assets/bookcover.jpg";
        return this._http.post(this.url, book, this.options).toPromise().then(this.extractData).catch(this.handleError);
    }

    deleteBook(book: Book)
    {
        const newurl = this.url + book.id;
        return this._http.delete(newurl, this.options).toPromise().then(this.extractData).catch(this.handleError);
    }

    // error handling
    private handleError (error: Response | any) 
    {
        return Observable.throw(error.message || error);
    }
}

