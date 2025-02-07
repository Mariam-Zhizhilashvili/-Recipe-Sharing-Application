import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  searchQuery: string = '';
  private destroy$ = new Subject<void>(); 

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();

    this.recipeService.recipes$
      .pipe(takeUntil(this.destroy$)) 
      .subscribe((recipes) => {
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

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();  
  }
}
