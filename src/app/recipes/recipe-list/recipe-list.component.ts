import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChangedEvent
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      });
  }

  generateSampleRecipes() {
    this.recipeService.generateSampleRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
