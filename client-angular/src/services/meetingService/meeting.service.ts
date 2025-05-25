import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private tokenData: any;
  constructor(private http: HttpClient,private authService: AuthService) {
     this.tokenData = this.authService.getDecodedToken();
   }
  private url = 'https://fullstack-project-tt0t.onrender.com/api/MeetingControler';
  

  getMeetings(){
    debugger;
    return this.http.get(`${this.url}/getLastMonth?companyName=${this.tokenData.companyName}`);
  }


}
