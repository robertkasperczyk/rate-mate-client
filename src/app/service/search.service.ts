import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchService {
  private phrase: string;
  private prevPhrase: string;
  private http: Http;
  private searchUpdated: Subject<string> = new Subject();

  constructor(http: Http) {
    this.http = http;
  }

  getSearchResults() {
    this.prevPhrase = this.phrase
    this.phrase = '';
    return this.http.get('http://localhost:3000/products/search',
      {params: {phrase: this.prevPhrase}}).map(res => res.json());
  }

  setPhrase(searchPhrase: string) {
    this.prevPhrase = this.phrase
    this.phrase = searchPhrase;
    this.searchUpdated.next(this.phrase);
  }

  getEmmiter() {
    return this.searchUpdated;
  }

  updateWithPreviousPhrase() {
    return this.http.get('http://localhost:3000/products/search',
      {params: {phrase: this.prevPhrase}}).map(res => res.json());
  }
}

