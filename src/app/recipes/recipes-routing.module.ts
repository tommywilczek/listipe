import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { PleaseSelectRecipeComponent } from './please-select-recipe/please-select-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from '../services/recipes-resolver.service';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PleaseSelectRecipeComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent}, // Hard-coded routes should come before dynamic parameters.
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]}, // If this and the one above it were switched, it would try to look for an id of 'new'
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
