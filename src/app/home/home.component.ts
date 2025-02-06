import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  searchQuery: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe();
  }

  onDelete(id: number): void {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.loadRecipes(); 
    });
  }

  filteredRecipes() {
    return this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ingredient: string) =>
        ingredient.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  isEditable(recipeId: any): boolean {
    return typeof recipeId === 'string' && /^[a-zA-Z0-9]{2,}$/.test(recipeId);
  }

}
