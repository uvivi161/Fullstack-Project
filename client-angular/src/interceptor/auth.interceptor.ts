// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const token = sessionStorage.getItem('token');
    
//     if (token) {
//       // מוסיפים את הטוקן לכל בקשה
//       const cloned = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(cloned);
//     }

//     // אם אין טוקן – שולחים רגיל
//     return next.handle(request);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  // console.log('token         '  + token);
  
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }
   
  return next(req);
};
