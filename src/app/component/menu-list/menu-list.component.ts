import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/ApiService";
import {Category} from "../../models/category";
import {Dish} from "../../models/dish";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../service/CartService";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  categories!: Category[];
  dishes!: Dish[];

  form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {
    this.form = new FormGroup({
      categoryFormControl: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(data => {
      if (data) {
        this.categories = data;
        this.activatedRoute.queryParams.subscribe(params => {
          if (params) {
            const category = params['category'];
            if (category) {
              this.get('categoryFormControl').setValue(
                this.categories.find(it => it.id === Number(category))
              );
            } else {
              this.get('categoryFormControl').setValue(null);
            }
          }
        });
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getDishes().subscribe(data => {
      if (data) {
        this.dishes = data;
      }
    }, error => {
      console.log(error);
    });
  }

  getDishes(category: Category): Dish[] {
    return this.dishes.filter(it => it.category.id === category.id);
  }

  get(name: string) {
    return this.form.get(name) as AbstractControl;
  }

  getCategories(): Category[] {
    return this.get('categoryFormControl').value ? [this.get('categoryFormControl').value] : this.categories;
  }

  isSelected(dish: Dish): boolean {
    return this.cartService.cart.has(dish);
  }
}
