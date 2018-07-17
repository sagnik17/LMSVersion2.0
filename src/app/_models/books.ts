export class Book {
    
        constructor(
           public id: string,
           public Bookname: string,
           public Author: string,
           public ISBN: string,
           public NumberOfCopies: number,
           public TotalCopies: number,
           public category: string,
           public description: string,
           public imageurl : string
        ){}
        
    }