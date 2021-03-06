import {Injectable} from '@angular/core';
import {UserService} from './UserService';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserInfo} from '../models/UserInfo';
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Category} from "../models/category";
import {Dish} from "../models/dish";
import {Comment} from "../models/comment";

@Injectable()
export class ApiService {

  private url = '/api';

  options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
  };

  constructor(
    private http: HttpClient,
    userService: UserService
  ) {
    let header = new HttpHeaders();
    header = header
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest');
    this.options = {headers: header};
  }

  private post<T>(addUrl: string, body: any): Observable<T> {
    return this.http.post<T>(this.url + addUrl, JSON.stringify(body), this.options);
  }

  private put<T>(addUrl: string, body: any): Observable<T> {
    return this.http.put<T>(this.url + addUrl, JSON.stringify(body), this.options);
  }

  private get<T>(addUrl: string): Observable<T> {
    return this.http.get<T>(this.url + addUrl, this.options);
  }

  singIn<T, V>(userInfo: T): Observable<V> {
    return this.post<V>('/auth/singIn', userInfo);
  }

  singUp<T>(user: T): Observable<T> {
    return this.post<T>('/auth/singUp', user);
  }

  getCategories(): Observable<Category[]> {
    return this.get<Category[]>('/category');
  }

  getDishes(): Observable<Dish[]> {
    return this.get<Dish[]>('/dish');
  }

  getDishById(id: number): Observable<Dish> {
    return this.get<Dish>('/dish/' + id);
  }

  addComment(comment: Comment): Observable<any> {
    return this.post<any>('/comment/add', comment);
  }

  updateUser(user: User) {
    return this.put<User>('/user/' + user.id, user);
  }

  sendOrder(order: {[index: number]: any}, userId: string | undefined): Observable<any> {
    return this.post<any>('/order/create/' + userId, order);
  }

  getComments(): Observable<Comment[]> {
    return this.get<Comment[]>('/comment');
  }
}
