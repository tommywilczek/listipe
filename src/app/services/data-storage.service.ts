import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../shared/recipe.model';

import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  
  constructor(private http: HttpClient,
    private recipeService: RecipeService) { }
    
    storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      // Firebase's 'put' request rewrites the data
      this.http
      .put(
        'https://listipe.firebaseio.com/recipes.json',
        recipes
        )
        .subscribe(response => { // we're subscribing here because the component has no interest in the response
        console.log('response from put:', response);
      });
    }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://listipe.firebaseio.com/recipes.json'
      )
      .pipe(map(recipes => { // this map is an RxJs observable operator that allows you to transform the data in an observable chain
        return recipes.map(recipe => { // this map is a normal js array method map, which allows us to transform the elements in an array.
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []} // return an empty list for ingredients if none are found
        })
      }), tap(recipes => { // the tap operator allows us to access the code here without altering the data that is funneled through the observable.
        this.recipeService.setRecipes(recipes);
      })
      );
  }
}
