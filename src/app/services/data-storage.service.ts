import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../shared/recipe.model';

import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }
    
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
        'https://listipe.firebaseio.com/recipes.json',
      )
      .pipe(
      map(recipes => { // this map is an RxJs observable operator that allows you to transform the data in an observable chain
        return recipes.map(recipe => { // this map is a normal js array method map, which allows us to transform the elements in an array.
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []} // return an empty list for ingredients if none are found
        })
      }), 
      tap(recipes => { // the tap operator allows us to access the code here without altering the data that is funneled through the observable.
        this.recipeService.setRecipes(recipes);
      })
    );
    // take is an RxJs operator that is called as a function, and you pass a number to it. 
    // It takes that many values from that observable then automatically unsubscribe.
    // So this manages the subscription for you, gives you the latest user, then unsubscribes.
    // And I'm not getting future users, because I just want to get them on demand when
    // fetchRecipes is called.
    // Since you can't return an observable within a subscribe, we need to pipe. For this we 
    // use exhaustMap. It waits for the first observable (here, the user Observable) to complete
    // Then it gives us the user (in the user => ... in the subscribe block) then returns a new
    // observable in that subscribe block which will then replace the previous observable in 
    // the entire observable chain.
  }
}
