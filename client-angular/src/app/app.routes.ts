import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
// import { UsersManegmant } from '../components/users-manegmant/users-manegmant.component';
import { UsersManegmantComponent } from '../components/users-manegmant/users-manegmant.component';

export const routes: Routes = [
    {path:'', component:HomePageComponent},
    {path:'usersManegmant', component:UsersManegmantComponent},
];
