import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './auth/login/login.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostsComponent } from './posts/new-posts/new-posts.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path:'', component:DashboardComponent,canActivate:[authGuard]},
  {path:'login' , component:LoginComponent},
  { path:'category', component:CategoryComponent,canActivate:[authGuard]},
  { path: 'posts', component:AllPostsComponent, canActivate:[authGuard]},
  { path: 'posts/new', component:NewPostsComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
