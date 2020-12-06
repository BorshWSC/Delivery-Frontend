import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './component/registration/registration.component';
import {MainComponent} from './component/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
