import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'products', 
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'products/new', 
    component: ProductEditComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'products/edit/:id', 
    component: ProductEditComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 