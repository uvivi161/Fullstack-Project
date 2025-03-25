import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // המשתמש מחובר - מאשר כניסה לנתיב
    return true;
  } else {
    // המשתמש לא מחובר - מפנה לדף התחברות
    router.navigate(['/login']);
    return false;
  }
};
