import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Item} from '../interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  items: Item[] = [];
  searchText = '';
  currentArray: Item[];
  sectionsFloors = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.items = this.productService.getItems();
    this.currentArray = this.items;
    this.sectionsFloors = this.productService.getFloors();
  }

  filterFloor(floor: string) {
    this.currentArray = this.items.filter(item => item.floor === floor);
  }

  filterSection(section: string) {
    this.currentArray = this.items.filter(item => item.section === section);
  }

  showAll() {
    this.currentArray = this.items;
  }

  getCode(code) {
    this.productService.updatedDataSelection(code);
    this.router.navigate(['/']);
  }

}
