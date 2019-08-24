import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'A test recipe', 
      'test description', 
      'https://vignette.wikia.nocookie.net/rickandmorty/images/3/37/Mr_poopy_butthole.png/revision/latest?cb=20150819161234',
      [
        new Ingredient('Poopey', 2),
        new Ingredient('Butthole', 1)
      ]
      ),
    new Recipe(
      2,
      'A test recipe2', 
      'test description2', 
      'https://vignette.wikia.nocookie.net/rickandmorty/images/3/37/Mr_poopy_butthole.png/revision/latest?cb=20150819161234',
      [
        new Ingredient('Poopey', 4),
        new Ingredient('Butthole', 2)
      ]
      )
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes() {
    return this.recipes.slice(); // return a copy of the array so it's not directly changeable
  }

  getRecipeById(id: number): Recipe {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].id === id) {
        return this.recipes[i];
      }
    }
    console.log('ERROR: ID not found:', id);
  }
}
