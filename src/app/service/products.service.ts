import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Product} from '../products/product';

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
    console.log('getProduct');
    return this.http.get('http://localhost:3000/product/' + index);
  }

  deleteProduct(index: string) {
    return this.http.delete('http://localhost:3000/product/' + index + '/delete');
  }

  getProductComments(productID: string) {
    return this.http.get('http://localhost:3000/product/' + productID + '/comments')
      .map(data => data.json());
  }

  getProducts(pageNumber: number) {
    console.log('getProducts');
    return this.http.get('http://localhost:3000/products/list', {params: {page: pageNumber, onPage: 5}}).map(res => res.json());
  }

  getRanking() {
    return this.http.get('http://localhost:3000/products/ranking').map(res => res.json());
  }

  addComment(product: Product, content: string, dust: number, power: number, taste: number) {
    return this.http.post('http://localhost:3000/product/' + product.id + '/comment/add',
      {content: content, dustRating: dust, tasteRating: taste, powerRating: power});
  }

}
