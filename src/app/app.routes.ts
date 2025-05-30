import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'bus-list',
    loadComponent: () => import('./pages/bus-list/bus-list.component').then(m => m.BusListComponent)
  },
  {
    path: 'bus-details/:id',
    loadComponent: () => import('./pages/bus-details/bus-details.component').then(m => m.BusDetailsComponent)
  },
  {
    path: 'booking/:id',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];