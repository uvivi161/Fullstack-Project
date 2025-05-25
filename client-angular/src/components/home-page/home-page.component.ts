// import { Component } from '@angular/core';
// import { LoginComponent } from "../login/login.component";
// import { SigninComponent } from "../signin/signin.component";
// import { LogoutComponent } from "../logout/logout.component";
// import { MatToolbarModule } from '@angular/material/toolbar';

// @Component({
//   selector: 'app-home-page',
//   imports: [LoginComponent, SigninComponent, LogoutComponent, MatToolbarModule],
//   templateUrl: './home-page.component.html',
//   styleUrl: './home-page.component.css'
// })
// export class HomePageComponent {

// }














import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    LoginComponent,
    SigninComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomeComponent {
  // You can add any home page specific logic here if needed
}