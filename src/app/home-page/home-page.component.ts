import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  products = [];
  codeError: boolean;
  private subscription: Subscription;
  productIndex: number;
  productUpdate = false;
  floorsSections = [];
  private readonly notifier: NotifierService;
  code: string;

  constructor(private productService: ProductService, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  getIndex(code) {
    this.productIndex = this.products.findIndex(item => item.code === code);
  }

  fillForm() {
    this.form.setValue({
      code: this.products[this.productIndex].code,
      quantity: this.products[this.productIndex].quantity,
      floor: this.products[this.productIndex].floor,
      section: this.products[this.productIndex].section
    });
  }

  ngOnInit() {
    this.form = new FormGroup( {
      code: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.minLength(1)]),
      floor: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
    });
    this.products = this.productService.getItems();
    this.floorsSections = this.productService.getFloors();
    this.subscription = this.productService.code.subscribe(code => {
      this.code = code;
      if (code) {
        this.productUpdate = true;
        this.getIndex(code);
        this.fillForm();
        this.form.get('code').disable();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.productService.updatedDataSelection(null);
  }

  onSubmit() {
    const object = {
      code: this.code,
      quantity: this.form.value.quantity,
      floor: this.form.value.floor,
      section: this.form.value.section
    };
    if (this.productUpdate) {
      this.productService.updateItems(this.productIndex, object);
      this.notifier.notify('info', 'Product Updated');
      } else {
      const isNotUnique = this.products.find(product => product.code === this.form.value.code);
      if (isNotUnique) {
        this.codeError = true;
        return;
      }
      this.productService.addItems(this.form.value.code, this.form.value.quantity, this.form.value.floor, this.form.value.section);
      this.notifier.notify('success', 'Product Created');
      }
    this.form.reset();
    }
}

