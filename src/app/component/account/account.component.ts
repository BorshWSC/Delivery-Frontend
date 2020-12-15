import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../service/AuthService";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/UserService";
import {ApiService} from "../../service/ApiService";
import {Comment} from "../../models/comment";
import {User} from "../../models/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  infoForm: FormGroup;
  commentForm: FormGroup;
  pattern = '\\+7\\s?[\\(]{0,1}9[0-9]{2}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}';

  constructor(
    private dialogRef: MatDialogRef<AccountComponent>,
    private apiService: ApiService,
    private userService: UserService
  ) {
    const user = this.userService.getCurrentUser();
    this.infoForm = new FormGroup({
      email: new FormControl(user?.email, [Validators.required, Validators.email]),
      password: new FormControl(''),
      firstName: new FormControl(user?.firstName, Validators.required),
      lastName: new FormControl(user?.lastName, Validators.required),
      phoneNumber: new FormControl(user?.phoneNumber, [Validators.required, Validators.pattern(this.pattern)]),
      address: new FormControl(user?.address, Validators.required)
    });

    this.commentForm = new FormGroup({
      commentArea: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  get(name: string) {
    return this.infoForm.get(name) as AbstractControl;
  }

  getComment(): string {
    return this.commentForm.get('commentArea')?.value;
  }

  @HostListener('window:keyup.esc')
  cancel() {
    this.dialogRef.close(null);
  }

  accept() {
    // @ts-ignore
    const id = this.userService.getCurrentUser().id;
    const user = {
      id: id,
      firstName: this.get('firstName').value,
      lastName: this.get('lastName').value,
      email: this.get('email').value,
      phoneNumber: this.get('phoneNumber').value,
      password: this.get('password').value,
      address: this.get('address').value
    } as User;
    this.apiService.updateUser(user).subscribe(data => {
      if (data) {
        this.userService.setCurrentUser(data);
        this.dialogRef.close(data);
      }
    }, error => {
      console.log(error);
    });
  }

  sendComment() {
    const comment = {
      id: 0,
      user: this.userService.getCurrentUser(),
      text: this.getComment()
    } as Comment;
    this.apiService.addComment(comment).subscribe(data => {
      if (data) {
        this.commentForm.get('commentArea')?.setValue('');
      }
    });
  }

  isCommentEnable(): boolean {
    return this.getComment() !== null && this.getComment() !== '';
  }
}
