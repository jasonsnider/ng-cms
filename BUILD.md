# Build a CMS

In Angular build a basic CRUD application for managing users via the users API provided by the *mean.example.com* project. Name this project *ng-cms*.

Before just diving into code stop and think about what you already know about the application you are about to build, this will help you find a starting point.

## What do I know?

* I know I'm working with an API.
  * This tells me I will need to work with the HttpClient and with HttpHeaders
* I know I'm working with *http://localhost:3000/api/users*
  * This tells me I will need to define this URL someplace.
* I know I'm working with data
  * This tells me I will need a model (a service and a schema)
  * This tells me I will probably be working observables or promises
* I know the data I'm working with involves users (as the API is users)
  * This tells me I should create
    * a users component
    * a user schema
    * a user service

Create the project
```sh
ng new ng-cms
```

Create the users component
```sh
ng generate component users
```

Create the user service
```sh
ng generate service user --module=app
```

Bring the users component into scope
*app.component.html*
```js
<app-users></app-users>
```
At this point navigating to [https://localhost:4200](https://localhost:4200) should resolve a page stating "users works!".

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

@Injectable()
export class UserService {

  //Set up the URL
  private url: string = 'http://localhost:3000/api/users';

  //Call the HttpClient in the Constructor
  constructor(private http: HttpClient) { }

  //Set up a simple observable.
  getUsers(): Observable<User> {
    return this.http.get<User>(this.url);
  }

}
```

*users/users.component.ts*
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

  users: User;

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users
      }
    );
  }
}
```

Now update the view to reveal the list of users
*users/users.component.html*
```html
<ul *ngIf="users">
  <li *ngFor="let user of users.users">
    <a>{{user.username}}</a>
  </li>
</ul>
```

Generate a routing file

```sh
ng generate module app-routing --flat --module=app
```

Replace the routing file with the following.

*app-routing.module.ts*
```js
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent }   from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

Replace the app-users selector with router-outlet

```html
<router-outlet></router-outlet>
```

Users gives us a component for dealing with a list of users, now we want to deal with a single user. Add a user-view component.
```sh
ng generate component user-view
```

Add the user-view component to the routing module.
```js
...
import { UserViewComponent }   from './user-view/user-view.component';
...
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/view', component: UserViewComponent }
];
...
```
Navigate to [http://localhost:4200/users/view](http://localhost:4200/users/view)

Add a getUser() method to the user service.
*user.service.ts*
```js
getUser(id: string): Observable<User> {
  return this.http.get<User>(this.url + `/view/${id}`);
}
```
