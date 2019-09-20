import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'} // Lazy loading. in the string, it's the filepath to the module + # + the module class name
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // here, when using lazy loading, you can set a pre-loading strategy, for example, PreloadingAllModules
  exports: [RouterModule]
})
export class AppRoutingModule { }
