import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { 
  }
  
  ngOnInit() { 
    const id = +this.route.snapshot.params['id'];
    this.selectedRecipe = this.recipeService.getRecipeById(id);
    this.watchForChangesInParams();
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }
  
  private watchForChangesInParams() {
    this.route.params
      .subscribe((params: Params) => {
        const id = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipeById(id);
      });
  }

  deleteRecipe() {
    this.recipeService.removeRecipe(this.selectedRecipe.id);
    this.navigateUpOneLevel();
  }

  navigateUpOneLevel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
