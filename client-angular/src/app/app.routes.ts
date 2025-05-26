import { Routes } from '@angular/router';
import { UsersManegmantComponent } from '../components/users-manegmant/users-manegmant.component';
import { authGuard } from '../gaurds/auth.guard';
import { HomeComponent } from '../components/home-page/home-page.component';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { CityChartsDashboardComponent } from '../components/graph/graph.component';
import { DashboardHomeComponent } from '../components/dashboard-home/dashboard-home.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    { 
    path: 'dashboard', 
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'users', component:  UsersManegmantComponent},
      { path: 'statistics', component: CityChartsDashboardComponent },
    ]
  },
];
