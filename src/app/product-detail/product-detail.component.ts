import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../products/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  private id: string;
  private sub: any;

  constructor(private productService: ProductsService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.productService.getProduct(this.id)
      .subscribe(data => {
          this.product = data.json();
        },
        err => console.log(err),
        () => console.log('success'));

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
