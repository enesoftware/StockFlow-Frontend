import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { MenuComponent } from './core/component/menu/menu.component';
import { ErrorComponent } from './core/component/error/error.component';
import { roleControlGuard } from './shared/guard/role-control/role-control.guard';
import { ROLE_ADMIN, ROLE_DEPO, ROLE_RAPOR } from './shared/const/roles';
import { loggedInControlGuard } from './shared/guard/logged-in-control/logged-in-control.guard';
import { DenemelerComponent } from './core/component/denemeler/denemeler.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Warehouse Management System',
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [loggedInControlGuard()],
    children: [
      {
        title: 'Home',
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        title: 'Shelf Management',
        path: 'shelf',
        loadChildren: () =>
          import('./modules/shelf/shelf.module').then((m) => m.ShelfModule),
      },
      {
        title: 'Item Management',
        path: 'item',
        loadChildren: () =>
          import('./modules/item/item.module').then((m) => m.ItemModule),
      },
      {
        title: 'User Management',
        path: 'user',
        canActivate: [roleControlGuard(ROLE_ADMIN)],
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        title: 'Report Management',
        path: 'report',
        canActivate: [roleControlGuard(ROLE_RAPOR)],
        loadChildren: () =>
          import('./modules/report/report.module').then((m) => m.ReportModule),
      },
      {
        title: 'Profile Management',
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  { path: 'deneme', component: DenemelerComponent },
  { path: '**', component: ErrorComponent, title: 'Error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
