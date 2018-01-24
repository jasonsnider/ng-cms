import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private url: string = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + `/view/${id}`);
  }

  createUser (user: User): Observable<User> {
    return this.http.post<User>(this.url + '/create',user, httpOptions);
  }

}
