import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class UserService {

  constructor(
    private cookieService: CookieService
  ) {

  }

  getCurrentUser() {
    if (!this.cookieService.get('user')) return null;
    return JSON.parse(this.cookieService.get('user')) as User;
  }

  setCurrentUser(user: User) {
    this.cookieService.set('user', JSON.stringify(user));
  }

  deleteCurrentUser() {
    this.cookieService.delete('user');
  }
}
