import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


interface MyTokenPayload {
    mail: string;
    city: string;
    companyName: string;
    role: string;
    // אם יש עוד שדות אפשר להוסיף פה
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='https://localhost:7170/api/Auth';
  constructor(private http: HttpClient, private router: Router) { }
  
  login(mail: string, password: string) {
    const permission = "admin";
    return this.http.post(`${this.url}/login`, {password, mail, permission }).subscribe((res:any) => {
      sessionStorage.setItem('token', res.token);
      console.log(res.token);
      // alert('Login Successful');
      this.router.navigate(['/dashboard']);
    },
    (error: any) => {
      if(error.status === 401){
        alert('Invalid mail or password');
        console.log(error);
        
        return;
      }
      if(error.status === 400){
        alert('Invalid input');
        console.log(error);
        
        return;
      }
      alert('Login Failed');
    }
  )}

  isLoggedIn():boolean{
    return !!sessionStorage.getItem('token');
  } 


  logout(){
      sessionStorage.removeItem('token');
      this.router.navigate(['/']);
  } 



  getDecodedToken(): MyTokenPayload | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;
    try {
        const decoded = jwtDecode<MyTokenPayload>(token);
        return decoded;
    } catch (error) {
        console.error('Failed to decode token', error);
        return null;
    }
  }


  // signIn(mail: string, password: string, role:string){
  //   this.http.post(`${this.url}/register`, {mail, password, role}).subscribe((res:any) => {
  //     sessionStorage.setItem('token', res.token);     
  //     alert('Sign in Successful');
  //   },
  //   (error: any) => {
  //     if(error.status === 409){
  //       alert('mail already exists');
  //       return;
  //     }
  //     if(error.status === 400){
  //       alert('Invalid input');
  //       return;
  //     }
  //     alert('Sign in Failed');
  //   }) 
  // }  


  signIn(mail: string, password: string, role: string, country: string, companyName: string) {
  const body = {
    mail,
    password,
    role,
    country,
    companyName
  };
  debugger;
  this.http.post(`${this.url}/adminRegister`, body).subscribe(
    (res: any) => {
      sessionStorage.setItem('token', res.token);
      // alert('Sign in Successful');
      this.router.navigate(['/dashboard']);
    },
    (error: any) => {
      if (error.status === 400) {
        alert('מנהל עם מייל זה כבר קיים או קלט לא תקין');
        return;
      }
      alert('Sign in Failed');
    }
  );
}

}  






















//נראה י שעובד מצוין לא שומר observable של יוזר מחובר
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router'; // Add this import
// import { BehaviorSubject } from 'rxjs';

// export interface User {
//   id: number;
//   mail: string;
//   companyName: string;
//   country: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   currentUser$ = this.currentUserSubject.asObservable();

//   private url='https://localhost:7170/api/Auth';

//   // Add Router to the constructor
//   constructor(private http: HttpClient, private router: Router) { }
                   
//   login(mail: string, password: string) {
//     return this.http.post(`${this.url}/login`, {password, mail}).subscribe(
//       (res:any) => {
//         sessionStorage.setItem('token', res.token);
//         console.log(res.token);
//         // alert('Login Successful');
//         this.currentUserSubject.next(res.user); // Update the current user
//         // Add navigation to dashboard after successful login
//         this.router.navigate(['/dashboard']);
//       },
//       (error: any) => {
//         if(error.status === 401){
//           alert('Invalid mail or password');
//           return;
//         }
//         if(error.status === 400){
//           alert('Invalid input');
//           console.log(error);
//           return;
//         }
//         alert('Login Failed');
//       }
//     );
//   }

//   isLoggedIn():boolean{
//     return !!sessionStorage.getItem('token');
//   } 

//   logout(){
//     sessionStorage.removeItem('token');
//     // Add navigation to home/login page after logout
//     this.router.navigate(['/']);
//   } 

//   signIn(mail: string, password: string, role: string, country: string, companyName: string) {
//     const body = {
//       mail,
//       password,
//       role,
//       country,
//       companyName
//     };
    
