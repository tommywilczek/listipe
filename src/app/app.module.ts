import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';
import { ShoppingListModule } from './shoppingComponents/shopping-list/shopping-list.module';
import { ShoppingListRoutingModule } from './shoppingComponents/shopping-list/shopping-list-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesRoutingModule,
    ShoppingListModule,
    ShoppingListRoutingModule,
    RecipesModule, // This should be taken out when it is being loaded lazily. If i keep it in imports, it will be loaded eagerly.
    AuthModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ // an array of components that will need to be created without a selector or the route config being used
    AlertComponent
  ]
})
export class AppModule { }
