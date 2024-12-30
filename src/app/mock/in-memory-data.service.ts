import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      {
        id: 1,
        name: '示例商品1',
        description: '这是示例商品1的描述',
        price: 99.99,
        category: '电子产品',
        stockQuantity: 100,
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: '示例商品2',
        description: '这是示例商品2的描述',
        price: 199.99,
        category: '服装',
        stockQuantity: 50,
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return { products };
  }

  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
  }
} 