import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Product} from "./product";
import {Router} from "@angular/router"
import {ProductsService} from "../products.service";
import {isUndefined} from "util";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;
  scrollingIndex: number;
  endOfData: boolean;

  constructor(private http: Http, private router: Router, private productService: ProductsService) {
  }

  ngOnInit() {
    this.scrollingIndex = 2;
    this.endOfData = false;
    this.productService.getProducts(1)
      .subscribe(data => {
          this.products = data;
          this.products.forEach(a => a.imagePath = "http://localhost:3000/product/" + a._id + "/" + a.imagePath)
        },
        err => console.log(err),
        () => console.log('success'));
  }

  onProductClicked(index) {
    this.router.navigate(["/product", this.products[index]._id]);
  }

  onScroll() {
    if (!this.endOfData) {
      this.productService.getProducts(this.scrollingIndex)
        .subscribe(data => {
            this.scrollingIndex += 1;


            this.endOfData = data.length == 0;

            if (!this.endOfData && data[1]._id != this.products[this.products.length - 1]._id) {
              data.forEach(a => a.imagePath = "http://localhost:3000/product/" + a._id + "/" + a.imagePath);
              this.products = this.products.concat(data);
            }
          },
          err => console.log(err));
    }
  }
}
