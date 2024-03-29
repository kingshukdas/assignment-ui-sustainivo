
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard = () => {
  const router = inject(Router);

  if (sessionStorage.getItem('login') && sessionStorage.getItem('login') === 'true') {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/');
};

export const logoutGuard = () => {
  const router = inject(Router);

  if (sessionStorage.getItem('login') && sessionStorage.getItem('login') === 'true') {
    return router.navigate(['/landing']);
  }
  return true;

  // Redirect to the login page
}
