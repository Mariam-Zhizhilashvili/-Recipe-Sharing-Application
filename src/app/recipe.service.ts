import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Recipe } from './recipe.model';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesSource = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSource.asObservable();
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {
    this.fetchRecipes(); 
  }


  private fetchRecipes(): void {
    this.http.get<Recipe[]>(this.apiUrl).pipe(take(1)).subscribe((recipes) => {
      this.recipesSource.next(recipes);
    });
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes$; 
  }

  addRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, newRecipe).pipe(
      tap((savedRecipe) => {
        this.recipesSource.next([...this.recipesSource.getValue(), savedRecipe]); 
      })
    );
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updatedRecipes = this.recipesSource.getValue().filter(recipe => recipe.id !== id);
        this.recipesSource.next(updatedRecipes);
      })
    );
  }

  editRecipe(id: string | number, updatedRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id.toString()}`, updatedRecipe).pipe(
      tap((savedRecipe) => {
        const updatedRecipes = this.recipesSource.getValue().map(recipe =>
          recipe.id === id ? savedRecipe : recipe
        );
        this.recipesSource.next(updatedRecipes);
      })
    );
  }
  
  

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }
}
