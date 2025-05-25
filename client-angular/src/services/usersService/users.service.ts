import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../authService/auth.service';

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
export class UsersService {

    private url = 'https://localhost:7170/api/Users';

    private tokenData: any;

    constructor(private http: HttpClient, private authService: AuthService) {
        // אין צורך ב-ngOnInit בסרוויסים
        this.tokenData = this.authService.getDecodedToken();
        console.log(this.tokenData);
        
    }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/getByCompanyName?companyName=${this.tokenData.companyName}`);
    }

    getUserByMail(mail: string) {
        return this.http.get(`${this.url}/getByMail-admin`, { params: { mail } });
    }

    getLastMonthUsers() {
        return this.http.get(`${this.url}/getLastMonth`);
    }

    deleteUser(id: string) {
        return this.http.delete(`${this.url}/deleteUser-admin`, { params: { id } });
    }

    updateUser(user: any, id: number) {
        debugger;
        return this.http.put(`${this.url}/${id}`, user);
    }

    postUser(mail:string, role:string, city:string){
        debugger;
        const company= this.tokenData.companyName;
        return this.http.post(`${this.url}`, { mail, role, city,companyName:company });
    }

}











// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService, User } from '../authService/auth.service';
// import { filter, switchMap } from 'rxjs/operators';

// @Injectable({
//     providedIn: 'root'
// })
// export class UsersService {

//     private url = 'https://localhost:7170/api/Users';

//     constructor(private http: HttpClient, private authService: AuthService) {
//         // אין צורך ב-ngOnInit בסרוויסים
//     }

//     getUsers(): Observable<any[]> {
//         // שימוש ב-switchMap כדי להשתמש במשתמש הנוכחי מה-observable של AuthService
//         return this.authService.currentUser$.pipe(
//             filter(user => user !== null), // מתעלם ממשתמשים null
//             switchMap(user => {
//                 const params: any = user?.companyName ? { companyName: user.companyName } : {};
//                 debugger;
//                 return this.http.get<any[]>(`${this.url}/getByCompanyName`, { params });
//             })
//         );
//     }

//     // גישה ישירה למשתמש הנוכחי ללא observable
//     getUsersDirectly(): Observable<any[]> {
//         const currentUser = this.authService.getCurrentUser();
//         const params: any = currentUser?.companyName ? { companyName: currentUser.companyName } : {};
//         return this.http.get<any[]>(`${this.url}/getByCompanyName`, { params });
//     }

//     getUserByMail(mail: string) {
//         return this.http.get(`${this.url}/getByMail-admin`, { params: { mail } });
//     }

//     deleteUser(id: string) {
//         return this.http.delete(`${this.url}/deleteUser-admin`, { params: { id } });
//     }

//     updateUser(user: any, id: number) {
//         return this.http.put(`${this.url}/updateUser/${id}`, user);
//     }
// }