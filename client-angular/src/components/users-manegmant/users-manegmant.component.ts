// import { Component } from '@angular/core';
// import { UsersService } from '../../services/usersService/users.service';

// @Component({
//   selector: 'app-users-manegmant',
//   imports: [],
//   templateUrl: './users-manegmant.component.html',
//   styleUrl: './users-manegmant.component.css'
// })
// export class UsersManegmantComponent {

//   constructor(private userService : UsersService) { }

//   users: any[] = [];

//   ngOnInit(){
//     this.userService.getUsers().subscribe((users: any) => {
//       this.users = users;
//     });
//   }

//   deleteUser(id: string){
//     this.userService.deleteUser(id).subscribe(() => {
//       this.users = this.users.filter(user => user.id !== id);
//     });
//   }

//   getUserByMail(mail: string){
//     this.userService.getUserByMail(mail).subscribe((user: any) => {}
//     );}

//   // isFieldInvalid(fieldName: string): boolean | undefined {
//   //   const control = this.signInForm.get(fieldName);
//   //   return control?.invalid && control?.touched;
//   // }


// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CustomerService, Customer } from './customer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

// import { CustomerEditDialog } from './customer-edit-dialog.component';
import { UsersService } from '../../services/usersService/users.service';
import { UserUpdateDialogeComponent } from '../user-update-dialoge/user-update-dialoge.component';
// import { userUpdateDialoge } from '../user-update-dialoge/user-update-dialoge.component';

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
    MatSpinner
    // CustomerEditDialog
  ],
  // templateUrl: './customer-management.component.html',
  templateUrl: `./users-manegmant.component.html`,
  styleUrls: ['./users-manegmant.component.css']
})
export class UsersManegmantComponent implements OnInit {
  hasSearched = false;
  customers: any[] = [];
  displayedColumns: string[] = ['email','role','actions'];
  isSearching: boolean = false;
  searchResults: any = null;
  hasSearch = false;

  constructor(private userService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.userService.getUsers().subscribe(data => this.customers = data);
  }

  editCustomer(customer: any, id :number) {
    const dialogRef = this.dialog.open(UserUpdateDialogeComponent, {
      width: '400px',
      data: { ...customer }
    });
    console.log(id);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // const updatedUser = { id, ...result };
        this.userService.updateUser(result, id).subscribe(() => this.loadCustomers());
      }
    });
  }

  deleteCustomer(id: number) {
    console.log(id);
    
    if (confirm('האם אתה בטוח שברצונך למחוק את הלקוח?')) {
      this.userService.deleteUser(id.toString()).subscribe(() => this.loadCustomers());
    }
  }
  // updateSearchEmail(event: Event): void {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.searchEmail.set(value);
  // }
  // searchEmail(mail: string){
  //   this.userService.getUserByMail(mail).subscribe(() => this.loadCustomers());
  // }

  // searchCustomer(email: string): void {
  //   this.hasSearched = true;
  //   if (email && email.trim() !== '') {
  //     const user = this.userService.getUserByMail(email).subscribe(() => this.loadCustomers());

  //   } else {
  //     this.hasSearched = false;
  //   }
  // }
  
  searchCustomer(email: string) {
    this.isSearching = true;
    this.hasSearched = true;
    this.searchResults = null;
  
    
    const MINIMUM_SPINNER_TIME = 2000; // 10 שניות
    const startTime = Date.now();

    // קראי לפונקציה מהשירות
    this.userService.getUserByMail(email).subscribe({
      next: (customer) => {
        const timeElapsed = Date.now() - startTime;
        const remainigTime = MINIMUM_SPINNER_TIME - timeElapsed;

        if(remainigTime > 0){
          setTimeout(() => {
            this.finishSearch(customer);
          }, remainigTime);
        }else{
          this.finishSearch(customer);
        }
      },
      error: (err) => {
        console.error('Error fetching customer', err);
        const timeElapsed = Date.now() - startTime;
        const remainigTime = MINIMUM_SPINNER_TIME - timeElapsed;

        if(remainigTime > 0){
          setTimeout(() => {
            this.finishSearch(null);
          },remainigTime);
        }else{
          this.finishSearch(null);
        }
      }
    });
  }

  finishSearch(customer :any){
    this.searchResults = customer;
    this.isSearching = false;
  }
}
