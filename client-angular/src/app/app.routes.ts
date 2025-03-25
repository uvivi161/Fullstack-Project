import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
// import { UsersManegmant } from '../components/users-manegmant/users-manegmant.component';
import { UsersManegmantComponent } from '../components/users-manegmant/users-manegmant.component';
import { CityYearlyChartComponent } from '../components/graph/graph.component';
import { authGuard } from '../gaurds/auth.guard';

export const routes: Routes = [
    {path:'', component:HomePageComponent},
    {path:'usersManegmant', component:UsersManegmantComponent,canActivate :[authGuard]},
    {path:'statistics-graph', component:CityYearlyChartComponent, canActivate: [authGuard]}
];
