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
//       <mat-form-field appearance="fill" style="width:100%">
//         <mat-label>אימייל</mat-label>
//         <input matInput formControlName="email">
//       </mat-form-field>

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
//     // הוספתי את ה-ID לפורם
//     this.editForm = this.fb.group({
//       id: [data.id],  // הוספת ה-ID לפורם
//       email: [data.email],
//       role: [data.role]
//     });
//   }

//   save() {
//     this.dialogRef.close(this.editForm.value);  // שולח את הערכים, כולל ה-ID
//   }

//   close() {
//     this.dialogRef.close();
//   }
// }








import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'customer-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon color="primary">edit</mat-icon>
        Edit Employee
      </h2>
      
      <form [formGroup]="editForm" (ngSubmit)="save()">
        <mat-form-field appearance="outline" class="form-field">
          <mat-label>Email</mat-label>
          <input matInput formControlName="mail" readonly>
          <mat-icon matSuffix color="primary">email</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="form-field">
          <mat-label>Role</mat-label>
          <input matInput formControlName="role">
          <mat-icon matSuffix color="primary">work</mat-icon>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="form-field">
          <mat-label>City</mat-label>
          <input matInput formControlName="city">
          <mat-icon matSuffix color="primary">location_city</mat-icon>
        </mat-form-field>

        <div class="dialog-actions">
          <button mat-button (click)="close()" type="button">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="editForm.invalid">
            <mat-icon>save</mat-icon> Save
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 16px;
      min-width: 350px;
    }
    .dialog-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #3f51b5;
      margin-bottom: 20px;
    }
    .form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 24px;
    }
  `]
})
export class UserUpdateDialogeComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserUpdateDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [data.id],
      mail: [data.mail, [Validators.required, Validators.email]],
      role: [data.role, [Validators.required]],
      city: [data.city, [Validators.required]]
    });
  }

  save() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}