
// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatBadgeModule } from '@angular/material/badge';
// import {MatDividerModule} from '@angular/material/divider';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/authService/auth.service';

// @Component({
//   selector: 'app-dashboard-header',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatToolbarModule,
//     MatButtonModule,
//     MatIconModule,
//     MatMenuModule,
//     MatBadgeModule,
//     MatDividerModule
//   ],
//   templateUrl: './dashboard-header.component.html',
//   styleUrls: ['./dashboard-header.component.css']
// })
// export class DashboardHeaderComponent {
//   @Output() menuToggled = new EventEmitter<void>();
  
//   currenyUser: any = null;
  
//   constructor(private router: Router, private authService: AuthService) {
//     this.currenyUser = this.authService.getDecodedToken();
//   }
  
//   toggleMenu() {
//     this.menuToggled.emit();
//   }
  
//   logout() {
//     // Call your auth service logout method
//     // this.authService.logout();
//     this.router.navigate(['/']);
//   }
// }




































import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {
  @Output() menuToggled = new EventEmitter<void>();
  
  currenyUser: any = null;
  
  constructor(private router: Router, private authService: AuthService) {
    this.currenyUser = this.authService.getDecodedToken();
  }
  
  toggleMenu() {
    this.menuToggled.emit();
  }
  
  logout() {
    // Call your auth service logout method
    // this.authService.logout();
    this.router.navigate(['/']);
  }
  
  // Get the first letter of the email
  getFirstLetter(email: string): string {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  }
  
  // Generate a consistent color based on the email
  getAvatarColor(email: string): string {
    if (!email) return '#757575'; // Default gray
    
    // List of pleasant background colors
    const colors = [
      '#4CAF50', // Green
      '#2196F3', // Blue
      '#9C27B0', // Purple
      '#FF5722', // Deep Orange
      '#607D8B', // Blue Gray
      '#795548', // Brown
      '#009688', // Teal
      '#673AB7', // Deep Purple
      '#3F51B5', // Indigo
      '#F44336', // Red
      '#00BCD4', // Cyan
      '#CDDC39', // Lime
    ];
    
    // Simple hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Use the hash to pick a color
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }
}