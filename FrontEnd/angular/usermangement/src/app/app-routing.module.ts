import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'basic',loadChildren:()=> import('./basic/basic.module').then(m=> m.BasicModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  // Add other application routes here
  { path: '', redirectTo: '/basic', pathMatch: 'full' }, 
    //Wild Card Route for 404 request 
  { path: '**', pathMatch: 'full', redirectTo: '/pagenotfound' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
