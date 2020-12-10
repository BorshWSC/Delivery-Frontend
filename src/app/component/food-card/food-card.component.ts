import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../../models/dish";

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent implements OnInit {

  @Input() dish!: Dish;

  constructor() { }

  ngOnInit(): void {
  }

}
