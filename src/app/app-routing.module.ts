import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeUpdateFormComponent } from './recipe-update-form/recipe-update-form.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'add-recipe', component: NewRecipeComponent }, 
  { path: 'recipes', component: HomeComponent }, 
  { path: 'recipes/:id', component: RecipeDetailsComponent }, 
  { path: 'recipes/:id/edit', component: RecipeUpdateFormComponent }, 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

