import { Injectable } from '@angular/core';
import {Item} from './interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private items: Item[] = [];
  floorsAndSections = [
    {floor: 'Floor 1', section: 'Section 1'},
    {floor: 'Floor 2', section: 'Section 2'},
    {floor: 'Floor 3', section: 'Section 3'},
  ];
  private codeSource = new BehaviorSubject(null);
  code = this.codeSource.asObservable();

  constructor() { }

  addItems(code, quantity, floor, section) {
    const obj = {
      code,
      quantity,
      floor,
      section
    };
    this.items.push(obj);
  }

  getItems() {
    return this.items;
  }

  updatedDataSelection(code: string) {
    this.codeSource.next(code);
  }

  updateItems(index, object) {
    this.items[index] = object;
  }

  getFloors() {
    return this.floorsAndSections;
  }

}


