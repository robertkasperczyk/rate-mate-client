import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Product} from "./product";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;

  constructor(private http: Http) {
    http.get('http://localhost:3000/products')
      .map(res => res.json())
      .subscribe(data => {
          this.products = data;
          this.products.forEach(a => a.imagePath = "http://localhost:3000/product/" + a._id + "/" + a.imagePath)
        },
        err => console.log(err),
        () => console.log('success'));
  }

  ngOnInit() {
  }

}
