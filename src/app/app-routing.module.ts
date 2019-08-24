import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipeComponents/recipes/recipes.component';
import { ShoppingListComponent } from './shoppingComponents/shopping-list/shopping-list.component';
import { PleaseSelectRecipeComponent } from './recipeComponents/please-select-recipe/please-select-recipe.component';
import { RecipeDetailComponent } from './recipeComponents/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipeComponents/recipe-edit/recipe-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: PleaseSelectRecipeComponent, pathMatch: 'full' },
    { path: 'new', component: RecipeEditComponent}, // Hard-coded routes should come before dynamic parameters.
    { path: ':id', component: RecipeDetailComponent}, // If this and the one above it were switched, it would try to look for an id of 'new'
    { path: ':id/edit', component: RecipeEditComponent},
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
