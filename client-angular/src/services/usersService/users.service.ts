import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url ='https://localhost:7170/api/Users';

  constructor(private http: HttpClient) { }

  // private getToken(): string | null{
  //   return sessionStorage.getItem('token');
  // }


  // private getHeaders():HttpHeaders{
  //   const token = this.getToken();
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // } 
  
  getUsers():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getAllUser-admin`);
  }

  getUserByMail(mail: string){
    return this.http.get(`${this.url}/getByMail-admin`, { params: { mail } });
  }

  deleteUser(id: string){
    debugger;
    return this.http.delete(`${this.url}/deleteUser-admin`, { params: { id } });
  }

  updateUser(user: any, id:number){
    debugger;
    return this.http.put(`${this.url}/updateUser/${id}`, user);
  }
}
