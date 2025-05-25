import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule
  ],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent {

  constructor(private authService: AuthService) {
  }
  user: any;

  ngOnInit() {
    this.user = this.authService.getDecodedToken();
  }

  menuItems = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      name: 'User Management',
      icon: 'people',
      route: '/dashboard/users'
    },
    {
      name: 'Statistics',
      icon: 'bar_chart',
      route: '/dashboard/statistics'
    }
    // {
    //   name: 'Meetings',
    //   icon: 'event',
    //   route: '/dashboard/meetings'
    // }
  ];
}