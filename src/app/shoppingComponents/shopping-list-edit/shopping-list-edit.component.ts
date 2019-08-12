import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor() { }

  ngOnInit() {
  }

  onSubmitItem() {
    const newIngName = this.nameInputRef.nativeElement.value;
    const newIngAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(newIngName, newIngAmount);
    this.ingredientAdded.emit(newIngredient);
  }

}
