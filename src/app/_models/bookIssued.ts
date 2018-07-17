export class BookIssued {
    
        constructor(
           public id: string,
           public bookid: string,
           public userid: string,
           public DateOfIssue: number,
           public DateOfReturn: number,
           public isReturn: boolean,
           public isIssue: boolean,
        ){}
        
    }