import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService) { }
  logout() {  
    if(this.authService.isLoggedIn()){
      this.authService.logout();
      alert("logged out successfully");
    }
    else{
      alert('there is no token');
    }
  }

}
