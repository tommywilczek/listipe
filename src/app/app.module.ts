import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipeComponents/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipeComponents/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipeComponents/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shoppingComponents/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shoppingComponents/shopping-list-edit/shopping-list-edit.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipeComponents/recipes/recipes.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { PleaseSelectRecipeComponent } from './recipeComponents/please-select-recipe/please-select-recipe.component';
import { RecipeEditComponent } from './recipeComponents/recipe-edit/recipe-edit.component';
import { RecipeService } from './services/recipe.service';
import { AuthComponent } from './auth/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    HeaderComponent,
    RecipesComponent,
    DropdownDirective,
    PleaseSelectRecipeComponent,
    RecipeEditComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
