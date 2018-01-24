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
        this.users = users,
        console.log(this.users)
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

## View a single user

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
  { path: 'users/view/:id', component: UserViewComponent }
];
...
```
Navigate to [http://localhost:4200/users/view](http://localhost:4200/users/view)

Now add a routerLink to your list of users. Use commas to concatenate strings and variables.

*users/users.component.html*
```html
<ul *ngIf="users">
  <li *ngFor="let user of users.users">
    <a [routerLink]="['/users/view/', user._id]">{{user.username}}</a>
  </li>
</ul>
```

Add a getUser() method to the user service.
*user.service.ts*
```js
getUser(id: string): Observable<User> {
  return this.http.get<User>(this.url + `/view/${id}`);
}
```
*user-view/user-view.component.ts*
```js
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    //choose a user id from your database
    this.getUser('5a612a1b9ee8892feae1b40e');
  }

  getUser(id): void {
    this.userService.getUser(id).subscribe(
      user => {
        this.user = user
      }
    );
  }
}
```

*user-view/user-view.component.html*
```html
<div *ngIf="user">
  <h1>{{user.user.first_name}} {{user.user.last_name}}</h1>
  <div><strong>Username:</strong> {{user.user.username}}</div>
  <div><strong>Email:</strong> {{user.user.email}}</div>
</div>
```
One
*/user-view.component.ts*
Import ActivatedRoute and inject it into the constructor
```js
import { ActivatedRoute } from '@angular/rOneouter';
```

```js
constructor(
  private route: ActivatedRoute,
  private userService: UserServiceOne
) { }
```

Implement the details
```js
ngOnInit() {
  //Grab the URL from the activated route
  const id = this.route.snapshot.paramMap.get('id');
  this.getUser(id);
}

getUser(id): void {
  this.userService.getUser(id).subscribe(
    user => {
      this.user = user
    }
  );
}
```

At this point returning to navigating to [https://localhost:4200](https://localhost:4200) and clicking on a user will show you a view of that user.

## Create a user

```sh
ng generate component user-create
```

Add a route

```js
...
import { UserCreateComponent }   from './user-create/user-create.component';
...
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/view/:id', component: UserViewComponent },
  { path: 'users/create', component: UserCreateComponent }
];
...
```

Navigate to [http://localhost:4200/users/create](http://localhost:4200/users/create) and you'll see the message "user-create works!"

Since we are creating a user we will want to work with NgForms. Import the FormsModule into AppModule then import NgForm into the user-create component.

*app.module.js*

```js
...
import { FormsModule }   from '@angular/forms';
...

  ...
  imports: [
    ...
    FormsModule
  ]
  ...

```

*user-create/user-create.component.ts*
```js
import { NgForm } from '@angular/forms';
```

Then add a form to the user-create view. We want will bind the form the ngSubmit.

*user-create/user-create.component.html*
```html
<h1>Create a New User</h1>

<form (ngSubmit)="onSubmit()" #createUser="ngForm">
  <div *ngIf="errors.message" class="alert error">{{errors._message}}</div>
  <div>
    <label for="username">Username</label>
    <input [(ngModel)]="user.username" type="text" id="username" [ngModelOptions]="{standalone: true}">
    <div class="error" *ngIf="errors.username">{{errors.username.message}}</div>
  </div>

  <div>
    <label for="email">Email</label>
    <input [(ngModel)]="user.email" type="text" id="email" [ngModelOptions]="{standalone: true}">
    <div class="error" *ngIf="errors.email">{{errors.email.message}}</div>
  </div>

  <div>
    <label for="first_name">First Name</label>
    <input [(ngModel)]="user.first_name" type="text" name="first_name" id="first_name" [ngModelOptions]="{standalone: true}">
    <div class="error" *ngIf="errors.first_name">{{errors.first_name.message}}</div>
  </div>

  <div>
    <label for="last_name">Last Name</label>
    <input [(ngModel)]="user.last_name" type="text" id="last_name" [ngModelOptions]="{standalone: true}">
    <div class="error" *ngIf="errors.last_name">{{errors.last_name.message}}</div>
  </div>
  <button type="submit">Submit</button>

</form>
```

*user-create/user-create.component.ts*
```js
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  user = new User();
  errors = [];

  constructor(
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit(): void{}

  response(response): void{
    if(response.success===false){
      this.errors = response.errors.errors;
      this.errors.message = response.errors.message;
      this.errors._message = response.errors._message;
    }

    if(response.success===true){
      this.router.navigate(['/users/view/', response.user._id]);
    }
  }

  onSubmit(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => {this.response(response)}
    );
  }

}
```

*user.service.ts*
```js
...
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

...

  createUser (user: User): Observable<User> {
    return this.http.post<User>(this.url + '/create',user, httpOptions);
  }

}
```
