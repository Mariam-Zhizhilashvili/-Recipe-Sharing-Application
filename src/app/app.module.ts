import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ReactiveFormsModule } from '@angular/forms'; 

import { HomeComponent } from './home/home.component'; 
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component'; 

import { RecipeUpdateFormComponent } from './recipe-update-form/recipe-update-form.component'; 

import { RouterModule } from '@angular/router';

import { NewRecipeComponent } from './new-recipe/new-recipe.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewRecipeComponent,
    HomeComponent, 
    RecipeDetailsComponent, 
    RecipeUpdateFormComponent, PageNotFoundComponent, 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule, 
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
