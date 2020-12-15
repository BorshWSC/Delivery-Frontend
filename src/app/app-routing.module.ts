import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {MenuListComponent} from "./component/menu-list/menu-list.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'menu',
    component: MenuListComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
