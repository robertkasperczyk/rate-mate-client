import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ProductsComponent} from './products/products.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductsService} from './service/products.service';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import {FileSelectDirective} from 'ng2-file-upload';
import {RankingComponent} from './ranking/ranking.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {SearchService} from './service/search.service';
import {UsersComponent} from './users/users.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'users', component: UsersComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ProductsComponent,
    HomeComponent,
    AddProductComponent,
    FileSelectDirective,
    RankingComponent,
    SearchResultsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    InfiniteScrollModule,
  ],
  providers: [ProductsService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
