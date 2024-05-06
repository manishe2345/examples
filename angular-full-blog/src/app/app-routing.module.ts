import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {path:'' , component: HomeComponent},
  {path:'category/:category/:id' , component: SingleCategoryComponent},
  {path:'post/:id' , component: SinglePostComponent},
  {path:'terms-conditions' , component : TermsConditionsComponent},
  {path:'about' , component : AboutComponent},
  {path:'contact' , component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
