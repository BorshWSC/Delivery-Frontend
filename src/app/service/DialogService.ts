import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegistrationComponent} from "../component/registration/registration.component";
import {AuthorizationComponent} from "../component/authorization/authorization.component";

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  showRegistrationDialog(): MatDialogRef<RegistrationComponent> {
    return this.dialog.open(RegistrationComponent, {
      width: '728px',
      height: '496px',
      disableClose: true,
      autoFocus: true
    });
  }

  showAuthorizationDialog(): MatDialogRef<AuthorizationComponent> {
    return this.dialog.open(AuthorizationComponent, {
      width: '728px',
      height: '430px',
      disableClose: true,
      autoFocus: true
    });
  }
}