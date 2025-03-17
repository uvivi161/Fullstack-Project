import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../components/login/login.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-angular';
}
