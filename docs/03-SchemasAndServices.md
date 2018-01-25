# Schemas and Services

In Angular we can represent the data (or model) layer in the form of a service and a schema. A service is a class that will interact with the data in this case an API and schema is a class that defines the data.

## The Schema
Build the user schema for now we can define this as an empty class, we can build this out later. Create the file *src/app/user.ts*.

*src/app/user.ts*
```js
export class User {
  user: object;
  users: array;
  errors: any;
  success: boolean;
}
```


## HttpClientModule

Since we know we will be making API calls we should go ahead and load the *HttpClientModule*. Add the following to *src/app/app.module.ts*

*src/app/app.module.ts*
```js
import { HttpClientModule } from '@angular/common/http';
...
imports: [
  BrowserModule,
  HttpClientModule
],
...
```

## The Service

The service is how we interact with an API. There are some things we already know that will help us set up the service for later use.

1. We are working with a web based API.
  * Import HttpClient from Angular.
  * inject HttpClient into the the service constructor.
1. We will post JSON data to the API.
  * Import HttpHeaders from Angular.
  * Create JSON headers for post requests.
1. We will be using observables.
  * Import Observable from the rxjs library.
1. We will be working with the User object.
  * Import our newly craeted User schema.
1. I know the URL of the API endpoints.
  * Set up URL variables accordingly.

We will use AngularCLI to generate the service and automatically import it into AppModule.

```sh
ng generate service user --module=app
```

Update *src/app/user.service.ts* as follows.

*src/app/user.service.ts*
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

To test our service we will add call a test method on initialization of UsersComponent.

*src/app/users/users.component.ts*
```js
import { Component, OnInit } from '@angular/core';

// 1. Import the UserService
import { UserService } from '../user.service';

// 2. Import the User Object/Schema
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // 3. Create a users property of type user
  users: User;

  // 4. Inject the UsersService into the constructor
  constructor(private userService: UserService) { }

  // 6. Make a call to the service on initialization
  ngOnInit() {
    this.getUsers();
  }

  // 5. Craete a local wrapper for
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response.users,
        console.log(this.users)
      }
    );
  }
}
```

Now in Chrome navigate to [https://localhost:4200](https://localhost:4200) and press [f12] then click on the console tab. You wil now see a JSON object that contains a list of all users on the server.
