import {Injectable} from '@angular/core';
import {ApiService} from './ApiService';
import {UserService} from './UserService';
import {UserInfo} from "../models/UserInfo";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {
  }

  singIn<T, V>(userInfo: T): Observable<V> {
    return this.apiService.singIn<T, V>(userInfo);
  }

  singUp<T>(user: T): Observable<T> {
    return this.apiService.singUp<T>(user);
  }
}
