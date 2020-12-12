import {Injectable} from "@angular/core";
import {Dish} from "../models/dish";
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "./ApiService";

@Injectable()
export class CartService {

  cart: Map<Dish, number>;
  cartKeys: Array<Dish>;

  constructor(
    private cookieService: CookieService,
    private apiService: ApiService
  ) {
    this.cart = new Map<Dish, number>();
    if (this.cookieService.get('cart')) {
      this.apiService.getDishes().subscribe(data => {
        if (data) {
          const cartObj = JSON.parse(this.cookieService.get('cart'));
          // tslint:disable-next-line:forin
          for (const value in cartObj) {
            const dish: Dish = data.filter(it => it.id === Number(value))[0];
            this.cart.set(dish, cartObj[value]);
          }
        }
        this.cartKeys = Array.from(this.cart.keys()).sort((d1, d2) => d1.id - d2.id);
      });
      this.cartKeys = Array.from(this.cart.keys()).sort((d1, d2) => d1.id - d2.id);
    } else {
      this.cartKeys = Array.from(this.cart.keys()).sort((d1, d2) => d1.id - d2.id);
    }
  }

  addDish(dish: Dish) {
    if (this.cart.has(dish)) {
      const num = this.cart.get(dish) as number;
      this.cart.delete(dish);
      this.cart.set(dish, num + 1);
    } else {
      this.cart.set(dish, 1);
    }
    this.cartKeys = Array.from(this.cart.keys()).sort((d1, d2) => d1.id - d2.id);
    this.updateCartInfo();
  }

  decrementDish(dish: Dish) {
    if (this.cart.has(dish)) {
      const num = this.cart.get(dish) as number;
      this.cart.delete(dish);
      if (num - 1 !== 0) {
        this.cart.set(dish, num - 1);
      }
    }
    this.cartKeys = Array.from(this.cart.keys()).sort((d1, d2) => d1.id - d2.id);
    this.updateCartInfo();
  }

  deleteDish(dish: Dish) {
    if (this.cart.has(dish)) {
      this.cart.delete(dish);
    }
    this.cartKeys = Array.from(this.cart.keys()).sort((d1, d2) => d1.id - d2.id);
    this.updateCartInfo();
  }

  updateCartInfo() {
    const jsonMap = this.getCartAsJsonObj();
    this.cookieService.set('cart', JSON.stringify(jsonMap));
  }

  getCartAsJsonObj() {
    const jsonMap: {[index: number]: any} = {};
    this.cart.forEach((value, key) => {
      jsonMap[key.id] = value;
    });
    return jsonMap;
  }

  deleteAll() {
    this.cart.clear();
    this.cookieService.delete('cart');
    this.cartKeys = Array();
  }
}