//     this.http.post(`${this.url}/adminRegister`, body).subscribe(
//       (res: any) => {
//         sessionStorage.setItem('token', res.token);
//         alert('Sign in Successful');
        
//         // Add navigation to dashboard after successful registration
//         this.router.navigate(['/dashboard']);
//       },
//       (error: any) => {
//         if (error.status === 400) {
//           alert('מנהל עם מייל זה כבר קיים או קלט לא תקין');
//           return;
//         }
//         alert('Sign in Failed');
//       }
//     );
//   }
// }

















// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// export interface User {
//   id: number;
//   mail: string;
//   companyName: string;
//   country: string;
//   role?: string;
//   // Add any other user properties you need
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   currentUser$ = this.currentUserSubject.asObservable();

//   private url = 'https://localhost:7170/api/Auth';

//   constructor(private http: HttpClient, private router: Router) {
//     // Check if we have a token and load the user on service initialization
//     if (this.isLoggedIn()) {
//       this.loadCurrentUser();
//     }
//   }

//   // Get the current user as a snapshot (not an Observable)
//   getCurrentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   // Load the current user from the token or by making an API call
//   loadCurrentUser() {
//     // Option 1: If your token contains user data (JWT), decode it
//     // const token = sessionStorage.getItem('token');
//     // if (token) {
//     //   const decodedToken = this.decodeToken(token);
//     //   this.currentUserSubject.next(decodedToken.user);
//     // }

//     // Option 2: Make an API call to get the current user
//     return this.http.get<User>(`${this.url}/getCurrentUser`).subscribe(
//       (user) => {
//         this.currentUserSubject.next(user);
//       },
//       (error) => {
//         console.error('Failed to load user data', error);
//         // If we can't load the user, clear the token
//         if (error.status === 401) {
//           this.logout();
//         }
//       }
//     );
//   }
//    getUserByMail(mail: string) {
//   return this.http.get<User>(`https://localhost:7170/api/Users/getByMail-admin`, { params: { mail } });
//    } 
//   login(mail: string, password: string) {
//     return this.http.post<{token: string, user: User}>(`${this.url}/login`, {password, mail})
//       .subscribe(
//         (res) => {
//           sessionStorage.setItem('token', res.token);
//           console.log('Login successful, token:', res.token);
//           debugger;
//           this.getUserByMail(mail).subscribe(
//             (userData: User) => {
//           // שמירת פרטי המשתמש במשתנה הגלובלי
//           this.currentUserSubject.next(userData);
//             console.log('User data:', userData);
//           })
          
//           // Navigate to dashboard
//           this.router.navigate(['/dashboard']);
//         },
//         (error) => {
//           if (error.status === 401) {
//             alert('Invalid mail or password');
//           } else if (error.status === 400) {
//             alert('Invalid input');
//             console.log(error);
//           } else {
//             alert('Login Failed');
//           }
//         }
//       );
//   }


//   signIn(mail: string, password: string, role: string, country: string, companyName: string) {
//     const body = {
//       mail,
//       password,
//       role,
//       country,
//       companyName
//     };
    
//     this.http.post<{token: string, user: User}>(`${this.url}/adminRegister`, body)
//       .subscribe(
//         (res) => {
//           sessionStorage.setItem('token', res.token);
          
//           // Store the user data - this was missing in your original code
//           this.currentUserSubject.next(res.user);
          
//           alert('Sign in Successful');
//           this.router.navigate(['/dashboard']);
//         },
//         (error) => {
//           if (error.status === 400) {
//             alert('מנהל עם מייל זה כבר קיים או קלט לא תקין');
//           } else {
//             alert('Sign in Failed');
//           }
//         }
//       );
//   }

//   isLoggedIn(): boolean {
//     return !!sessionStorage.getItem('token');
//   }

//   logout() {
//     sessionStorage.removeItem('token');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/']);
//   }

//   // Helper method to decode JWT tokens if needed
//   private decodeToken(token: string): any {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       console.error('Error decoding token', e);
//       return null;
//     }
//   }
// }