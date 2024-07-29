import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login';
import { StaffComponent } from './components/staff/staff.component';
import { CompanyComponent } from './components/company/company.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
      },

      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [authGuard],
      },

      {
        path: 'company',
        component: CompanyComponent,
        canActivate: [authGuard],
      },

      {
        path: 'logout',
        redirectTo: '/login',
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '**',
    redirectTo: '/login', // Redirect any unknown paths to login
  },
];
