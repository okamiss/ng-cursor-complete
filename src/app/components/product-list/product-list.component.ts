import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false
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