import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories: Category[] = [];
  deleteProduct: Product = {} as Product;
  product: Product = {} as Product;
  products: Product[] = [];
  showForm: boolean = false;
  isEditing: boolean = false;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadProducts()
    this.loadCategories()
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      {
        next: (products) => {
          this.products = products || []; // Garante que a lista nunca é nula.
        },
        error: (err) => console.error('Erro ao carregar os produtos:', err),
      }
    );
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      {
        next: (categories) => { this.categories = categories || []; },
      }
    );
  }
  saveProduct(save: boolean) {
    if (save) {
      if (this.isEditing) {
        console.log("Actualizando producto: " + this.product.id)

        this.productService.update(this.product).subscribe();

      } else {
        console.log("Salvando producto: " + this.products.length)
        this.productService.save(this.product).subscribe({
          next: (product) => {
            this.products.push(product);
          }
        });
      }
    }
    this.product = {} as Product;
    this.showForm = false;
    this.isEditing = false;
  }
  create() {
    this.showForm = true;
  }
  edit(product: Product) {
    this.product = product;
    this.showForm = true;
    this.isEditing = true;
  }
  delete(modal: any, product: Product) {
    this.deleteProduct = product;
    this.modalService.open(modal).result.then((result) => {
      if (result) {
        this.productService.delete(product).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== product.id);
          }
        });
      }
    });
  }
}
