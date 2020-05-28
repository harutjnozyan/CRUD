import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
  export class SearchPipe implements PipeTransform {

  transform(currentArray: any[], searchText: string): any[] {
    if (!currentArray) {
      return [];
    }
    if (!searchText) {
      return currentArray;
    }
    searchText = searchText.toLowerCase();

    return currentArray.filter(item => {
      return item.code.toLowerCase().includes(searchText);
    });
  }
}
