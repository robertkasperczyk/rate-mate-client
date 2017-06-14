import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Product} from "./products/product";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ProductsService {
  private selectedProduct = new Product();

  constructor() {
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

  setSelectedProduct(product: Product) {
    console.log(product);
    this.selectedProduct = product;
  }
}
