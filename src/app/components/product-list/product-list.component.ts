import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { PermissionDirective } from '../../directives/permission.directive';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DateFormatPipe,
    PermissionDirective
  ]
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'stockQuantity', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.dataSource.data = products;
      }
    );
  }

  deleteProduct(id: number): void {
    if (confirm('确定要删除这个商品吗？')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.loadProducts();
        }
      );
    }
  }
} 