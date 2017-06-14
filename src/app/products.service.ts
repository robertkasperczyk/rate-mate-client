import {Injectable} from '@angular/core';
import {Product} from "./products/product";
import {Http} from "@angular/http";

@Injectable()
export class ProductsService {
  private products$;

  constructor(private http: Http) {
    this.products$ = http.get('http://localhost:3000/products')
      .map(res => res.json());
      // .subscribe(data => {
      //     this.products = data;
      //     this.products.forEach(a => a.imagePath = "http://localhost:3000/product/" + a._id + "/" + a.imagePath)
      //   },
      //   err => console.log(err),
      //   () => console.log('success'));
  }

  getProduct(index: string) {
    console.log("getProduct");
    return this.products$.map(products => products.filter(a => a._id == index)[0]);
  }

  getProducts() {
    console.log("getProducts");
    return this.products$;
  }
}
