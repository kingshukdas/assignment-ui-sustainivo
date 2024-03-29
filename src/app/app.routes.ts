import { Routes } from '@angular/router';

export const routes: Routes = [  
    {
        path: '',
        loadComponent: () => import('./login/login.component')
        .then(mod => mod.LoginComponent)
    }, 
    {
        path: 'landing',
        loadComponent: () => import('./landing/landing.component')
        .then(mod => mod.LandingComponent)
    }, 
    {
        path: 'register-user',
        loadComponent: () => import('./register/register.component')
        .then(mod => mod.RegisterComponent)
    }
];
