import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChangedEvent = new Subject<Recipe[]>(); 
  private recipes: Recipe[] = []

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChangedEvent.next(this.recipes.slice()); // inform all other places in the app that the recipes list changed
  }

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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChangedEvent.next(this.recipes.slice());
  }
  
  updateRecipe(newRecipe: Recipe) {
    this.removeRecipe(newRecipe.id);
    this.addRecipe(newRecipe);
    this.recipesChangedEvent.next(this.recipes.slice());
  }
  
  removeRecipe(idToDelete: number){
    for(var i=0; i < this.recipes.length; i++){
      if (this.recipes[i].id === idToDelete) {
        this.recipes.splice(i, 1);
        this.recipesChangedEvent.next(this.recipes.slice());
      }
    }
  }

  generateSampleRecipes() {
    const sampleRecipes: Recipe[] = [
      new Recipe(
        1,
        'Mr. Poopey Butthole', 
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
    this.recipes = sampleRecipes;
    this.recipesChangedEvent.next(this.recipes.slice());
  }

}
