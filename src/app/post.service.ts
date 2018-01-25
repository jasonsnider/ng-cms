import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Post } from './post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostService {

  private url: string = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post> {
    return this.http.get<Post>(this.url);
  }

  getPost(slug: string): Observable<Post> {
    return this.http.get<Post>(this.url + `/view/${slug}`);
  }

  createPost (user: Post): Observable<Post> {
    return this.http.post<Post>(this.url + '/create',user, httpOptions);
  }

  editPost (user: Post): Observable<Post> {
    return this.http.post<Post>(this.url + '/edit',user, httpOptions);
  }

  deletePost (id: string): Observable<Post> {
    return this.http.get<Post>(this.url + `/delete/${id}`);
  }
}
