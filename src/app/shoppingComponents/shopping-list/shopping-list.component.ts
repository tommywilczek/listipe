import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shoppingListService/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChangeSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSubscription = this.shoppingListService.ingredientsChangedEvent
      .subscribe(
        (ings: Ingredient[]) => {
          this.ingredients = ings;
        });
  }

  ngOnDestroy() {
    this.ingredientChangeSubscription.unsubscribe();
  }
  
}
