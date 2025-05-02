import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; // חשוב במיוחד!
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  // logInForm!: FormGroup;
  showLoginForm = false;
  hidePassword = true;

  logInForm = new FormGroup({
    mail: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  // ngOnInit(): void {
  //   // יצירת טופס ריאקטיבי עם ולידציות
  //   this.logInForm = this.fb.group({
  //     mail: ['', [Validators.required, Validators.mail]],
  //     password: ['', [Validators.required, Validators.minLength(3)]]
  //   });
  // }

  setShowLoginForm(): void {
    this.showLoginForm = !this.showLoginForm;
    if (this.showLoginForm === false) {
      this.logInForm.reset();
    }
  }

  login(){
    if (this.logInForm.valid) {
      console.log('פרטי התחברות:', this.logInForm.value);
      // כאן תוסיף קריאה לשירות ההתחברות שלך
      this.authService.login(this.logInForm.value.mail as string, this.logInForm.value.password as string);
      
    }
  }
}