import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../service/UserService";
import {CartService} from "../../service/CartService";
import {Dish} from "../../models/dish";
import {ApiService} from "../../service/ApiService";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  form: FormGroup;
  pattern = '\\+7\\s?[\\(]{0,1}9[0-9]{2}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}';

  constructor(
    private dialogRef: MatDialogRef<CartComponent>,
    private apiService: ApiService,
    private userService: UserService,
    private cartService: CartService
  ) {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.form = new FormGroup({
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required),
        phoneNumber: new FormControl(user.phoneNumber, [Validators.required, Validators.pattern(this.pattern)]),
        address: new FormControl(user.address, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
        address: new FormControl('', Validators.required)
      });
    }
  }

  ngOnInit(): void {
  }

  getCart() {
    return this.cartService.cartKeys;
  }

  getCartService() {
    return this.cartService;
  }

  get(name: string) {
    return this.form.get(name) as AbstractControl;
  }

  increment(dish: Dish) {
    this.cartService.addDish(dish);
  }

  decrement(dish: Dish) {
    this.cartService.decrementDish(dish);
  }

  enabledForm() {
    return this.get('firstName').valid &&
      this.get('lastName').valid &&
      this.get('phoneNumber').valid &&
      this.get('address').valid &&
      this.getTotal() !== 0;
  }

  deleteFromCart(dish: Dish) {
    this.cartService.deleteDish(dish);
  }

  accept() {
    this.apiService.sendOrder(this.cartService.getCartAsJsonObj(), this.userService.getCurrentUser()?.id.toString())
      .subscribe(data => {
        if (data) {
          this.cartService.deleteAll();
          this.dialogRef.close(data);
        }
      }, error => {
        console.log(error);
      });
  }

  @HostListener('window:keyup.esc')
  cancel() {
    this.dialogRef.close(null);
  }

  getTotal() {
    let sum = 0;
    this.cartService.cart.forEach((value, key) => {
      sum += key.cost * value;
    });
    return sum;
  }
}
