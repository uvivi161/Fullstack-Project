// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-profile',
//   imports: [],
//   templateUrl: './user-profile.component.html',
//   styleUrl: './user-profile.component.css'
// })
// export class UserProfileComponent {

// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  
  // Sample user data - replace with data from your auth service
  // user = {
  //   name: 'Admin User',
  //   email: 'admin@example.com',
  //   role: 'Administrator',
  //   company: 'Your Company',
  //   country: 'United States',
  //   avatar: '/assets/avatar-placeholder.png'
  // };

  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  user: any;
  
  ngOnInit(): void {
    this.user = this.authService.getDecodedToken();
    this.initForm();
  }
  
  initForm(): void {
    this.profileForm = this.fb.group({
      // name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, Validators.required],
      company: [this.user.company, Validators.required],
      country: [this.user.country, Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.profileForm.valid) {
      // Update user profile logic here
      console.log('Profile updated:', this.profileForm.value);
      this.snackBar.open('Profile updated successfully', 'Close', {
        duration: 3000
      });
    }
  }
}