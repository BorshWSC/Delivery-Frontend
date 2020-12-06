import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../service/AuthService";
import {UserService} from "../../service/UserService";
import {User} from "../../models/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  pattern = '\\+7\\s?[\\(]{0,1}9[0-9]{2}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}';
  error = false;

  constructor(
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      address: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  get(name: string) {
    return this.form.get(name) as AbstractControl;
  }

  enabledForm(): boolean {
    return this.get('email').valid &&
      this.get('password').valid &&
      this.get('firstName').valid &&
      this.get('lastName').valid &&
      this.get('phoneNumber').valid &&
      this.get('address').valid;
  }

  accept() {
    this.authService.singUp<User>({
      id: 0,
      email: this.get('email').value,
      password: this.get('password').value,
      firstName: this.get('firstName').value,
      lastName: this.get('lastName').value,
      phoneNumber: this.get('phoneNumber').value,
      address: this.get('address').value,
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

  goToAuth() {
    this.dialogRef.close('auth');
  }
}
