// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-update-dialoge',
//   imports: [],
//   templateUrl: './user-update-dialoge.component.html',
//   styleUrl: './user-update-dialoge.component.css'
// })
// export class UserUpdateDialogeComponent {

// }



// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'customer-edit-dialog',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
//   template: `
//     <h2 mat-dialog-title>עריכת לקוח</h2>
//     <form [formGroup]="editForm" (ngSubmit)="save()">
//       <!-- <mat-form-field appearance="fill" style="width:100%">
//         <mat-label>שם</mat-label>
//         <input matInput formControlName="name">
//       </mat-form-field> -->

//       <mat-form-field appearance="fill" style="width:100%">
//         <mat-label>אימייל</mat-label>
//         <input matInput formControlName="email">
//       </mat-form-field>

//       <!-- <mat-form-field appearance="fill" style="width:100%">
//         <mat-label>טלפון</mat-label>
//         <input matInput formControlName="phone">
//       </mat-form-field> -->
//       <mat-form-field appearance="fill" style="width:100%">
//         <mat-label>תפקיד/הרשאה</mat-label>
//         <input matInput formControlName="role">
//       </mat-form-field>

//       <div style="text-align:right; margin-top:10px;">
//         <button mat-raised-button color="primary" type="submit">שמור</button>
//         <button mat-button (click)="close()">ביטול</button>
//       </div>
//     </form>
//   `
// })
// export class UserUpdateDialogeComponent {
//   editForm: FormGroup;

//   constructor(
//     public dialogRef: MatDialogRef<UserUpdateDialogeComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder
//   ) {
//     this.editForm = this.fb.group({
//       email: [data.email],
//       role: [data.role]
//     });
//   }

//   save() {
//     this.dialogRef.close(this.editForm.value);
//   }

//   close() {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'customer-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>עריכת לקוח</h2>
    <form [formGroup]="editForm" (ngSubmit)="save()">
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>אימייל</mat-label>
        <input matInput formControlName="email">
      </mat-form-field>

      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>תפקיד/הרשאה</mat-label>
        <input matInput formControlName="role">
      </mat-form-field>

      <div style="text-align:right; margin-top:10px;">
        <button mat-raised-button color="primary" type="submit">שמור</button>
        <button mat-button (click)="close()">ביטול</button>
      </div>
    </form>
  `
})
export class UserUpdateDialogeComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserUpdateDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // הוספתי את ה-ID לפורם
    this.editForm = this.fb.group({
      id: [data.id],  // הוספת ה-ID לפורם
      email: [data.email],
      role: [data.role]
    });
  }

  save() {
    this.dialogRef.close(this.editForm.value);  // שולח את הערכים, כולל ה-ID
  }

  close() {
    this.dialogRef.close();
  }
}