import {Component} from '@angular/core';
import {ApiService} from "../../service/ApiService";
import {CartService} from "../../service/CartService";
import {Dish} from "../../models/dish";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dish!: Dish;

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {
    this.apiService.getDishById(8).subscribe(data => {
      if (data) {
        this.dish = data;
      }
    }, error => {
      console.log(error);
    });
  }
  addToCart() {
    this.cartService.addDish(this.dish);
  }
}
