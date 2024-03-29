import { Routes } from '@angular/router';
import { authGuard, logoutGuard } from './shared/auth.guard';

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
