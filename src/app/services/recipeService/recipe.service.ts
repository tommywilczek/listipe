import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'test description', 'https://vignette.wikia.nocookie.net/rickandmorty/images/3/37/Mr_poopy_butthole.png/revision/latest?cb=20150819161234'),
    new Recipe('A test recipe2', 'test description2', 'https://vignette.wikia.nocookie.net/rickandmorty/images/3/37/Mr_poopy_butthole.png/revision/latest?cb=20150819161234')
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes() {
    return this.recipes.slice(); // return a copy of the array so it's not directly changeable
  }
}
