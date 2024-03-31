import { Routes } from '@angular/router';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
 
 
export const authGuard = () => {
  const router = inject(Router);
 
  if(sessionStorage.getItem('login') && sessionStorage.getItem('login') === 'true') {
    return true;
  }
 
  // Redirect to the login page
  return router.parseUrl('/');
};
 
export const logoutGuard = () => {
  const router = inject(Router);
 
  if(sessionStorage.getItem('login') && sessionStorage.getItem('login') === 'true') {
    return router.navigate(['/landing']);
  }
  return true;
}

export const routes: Routes = [  
    {
        path: '',
        loadComponent: () => import('./login/login.component')
        .then(mod => mod.LoginComponent),
        canActivate: [logoutGuard]
    }, 
    {
        path: 'landing',
        loadComponent: () => import('./landing/landing.component')
        .then(mod => mod.LandingComponent),
        canActivate: [authGuard]
    }, 
    {
        path: 'register-user',
        loadComponent: () => import('./register/register.component')
        .then(mod => mod.RegisterComponent),
        canActivate: [logoutGuard]
    }
];
