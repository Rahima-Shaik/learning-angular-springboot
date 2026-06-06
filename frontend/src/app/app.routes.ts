import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'todos', component: TodoComponent, canActivate:[authGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  {path:'', redirectTo:'/login',pathMatch:'full'}
];
