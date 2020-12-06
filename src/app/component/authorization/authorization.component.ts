import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../service/AuthService";
import {User} from "../../models/user";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  form: FormGroup;
  error = false;

  constructor(
    private dialogRef: MatDialogRef<AuthorizationComponent>,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

  }

  get(name: string) {
    return this.form.get(name) as AbstractControl;
  }

  enabledForm(): boolean {
    return this.get('email').valid &&
      this.get('password').valid;
  }

  accept() {
    this.authService.singIn<UserInfo, User>({
      email: this.get('email').value,
      password: this.get('password').value,
    }).subscribe(data => {
      if (data) {
        this.dialogRef.close(data);
      }
    }, error => {
      this.error = true;
    });
  }

  @HostListener('window:keyup.esc')
  cancel() {
    this.dialogRef.close(null);
  }

  goToReg() {
    this.dialogRef.close('reg');
  }
}
