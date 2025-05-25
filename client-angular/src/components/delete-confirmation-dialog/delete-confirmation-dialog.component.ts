import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon color="warn">warning</mat-icon>
        Confirm Deletion
      </h2>
      
      <div class="dialog-content">
        <p *ngIf="data.count === 1">Are you sure you want to delete this employee?</p>
        <p *ngIf="data.count > 1">Are you sure you want to delete these {{ data.count }} employees?</p>
        <p class="warning-text">This action cannot be undone.</p>
      </div>

      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="warn" (click)="onConfirm()">
          <mat-icon>delete</mat-icon> Delete
        </button>
      </div>
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
      color: #f44336;
      margin-bottom: 20px;
    }
    .dialog-content {
      margin-bottom: 24px;
    }
    .warning-text {
      color: #f44336;
      font-style: italic;
      margin-top: 8px;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { count: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}