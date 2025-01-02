import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnChanges {
  @Input()
  categories: Category[] = [];

  @Input()
  product: Product = {} as Product;

  @Output()
  saveEmitter = new EventEmitter()

  formGroupProduct: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formGroupProduct = formBuilder.group({
      id: { value: '', disabled: true },
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      newProduct: [''],
      promotion: ['']
    });
  }

  ngOnChanges(): void {
    if (this.product)
      this.formGroupProduct.patchValue(this.product);
  }

  save() {
    if (this.formGroupProduct.valid) {
      Object.assign(this.product, this.formGroupProduct.value);
      this.saveEmitter.emit(true);
    }
  }
  cancel() {
    this.saveEmitter.emit(false);
  }
  selectedCategory(category1: Category, category2: Category) {
    return category1 && category2 ? category1.id === category2.id : false;
  }

  get pfgname() { return this.formGroupProduct.get('name'); }
  get pfgdescription() { return this.formGroupProduct.get('description'); }
  get pfgprice() { return this.formGroupProduct.get('price'); }
  get pfgcategory() { return this.formGroupProduct.get('category'); }

}
