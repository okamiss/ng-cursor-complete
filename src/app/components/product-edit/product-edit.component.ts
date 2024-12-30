import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  standalone: false
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe((product: Product) => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      
      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, product).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        this.productService.createProduct(product).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }
} 