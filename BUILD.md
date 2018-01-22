ng generate component users
ng generate service user --module=app

Bring the users component into scope
*app.component.html*
```js
<app-users></app-users>
```

Build the user schema (reference the user schema in mean.example.com)
*user.ts*
```js
export class User {
  email: string,
  username: string,
  first_name:  string,
  last_name:  string,
  hash: string,
  salt: string,
  admin: boolean,
  githubData: object,
}
```

We already know we are making API calls so call the HttpClientModule and make set up observable.
*app.module.ts*
```js
import { HttpClientModule } from '@angular/common/http';
...
imports: [
  BrowserModule,
  HttpClientModule
],
...
```

*user.service.ts*
```js
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../user';
import { UserService } from '../user.service';

@Injectable()
export class UserService {

  //Set up the URL
  private url: string = 'http://localhost:3000/api/users';

  //Call the HttpClient in the Constructor
  constructor(private http: HttpClient) { }

  //Set up a simple observable.
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

}
```

*users.component.ts*
```js
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users,
        console.log(this.users)
      }
    );
  }

}
```

At this point you will see a crosssite origin (CORS) error resolve this on the server (localhost:3000).
