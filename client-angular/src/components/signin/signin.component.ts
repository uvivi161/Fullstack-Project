import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
  signInForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])  ,
    role: new FormControl<string>('', [Validators.required])
  });

  showSignInForm = false;
  showVerifyPasswordForm = false;
  hidePassword = true;
  get nameControl() { return this.signInForm.get('name'); }
  constructor(private authService  : AuthService) {}
  
  setShowSignInForm(){
    this.showSignInForm = !this.showSignInForm;
  }


  signIn(){
    this.authService.signIn
    (this.signInForm.value.email as string,
    this.signInForm.value.password as string,
    this.signInForm.value.role as string);  
  }

  isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.signInForm.get(fieldName);
    return control?.invalid && control?.touched;
  }
}
