import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input()
  categories: Category[] = [];

  @Input()
  product ?: Product;

  @Output()
  saveEmitter = new EventEmitter()

  save(){
      this.saveEmitter.emit(true);
  }
  cancel(){
      this.saveEmitter.emit(false);
  }
  selectedCategory(category1: Category, category2: Category){
    return category1 && category2 ? category1.id === category2.id : false;
  }

}
