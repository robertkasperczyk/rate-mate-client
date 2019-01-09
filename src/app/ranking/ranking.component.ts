import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../service/products.service';
import {Product} from '../products/product';

@Component({
  selector: 'ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  products: Array<Product>;

  constructor(private productService: ProductsService) {
  }

  ngOnInit() {
    this.productService.getRanking()
      .subscribe(data => {
          this.products = data;
          this.products.forEach(a => a.imagePath = 'http://localhost:3000/product/' + a.id + '/image');
        },
        err => console.log(err),
        () => console.log('success'));
  }

}
