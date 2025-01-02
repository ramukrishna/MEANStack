import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers:[AuthService]
})
export class AuthModule { }
