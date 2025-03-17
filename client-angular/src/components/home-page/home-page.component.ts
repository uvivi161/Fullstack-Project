import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { SigninComponent } from "../signin/signin.component";
import { LogoutComponent } from "../logout/logout.component";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home-page',
  imports: [LoginComponent, SigninComponent, LogoutComponent, MatToolbarModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
