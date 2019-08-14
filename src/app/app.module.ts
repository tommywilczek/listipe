import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
