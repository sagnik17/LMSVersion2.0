import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Book } from '../_models/books';

@Pipe({
    name: 'bookCategoryFilter',
    pure: false
})

@Injectable()
export class BookCategoryPipe implements PipeTransform {
    transform(items: any, category: string): any {

        if (category === undefined) {
            return items;
        }
        else if (category === 'All') {
            return items;
        }
        else
        {
            return items.filter(function(item){
                return item.category.toLowerCase().includes(category.toLowerCase());
            }); //item => item.category === category);
        }
        
    }
}
