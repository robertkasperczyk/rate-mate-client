import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../products/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(private productService: ProductsService) {
    this.product = new Product();
  }

  ngOnInit() {
    this.product = this.productService.getSelectedProduct();
  }

}
