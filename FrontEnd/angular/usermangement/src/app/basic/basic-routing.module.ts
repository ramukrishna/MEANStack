import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from '../auth/users/users.component';

const routes: Routes = [
  { path: '', redirectTo:'/users', pathMatch: 'full' }, 
  { path: 'users', component: UsersComponent }, 
  { path: 'about', component: AboutComponent }, 
  { path: 'services', component: ServicesComponent }, 
  { path: 'contact', component: ContactComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
