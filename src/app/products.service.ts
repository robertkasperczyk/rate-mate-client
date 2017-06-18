import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ProductsService {
  private products$;

  constructor(private http: Http) {
    this.products$ = http.get('http://localhost:3000/products/page/')
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
    return this.http.get('http://localhost:3000/product/' + index);
  }

  getProductComments(productID: string) {
    return this.http.get('http://localhost:3000/product/' + productID + '/comments')
      .map(data => data.json());
  }

  getProducts(pageNumber: number) {
    console.log("getProducts");
    return this.http.get('http://localhost:3000/products/page/' + pageNumber)
      .map(res => res.json());
  }
}
