import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuItem } from './models/menu.interface';
import { RecursiveMenuComponent } from './components/recursive-menu/recursive-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RecursiveMenuComponent
  ]
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      id: '1',
      title: '商品管理',
      icon: 'shopping_cart',
      children: [
        {
          id: '1-1',
          title: '商品列表',
          icon: 'list',
          link: '/products',
          permission: 'product:view'
        },
        {
          id: '1-2',
          title: '添加商品',
          icon: 'add',
          link: '/products/new',
          permission: 'product:create'
        }
      ]
    },
    {
      id: '2',
      title: '订单管理',
      icon: 'receipt',
      children: [
        {
          id: '2-1',
          title: '订单列表',
          icon: 'list_alt',
          link: '/orders',
          permission: 'order:view'
        },
        {
          id: '2-2',
          title: '订单统计',
          icon: 'bar_chart',
          children: [
            {
              id: '2-2-1',
              title: '销售报表',
              icon: 'assessment',
              link: '/orders/sales-report',
              permission: 'order:stats'
            },
            {
              id: '2-2-2',
              title: '退款统计',
              icon: 'money_off',
              link: '/orders/refund-stats',
              permission: 'order:stats',
              children: [
                {
                  id: '2-2-2-1',
                  title: '退款报表',
                  icon: 'assessment',
                  link: '/orders/refund-report',
                  permission: 'order:stats'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '3',
      title: '工具',
      icon: 'build',
      children: [
        {
          id: '3-1',
          title: '计算器',
          icon: 'calculate',
          link: '/calculator',
          permission: 'tools:calculator'
        }
      ]
    }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 