import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Product} from "./product";
import {Router} from "@angular/router"
import {ProductsService} from "../products.service";
import {Comment} from "./comment";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;
  comments: Array<Comment>;
  scrollingIndex: number;
  endOfData: boolean;
  boolVariables: Array<boolean>;
  lastActive:number;

  constructor(private http: Http, private router: Router, private productService: ProductsService) {
  }

  ngOnInit() {
    this.scrollingIndex = 2;
    this.endOfData = false;
    this.boolVariables = new Array();
    this.lastActive = -1;
    this.boolVariables.forEach(element => element = false);
    this.productService.getProducts(1)
      .subscribe(data => {
          this.products = data;
          this.products.forEach(a => a.imagePath = "http://localhost:3000/product/" + a._id + "/" + a.imagePath)
        },
        err => console.log(err),
        () => console.log('success'));
  }

  onProductClicked(index) {
    console.log('x');
    if (this.lastActive !== index) {
      this.boolVariables[index] = !this.boolVariables[index];
      this.productService.getProductComments(this.products[index]._id)
        .subscribe(data => {
            this.comments = data;
          },
          err => console.log(err),
          () => console.log('success'));
    }
    else {
      this.comments = new Array();
    }
    this.boolVariables[this.lastActive] = !this.boolVariables[this.lastActive];
    this.lastActive = index;
  }

  onScroll() {
    if (!this.endOfData) {
      this.productService.getProducts(this.scrollingIndex)
        .subscribe(data => {
            this.scrollingIndex += 1;


            this.endOfData = data.length == 0;

            if (!this.endOfData && data[0]._id != this.products[this.products.length - 2]._id) {
              data.forEach(a => a.imagePath = "http://localhost:3000/product/" + a._id + "/" + a.imagePath);
              this.products = this.products.concat(data);
            }
          },
          err => console.log(err));
    }
  }
}
