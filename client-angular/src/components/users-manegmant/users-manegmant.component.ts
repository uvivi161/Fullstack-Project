import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../../services/usersService/users.service';
import { UserUpdateDialogeComponent } from '../user-update-dialoge/user-update-dialoge.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: `./users-manegmant.component.html`,
  styleUrls: ['./users-manegmant.component.css']
})
export class UsersManegmantComponent implements OnInit {
  hasSearched = false;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select', 'mail', 'role', 'country', 'companyName', 'actions'];
  isSearching: boolean = false;
  searchResults: any = null;
  hasSearch = false;
  addEmployeeForm!: FormGroup;
  showAddForm = false;
  selection = new SelectionModel<any>(true, []);
  searchDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private userService: UsersService, 
    private dialog: MatDialog,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createAddEmployeeForm();
  }

  createAddEmployeeForm() {
    this.addEmployeeForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.userService.getUsers().subscribe(data => {
      console.log('data', data);      
      this.dataSource.data = data;
      // Clear selection when data is reloaded
      this.selection.clear();
    });
  }

  editCustomer(customer: any, id: number) {
    const dialogRef = this.dialog.open(UserUpdateDialogeComponent, {
      width: '450px',
      data: { ...customer }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        const sendMe = {
          Mail: result.mail,
          Role: result.role,
          Country: result.city,
        };
        this.userService.updateUser(sendMe, id).subscribe(() => this.loadCustomers());
      }
    });
  }

  openDeleteConfirmation(id?: number) {
    const selectedIds = id ? [id] : this.selection.selected.map(item => item.id);
    
    if (selectedIds.length === 0) {
      return;
    }
    
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { count: selectedIds.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployees(selectedIds);
      }
    });
  }

  deleteEmployees(ids: number[]) {
    // If only one ID, use the existing method
    if (ids.length === 1) {
      this.userService.deleteUser(ids[0].toString()).subscribe(() => this.loadCustomers());
      return;
    }
    
    // For multiple IDs, we need to handle them sequentially or create a new endpoint
    // This is a simple sequential approach
    let completed = 0;
    
    ids.forEach(id => {
      this.userService.deleteUser(id.toString()).subscribe({
        next: () => {
          completed++;
          if (completed === ids.length) {
            this.loadCustomers();
          }
        },
        error: (err) => {
          console.error(`Error deleting user with ID ${id}`, err);
          completed++;
          if (completed === ids.length) {
            this.loadCustomers();
          }
        }
      });
    });
  }
  
  searchCustomer(mail: string) {
    if (!mail || mail.trim() === '') {
      return;
    }
    
    this.isSearching = true;
    this.hasSearched = true;
    this.searchResults = null;
    this.searchDataSource.data = [];
  
    const MINIMUM_SPINNER_TIME = 1000; // 1 second
    const startTime = Date.now();

    this.userService.getUserByMail(mail).subscribe({
      next: (customer: any) => {
        const timeElapsed = Date.now() - startTime;
        const remainingTime = MINIMUM_SPINNER_TIME - timeElapsed;

        if (remainingTime > 0) {
          setTimeout(() => {
            this.finishSearch(customer);
          }, remainingTime);
        } else {
          this.finishSearch(customer);
        }
      },
      error: (err: any) => {
        console.error('Error fetching customer', err);
        const timeElapsed = Date.now() - startTime;
        const remainingTime = MINIMUM_SPINNER_TIME - timeElapsed;

        if (remainingTime > 0) {
          setTimeout(() => {
            this.finishSearch(null);
          }, remainingTime);
        } else {
          this.finishSearch(null);
        }
      }
    });
  }

  finishSearch(customer: any) {
    this.searchResults = customer;
    this.isSearching = false;
    
    if (customer) {
      this.searchDataSource.data = [customer];
    } else {
      this.searchDataSource.data = [];
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      // Reset form when opening
      this.createAddEmployeeForm();
    }
  }

  addEmployee() {
    if (this.addEmployeeForm.invalid) {
      return;
    }

    const { mail, role, country } = this.addEmployeeForm.value;
    
    this.userService.postUser(mail, role, country).subscribe({
      next: (res) => {
        console.log('Employee added successfully', res);
        
        // Create a new form instead of resetting to avoid validation errors
        this.createAddEmployeeForm();
        // Hide the form after successful submission
        this.showAddForm = false;
        // Reload the customers list to show the new employee
        this.loadCustomers();
      },
      error: (err) => {
        console.error('Error adding employee', err);
        alert('this user is already exist');
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}