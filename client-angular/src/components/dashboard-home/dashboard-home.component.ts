
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/authService/auth.service';
import { forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MeetingService } from '../../services/meetingService/meeting.service';
import { UsersService } from '../../services/usersService/users.service';
// Import chart module - use NgxChartsModule or Chart.js
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    NgxChartsModule // Add chart module
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  // User info
  user: any = null;
  
  // Dashboard data
  stats = {
    totalEmployees: 0,
    totalMeetings: 0
  };
  
  // Recent activities
  recentActivities: any[] = [];
  
  // Chart data
  chartData: any[] = [];
  
  // Loading states
  loading = {
    users: true,
    meetings: true,
    chart: true
  };
  
  // Error states
  error: { users: string | null; meetings: string | null; chart: string | null } = {
    users: null,
    meetings: null,
    chart: null
  };
  
  // Chart options
  view: [number, number] = [700, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
  // Today's date
  today = new Date();
  
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private meetingService: MeetingService
  ) {}
  
  ngOnInit(): void {
    // Get user info from token
    this.user = this.authService.getDecodedToken();
    
    // Load dashboard data
    this.loadDashboardData();
    
    // Prepare chart data
    this.prepareChartData();
  }
  
  loadDashboardData(): void {
    // Load users data
    this.usersService.getUsers().pipe(
      catchError(err => {
        this.error.users = 'Failed to load employee data';
        this.loading.users = false;
        return of([]);
      })
    ).subscribe(users => {
      if (users && users.length) {
        this.stats.totalEmployees = users.length;
      }
      this.loading.users = false;
    });
    
    // Load meetings data
    this.meetingService.getMeetings().pipe(
      catchError(err => {
        this.error.meetings = 'Failed to load meeting data';
        this.loading.meetings = false;
        return of([]);
      })
    ).subscribe((meetings: any) => {
      debugger;
      if (meetings && meetings.length) {
        this.stats.totalMeetings = meetings.length;
        console.log(meetings);
        
        // Add recent meetings to activities
        const recentMeetings = meetings
          .slice(0, 5) // Get top 5 meetings
          .map((meeting: { title: any; occurredIn: string | number | Date; }) => ({
            type: 'meeting',
            title: meeting.title || 'Untitled Meeting',
            date: new Date(meeting.occurredIn),
          }));
          
        this.recentActivities = [...recentMeetings];
      }
      this.loading.meetings = false;
    });
  }
  
  // Prepare chart data from meetings
  prepareChartData(): void {
  this.loading.chart = true;
  
  this.meetingService.getMeetings().pipe(
    catchError(err => {
      this.error.chart = 'Failed to load chart data';
      this.loading.chart = false;
      return of([]);
    })
  ).subscribe((meetings: any) => {
    if (meetings && meetings.length) {
      // Group meetings by date
      const meetingsByDate = this.groupMeetingsByDate(meetings);
      
      // Format data for bar chart
      const series = Object.keys(meetingsByDate).map(date => ({
        name: new Date(date).toLocaleDateString(),
        value: meetingsByDate[date]
      }));
      
      this.chartData = [{
        name: 'Meetings',
        series: series
      }];
    }
    this.loading.chart = false;
  });
}

  // Group meetings by date
  private groupMeetingsByDate(meetings: any[]): { [date: string]: number } {
    const grouped: { [date: string]: number } = {};
    meetings.forEach((meeting: any) => {
      const date = new Date(meeting.occurredIn);
      // Use only the date part (YYYY-MM-DD) for grouping
      const dateKey = date.toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = 0;
      }
      grouped[dateKey]++;
    });
    return grouped;
  }
  
  // Format date for display
  formatDate(date: Date): string {
    if (!date) return '';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
}