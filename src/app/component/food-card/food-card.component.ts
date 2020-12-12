import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../../models/dish";
import {CartService} from "../../service/CartService";

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent implements OnInit {

  @Input() dish!: Dish;
  @Input() selected!: boolean;

  constructor(
    private cartService: CartService
  ) { }


  ngOnInit(): void {
  }

  getCartService() {
    return this.cartService;
  }

  addToCart(dish: Dish) {
    this.cartService.addDish(dish);
  }

  increment(dish: Dish) {
    this.cartService.addDish(dish);
  }

  decrement(dish: Dish) {
    this.cartService.decrementDish(dish);
  }

  deleteFromCart(dish: Dish) {
    this.cartService.deleteDish(dish);
  }
}
