import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/ApiService";
import {Comment} from "../../models/comment";

// @ts-ignore

export interface SelectedItemInterface {
  item: any;
  index: number;
  first: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  comments!: Comment[];

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.apiService.getComments().subscribe(data => {
      if (data) {
        this.comments = data;
      }
    }, error => {
      console.log(error);
    });
  }

}
