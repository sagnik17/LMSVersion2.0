import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Book } from '../_models/books';

@Pipe({
    name: 'bookSearchFilter',
    pure: false
})

@Injectable()
export class BookSearchPipe implements PipeTransform {
    transform(items: any, category: string): any {

        if (category === undefined) {
            return items;
        }
        else
        {
            return items.filter(function(item){
                return item.Bookname.toLowerCase().includes(category.toLowerCase());
            }); 
        }
        
    }
}
