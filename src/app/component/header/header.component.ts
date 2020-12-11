import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/UserService";
import {Router} from "@angular/router";
import {AuthService} from "../../service/AuthService";
import {ApiService} from "../../service/ApiService";
import {DialogService} from "../../service/DialogService";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../assets/styles/main-style.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService,
    protected router: Router
  ) { }

  ngOnInit(): void {
  }

  public registration(): void {
    this.dialogService.showRegistrationDialog().afterClosed().subscribe(data => {
      if (data) {
        if (data.id) {
          this.userService.setCurrentUser(data);
        } else {
          this.auth();
        }
      }
    });
  }

  public auth(): void {
    this.dialogService.showAuthorizationDialog().afterClosed().subscribe(data => {
      if (data) {
        if (data.id) {
          this.userService.setCurrentUser(data);
        } else {
          this.registration();
        }
      }
    });
  }

  public account(): void {
    this.dialogService.showAccountDialog().afterClosed().subscribe(data => {

    });
  }

  isLogged(): boolean {
    return !!this.userService.getCurrentUser();
  }

  logOut() {
    this.userService.deleteCurrentUser();
  }

  showMenu(category: number | null) {
    this.router.navigate(['/menu'], {queryParams: {category: category}});
  }

  showMain() {
    this.router.navigateByUrl("");
  }
}
