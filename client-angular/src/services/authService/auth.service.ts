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



