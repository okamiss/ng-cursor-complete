import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductEditComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'calculator', 
    loadComponent: () => import('./components/calculator/calculator.component').then(m => m.CalculatorComponent),
    canActivate: [AuthGuard]
  }
]; 