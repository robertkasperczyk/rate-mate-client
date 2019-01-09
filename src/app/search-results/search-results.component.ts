import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../service/search.service';
import {Product} from '../products/product';
import {Subscription} from 'rxjs/Subscription';
import {ProductsService} from '../service/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  private searchService: SearchService;
  private productsService: ProductsService;
  private _subscription: Subscription;
  private router: Router;
  private tastes: Array<number> = new Array<number>();
  private powers: Array<number> = new Array<number>();
  private dusts: Array<number> = new Array<number>();
  private contents: Array<string> = new Array<string>();


  constructor(searchService: SearchService, productsService: ProductsService, router: Router) {
    this.searchService = searchService;
    this.productsService = productsService;
    this.router = router;
    this.searchService.getSearchResults().subscribe(data => {
      console.log(data);
      this.products = data;
      this.products.forEach(a => a.imagePath = 'http://localhost:3000/product/' + a.id + '/image');
    });
  }

  ngOnInit() {
    this._subscription =
      this.searchService.getEmmiter().subscribe(phrase => {
          // console.log(phrase);
          this.searchService.getSearchResults().subscribe(data => {
            console.log(data);
            this.products = data;
            if (this.products.length === 0) {
              this.router.navigate(['']);
            }
            this.products.forEach(a => a.imagePath = 'http://localhost:3000/product/' + a.id + '/image');
          });
        },
        err => console.log(err),
        () => console.log('successs'));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onRemoveProductClicked(index) {
    console.log(index);
    const id = this.products[index].id;
    console.log(this.products);
    this.products.splice(index, 1);
    this.productsService.deleteProduct(id).subscribe();
    if (this.products.length === 0) {
      this.router.navigate(['']);
    }
  }

  onAddCommentClicked(index) {
    this.productsService.addComment(this.products[index], this.contents[index],
      this.dusts[index], this.powers[index], this.tastes[index]).subscribe(() => {
        this.searchService.updateWithPreviousPhrase().subscribe(data => {
          this.products = data;
          this.products.forEach(a => a.imagePath = 'http://localhost:3000/product/' + a.id + '/image');
        });
      }
    );
  }
}
