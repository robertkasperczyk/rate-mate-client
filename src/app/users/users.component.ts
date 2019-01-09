import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {User} from './user';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent{

  users: Array<User>;

  constructor(private http: Http) {
    http.get('http://localhost:3000/users/list').subscribe(data => {
      this.users = data.json();
    });
  }
}
