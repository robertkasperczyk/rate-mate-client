import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from '../service/search.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit() {
  }

  onSearchClicked(searchPhrase: string) {
    if(searchPhrase !== '') {
      this.searchService.setPhrase(searchPhrase);
      this.router.navigate(['/search-results']);
    }
  }
}
