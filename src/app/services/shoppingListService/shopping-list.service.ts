import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChangedEvent = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomato', 10),
  ];
  
  constructor() { }
  
  getIngredients() {
    return this.ingredients.slice();
  }
  
  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChangedEvent.next(this.ingredients.slice());
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // ingredients.forEach(ing => {
      //   this.addIngredient(ing);
      // });
      this.ingredients.push(... ingredients);
      this.ingredientsChangedEvent.next(this.ingredients.slice());
  }
}
